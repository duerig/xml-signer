/*global require: true */

require.config({
  'paths': {
    'underscore': 'lib/underscore-min',
    'jquery': 'require-jquery'
  },
  'shim': {
    'underscore': {
      'exports': '_'
    }
  }
});

require(['jquery', 'underscore', 'lib/xml-crypto/signed-xml',
         'text!template/credential.txt', 'text!template/no-key.html',
         'text!template/authorize.html'],
function ($, _, sigExport, xmlText, noKeyText, authorizeText) {
  'use strict';
  var SignedXml = sigExport.SignedXml;

  var toolId = "";
  var xmlTemplate = _.template(xmlText);
  var authorizeTemplate = _.template(authorizeText);
  var xml = "";
  var encryptedKey = "";
  var certList = [];
  var certWindow;

  function initialize()
  {
    var params = getQueryParams(window.location.search);
    toolId = params.id;
    xml = xmlTemplate({'id': toolId});

    var cert;
    try {
      cert = window.localStorage.certificate;
    } catch (e) {}
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
    window.addEventListener('message', messageCert);
  }

  function initAuthorize()
  {
    var content = authorizeTemplate({id: toolId});
    $('#main-content').html(content);
    $('#sign').click(clickSign);
    $('#private').submit(clickSign);
    window.removeEventListener('message', messageCert);
    window.addEventListener('message', messageAck);
  }

  function clickSign(event)
  {
    event.preventDefault();
    //    var encryptedKey = $('#key').val();
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
    certWindow = window.open('emulab.html', 'Emulab Login',
                             'height=400,width=600');
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
      try {
        window.localStorage.certificate = event.data.certificate;
      } catch (e) {}
      parseCertificate(event.data.certificate);
      initAuthorize();
    }
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
