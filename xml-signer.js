/*global require: true */

require.config({
  'paths': {
    'underscore': 'lib/underscore-min',
    'jquery': 'require-jquery',
    'bootstrap': 'lib/bootstrap/js/bootstrap.min'
  },
  'shim': {
    'underscore': {
      'exports': '_'
    }
  }
});

require(['jquery', 'underscore', 'error', 'lib/xml-crypto/signed-xml',
         'text!template/credential.txt', 'text!template/no-key.html',
         'text!template/authorize.html', 'bootstrap'],
function ($, _, error, sigExport, xmlText, noKeyText, authorizeText) {
  'use strict';
  var SignedXml = sigExport.SignedXml;

  var singleDay = 1000*60*60*24;

  var saList = [
    {
      name: 'Utah ProtoGENI',
      url: 'https://www.emulab.net/getsslcertjs.php3'
    },
    {
      name: 'Jonlab',
      url: 'http://myboss.jonlab.testbed.emulab.net/getsslcertjs.php3'
    }
  ];

  var toolId = null;
  var speakerCert = null;
  var xmlTemplate = _.template(xmlText);
  var authorizeTemplate = _.template(authorizeText);
  var xml = "";
  var encryptedKey = "";
  var certList = [];
  var certWindow;
  var userId = 'urn:publicid:IDN+jonlab.testbed.emulab.net+user+jld';

  function initialize()
  {
    var params = getQueryParams(window.location.search);
    toolId = params.id;
    if (toolId)
    {
      window.addEventListener('message', messageToolCert, false);
      var data = {
        ready: true
      };
      window.opener.postMessage(data, '*');
    }
    else
    {
      messageToolCert(null);
    }
  }

  function messageToolCert(event)
  {
    console.log('Got Tool Cert');
    if (event && event.data.certificate)
    {
      speakerCert = event.data.certificate;
    }
    var cert;
    try {
      cert = JSON.parse(window.localStorage.certificateList)[0];
    } catch (e) {}
    if ((toolId && speakerCert)
        || (! toolId && ! speakerCert))
    {
      console.log('Adding Tool Cert');
      if (cert)
      {
        parseCertificate(cert);
        initAuthorize();
      }
      else
      {
        initNoKey();
      }
    }
    else
    {
      flagError();
    }
  }

  function flagError()
  {
    $('#main-content').html('<h1>Error</h1><p>There was an error initializing. Close this window and try again.</p>');
  }

  function parseCertificate(cert)
  {
    var inKey = false;
    var inCert = false;
    var userCertificate = "";
    certList = [];
    encryptedKey = "";
    var lines = cert.split('\n');
    var i = 0;
    for (i = 0; i < lines.length; i += 1)
    {
      if (lines[i] === "-----BEGIN RSA PRIVATE KEY-----")
      {
        encryptedKey = lines[i] + '\n';
        inKey = true;
        inCert = false;
      }
      else if (lines[i] === "-----END RSA PRIVATE KEY-----")
      {
        encryptedKey += lines[i] + '\n';
        inKey = false;
        inCert = false;
      }
      else if (inKey)
      {
        encryptedKey += lines[i] + '\n';
      }
      else if (lines[i] === "-----BEGIN CERTIFICATE-----")
      {
        inCert = true;
        inKey = false;
        userCertificate = "";
      }
      else if (lines[i] === "-----END CERTIFICATE-----")
      {
        inCert = false;
        inKey = false;
        certList.push(userCertificate);
      }
      else if (inCert)
      {
        userCertificate += lines[i] + '\n';
      }
    }
  }

  function initNoKey()
  {
    $('#main-content').html(noKeyText);
    $('#sa-form').submit(clickGetCert);
    $('#sa-button').click(clickGetCert);
    $('#paste-form').submit(clickPasteCert);
    $('#paste-button').click(clickPasteCert);
    window.addEventListener('message', messageCert);
    var choice = $('#sa-choice');
    var i = 0;
    for (i = 0; i < saList.length; i += 1)
    {
      choice.append('<option value="' + saList[i].url + '">' + saList[i].name +
                    '</option>');
    }
  }

  function initAuthorize()
  {
    var fillId = '';
    if (toolId)
    {
      fillId = toolId;
    }
    var content = authorizeTemplate({id: fillId});
    $('#main-content').html(content);
    if (! toolId)
    {
      $('.tool-info').hide();
    }
    else
    {
      $('.no-tool-info').hide();
    }
    $('#sign').click(clickSign);
    $('#private').submit(clickSign);
    $('#logout').click(clickLogout);
    window.removeEventListener('message', messageCert);
    window.addEventListener('message', messageAck);
  }

  function clickSign(event)
  {
    event.preventDefault();
    var durationDays = parseInt($('#time').val(), 10);
    var timeOffset = 30 * singleDay;
    if (durationDays && durationDays > 0 && durationDays < 400)
    {
      timeOffset = durationDays * singleDay;
    }
    var e = new Date();
    e.setTime(e.getTime() + timeOffset);
    var eString = e.getUTCFullYear() + '-' +
          (e.getUTCMonth()+1) + '-' +
          e.getUTCDate() + 'T' +
          e.getUTCHours() + ':' +
          e.getUTCMinutes() + ':' +
          e.getUTCSeconds() + 'Z';
    var xml = xmlTemplate({'speaker_cert': speakerCert,
                           'speaker_urn': toolId,
                           'user_cert': certList[0],
                           'user_urn': userId,
                           'expires': eString});

    var password = $('#password').val();
    var decrypted = PKCS5PKEY.getDecryptedKeyHex(encryptedKey, password);
    var key = new RSAKey();
    key.readPrivateKeyFromASN1HexString(decrypted);
    var sig = new SignedXml();
    sig.addReference("//*[local-name(.)='credential']");
    sig.signingKey = key;
    sig.signatureNode = "//*[local-name(.)='signatures']";
    if (certList.length > 0)
    {
      sig.keyInfoProvider = new sigExport.StoredKeyInfo(certList[0]);
    }
    sig.computeSignature(xml);
    var data = {
      id: toolId,
      credential: sig.getSignedXml()
    };
    window.opener.postMessage(data, '*');
    return false;
  }

  function clickGetCert(event)
  {
    event.preventDefault();
    if (certWindow)
    {
      certWindow.close();
    }
    var url = $('#sa-choice').val();
    if (url !== '')
    {
      certWindow = window.open(url, 'Slice Authority Credential',
                               'height=400,width=600');
    }
    return false;
  }

  function clickPasteCert(event)
  {
    event.preventDefault();
    var input = $('#paste-input');
    if (input.val() !== '')
    {
      addCert(input.val());
    }
    return false;
  }

  function messageAck(event)
  {
    if (event.source === window.opener && event.data && event.data.id &&
        event.data.id === toolId && event.data.ack)
    {
      window.close();
    }
  }

  function messageCert(event)
  {
    if (event.source === certWindow && event.data && event.data.certificate)
    {
      addCert(event.data.certificate);
    }
  }

  function addCert(cert)
  {
    try {
      window.localStorage.certificateList = JSON.stringify([cert]);
    } catch (e) {}
    parseCertificate(cert);
    initAuthorize();
  }

  function clickLogout(event)
  {
    event.preventDefault();
    try {
      delete window.localStorage.certificateList;
    } catch (e) {}
    certList = [];
    encryptedKey = "";
    initNoKey();
    return false;
  }

  function htmlEncode(value)
  {
    var result = '';
    if (value) {
      result = $('<div />').text(value).html();
    }
    return result;
  };

  function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;
    
    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
    }
    
    return params;
  }

  $(document).ready(initialize);
});
