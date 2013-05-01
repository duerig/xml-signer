/*global define: true */
define (['lib/xml-crypto/xpath'],
function (select) {

function EnvelopedSignature() {
}

EnvelopedSignature.prototype.process = function (node) {
  var signature = select(node.ownerDocument, "//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];
  if (signature) signature.parentNode.removeChild(signature)
  return node.toString();
};

EnvelopedSignature.prototype.getAlgorithmName = function () {
  return "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
};

  return EnvelopedSignature;
});
