/*global require: true */
require(['jquery', 'lib/xml-crypto/signed-xml'],
function ($, sigExport) {
  'use strict';
  var SignedXml = sigExport.SignedXml;
  var xml =
'<library>\n'+
'<book><name>Harry Potter</name></book>'+
/*
'  <Signature xmlns="http://www.w3.org/2000/09/xmldsig#">\n'+
'    <SignedInfo>\n'+
'      <CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>\n'+
'      <SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1"/>\n'+
'      <Reference URI="">\n'+
'	<Transforms>\n'+
'	  <Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>\n'+
'	</Transforms>\n'+
'	<DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>\n'+
'	<DigestValue></DigestValue>\n'+
'      </Reference>\n'+
'    </SignedInfo>\n'+
'    <SignatureValue>\n'+
'    </SignatureValue>\n'+
'    <KeyInfo>\n'+
'      <X509Data>\n'+
'      </X509Data>\n'+
'    </KeyInfo>\n'+
'  </Signature>\n'+
*/
'</library>\n';

  function initialize()
  {
    $('#original').html(htmlEncode(xml));
    $('#button').click(clickSign);
    $('#private').submit(clickSign);
  }
  
  function clickSign(event)
  {
    event.preventDefault();
    var encryptedKey = $('#key').val();
    var password = $('#password').val();
    console.dir(encryptedKey);
    console.dir(password);
    var decrypted = PKCS5PKEY.getDecryptedKeyHex(encryptedKey, password);
    var key = new RSAKey();
    key.readPrivateKeyFromASN1HexString(decrypted);
    var sig = new SignedXml();
    sig.addReference("//*[local-name(.)='book']");
    sig.signingKey = key;
    sig.computeSignature(xml);
    console.log(sig.getSignedXml());
    $('#signed').html(htmlEncode(sig.getSignedXml()));
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

  $(document).ready(initialize);
});
