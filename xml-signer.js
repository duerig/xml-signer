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

require(['jquery', 'underscore', 'error', 'lib/forge/forge',
         'lib/xml-crypto/signed-xml',
         'text!template/credential.txt', 'text!template/no-key.html',
         'text!template/authorize.html', 'bootstrap'],
function ($, _, error, forge, sigExport, xmlText, noKeyText, authorizeText) {
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

  var debugCert = null;
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
    if (event && event.data.certificate && event.data.tool)
    {
      debugCert = event.data.certificate;
      var speakerCertList = extractCertificates(event.data.certificate);
      if (speakerCertList.length > 0)
      {
        speakerCert = speakerCertList[0];
      }
      var userCert;
      try {
        userCert = JSON.parse(window.localStorage.certificateList)[0];
      } catch (e) {}
      if ((toolId && speakerCert)
          || (! toolId && ! speakerCert))
      {
        if (userCert)
        {
          setupClientPem(userCert);
          _.defer(initAuthorize);
        }
        else
        {
          _.defer(initNoKey);
        }
      }
      else
      {
        flagError();
      }
    }
  }

  function flagError()
  {
    $('#main-content').html('<h1>Error</h1><p>There was an error initializing. Close this window and try again.</p>');
  }

  function extractCertificates(pem)
  {
    var inCert = false;
    var userCertificate = "";
    var result = [];
    var lines = pem.split('\n');
    var i = 0;
    for (i = 0; i < lines.length; i += 1)
    {
      if (lines[i] === "-----BEGIN CERTIFICATE-----")
      {
        inCert = true;
        userCertificate = "";
      }
      else if (lines[i] === "-----END CERTIFICATE-----")
      {
        inCert = false;
        result.push(userCertificate);
      }
      else if (inCert)
      {
        userCertificate += lines[i] + '\n';
      }
    }
    return result;
  }

  function extractKey(pem)
  {
    var inKey = false;
    var key = "";
    var lines = pem.split('\n');
    var i = 0;
    for (i = 0; i < lines.length; i += 1)
    {
      if (lines[i] === "-----BEGIN RSA PRIVATE KEY-----")
      {
        key = lines[i] + '\n';
        inKey = true;
      }
      else if (lines[i] === "-----END RSA PRIVATE KEY-----")
      {
        key += lines[i] + '\n';
        inKey = false;
      }
      else if (inKey)
      {
        key += lines[i] + '\n';
      }
    }
    return key;
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

  /**
   * Populate the KeyInfo block in the signature. Add a KeyValue block
   * with the signing public key info (modulus and exponent). Put the
   * full certificate chain in the X509Data block so that it can be
   * verified.
   *
   * @param chain an one or more certificates in an array where the
   *              first is the signing certificate.
   */
  function GENIKeyInfo(chain)
  {
    this.chain = chain;

    /**
     * Note: This is a private function from forge.rsa
     * Converts a positive BigInteger into 2's-complement big-endian bytes.
     *
     * @param b the big integer to convert.
     *
     * @return the bytes.
     */
    this.bnToBytes = function(b) {
      // prepend 0x00 if first byte >= 0x80
      var hex = b.toString(16);
      if(hex[0] >= '8') {
        hex = '00' + hex;
      }
      return forge.util.hexToBytes(hex);
    }

    this.keyValue = function(pemcert) {
      var cert = parsePemCert(this.chain[0]);
      var modulus = cert.publicKey.n;
      var modulus64 = forge.util.encode64(this.bnToBytes(modulus), 64);
      /* forge puts CR and NL in, we just want NL. */
      modulus64 = modulus64.replace(/\r\n/g,"\n");
      var exponent = cert.publicKey.e;
      var exponent64 = forge.util.encode64(this.bnToBytes(exponent), 64);
      var res = "\n<KeyValue>\n<RSAKeyValue>\n<Modulus>";
      res += modulus64;
      res += "\n</Modulus>\n<Exponent>";
      res += exponent64;
      res += "</Exponent>\n</RSAKeyValue></KeyValue>";
      return res;
    }

    this.getKeyInfo = function(key) {
      var res = "";
      if (this.chain) {
        res += this.keyValue(this.chain[0]);
        res += "\n<X509Data>";
        for (var i = 0; i < this.chain.length; i++) {
          res += "\n<X509Certificate>";
          res += this.chain[i];
          res += "</X509Certificate>";
        }
        res += "\n</X509Data>";
      }
      return res
    };

    this.getKey = function(keyInfo) {
      return "";
    };
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
    var eString = e.toISOString();
    var xml = xmlTemplate({ 'expires': eString,
                            'userKeyhash': getKeyhash(certList[0]),
                            'toolKeyhash': getKeyhash(speakerCert) });
/*
    var xml = xmlTemplate({'speaker_cert': speakerCert,
                           'speaker_urn': toolId,
                           'user_cert': certList[0],
                           'user_urn': userId,
                           'expires': eString});
*/
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
      sig.keyInfoProvider = new GENIKeyInfo(certList);
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
    if (event.source === certWindow && event.data &&
        event.data.certificate && event.data.authority)
    {
      addCert(event.data.certificate);
    }
  }

  function addCert(cert)
  {
    try {
      window.localStorage.certificateList = JSON.stringify([cert]);
    } catch (e) {}
    setupClientPem(cert);
    initAuthorize();
  }

  function setupClientPem(pem)
  {
    encryptedKey = extractKey(pem);
    certList = extractCertificates(pem);
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
    var params = {};
    var re = /[?&]?([^=]+)=([^&]*)/g;
    var tokens = re.exec(qs);
    
    while (tokens) {
      params[decodeURIComponent(tokens[1])]
        = decodeURIComponent(tokens[2]);
      tokens = re.exec(qs);
    }
    
    return params;
  }

  function parsePemCert(pem)
  {
    var cert = forge.pki.certificateFromPem('-----BEGIN CERTIFICATE-----\n' +
                                            pem + '\n' +
                                            '-----END CERTIFICATE-----\n');
    return cert;
  }

  function getKeyhash(pem)
  {
    var cert = parsePemCert(pem);
    var asnBitstring = forge.pki.publicKeyToRSAPublicKey(cert.publicKey);
    var derBitstring = forge.asn1.toDer(asnBitstring);

    var sha1 = forge.md.sha1.create();
    sha1.update(derBitstring.bytes());
    return sha1.digest().toHex();
  }

  $(document).ready(initialize);
});
