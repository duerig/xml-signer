/*global require: true */
require(['jquery', 'lib/xml-crypto/signed-xml', 'text!cred-ex.xml'],
function ($, sigExport, xml) {
  'use strict';
  var SignedXml = sigExport.SignedXml;
  xml =
'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'+
'<signed-credential xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.protogeni.net/resources/credential/credential.xsd" xsi:schemaLocation="http://www.protogeni.net/resources/credential/ext/policy/1 http://www.protogeni.net/resources/credential/ext/policy/1/policy.xsd">'+
'  <credential>'+
' <type>privilege</type>'+
' <serial>15102</serial>'+
' <owner_gid>MIIEQTCCA6qgAwIBAgICBAcwDQYJKoZIhvcNAQEEBQAwgeMxCzAJBgNVBAYTAlVT'+
'MQ0wCwYDVQQIEwRVdGFoMRswGQYDVQQHExJTYWx0IExha2UgU2ltIENpdHkxITAf'+
'BgNVBAoTGFV0YWggTmV0d29yayBTZWNvbmQgTGlmZTEeMBwGA1UECxMVQ2VydGlm'+
'aWNhdGUgQXV0aG9yaXR5MSkwJwYDVQQDEyBteWJvc3Muam9ubGFiLnRlc3RiZWQu'+
'ZW11bGFiLm5ldDE6MDgGCSqGSIb3DQEJARYrdGVzdGJlZC1vcHNAbXlvcHMuam9u'+
'bGFiLnRlc3RiZWQuZW11bGFiLm5ldDAeFw0xMzA1MjkxMzU5MDFaFw0xNDA1Mjkx'+
'MzU5MDFaMIGzMQswCQYDVQQGEwJVUzENMAsGA1UECBMEVXRhaDEhMB8GA1UEChMY'+
'VXRhaCBOZXR3b3JrIFNlY29uZCBMaWZlMRQwEgYDVQQLEwtqb25sYWIudXNlcjEt'+
'MCsGA1UEAxMkNzcxZGUzY2EtYzg2Ny0xMWUyLWIwMDEtMDAyNGU4NzkyN2ViMS0w'+
'KwYJKoZIhvcNAQkBFh51c2VyQGpvbmxhYi50ZXN0YmVkLmVtdWxhYi5uZXQwgZ8w'+
'DQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAJwMbC6tGGlqcL5Jsm65uMQyyr9epUEJ'+
'MidAV5pMi5I2jlwy+xfI01OT+bmq/ZqB6yLgTERAXMx/xcjA3M9zRcO2h3gK6W2R'+
'5Jg1sZbocHaS6Qp8nrceXUdnWJxHPxwHlkGcNZisTNrB/jzUIZvzqpHKsHj8SKAF'+
'ByRXo7FgeEubAgMBAAGjggEwMIIBLDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQG'+
'0yIBzv5opmk6a6YDjdQb+jq09jCBkAYDVR0RBIGIMIGFhjR1cm46cHVibGljaWQ6'+
'SUROK2pvbmxhYi50ZXN0YmVkLmVtdWxhYi5uZXQrdXNlcit1c2VygR51c2VyQGpv'+
'bmxhYi50ZXN0YmVkLmVtdWxhYi5uZXSGLXVybjp1dWlkOjc3MWRlM2NhLWM4Njct'+
'MTFlMi1iMDAxLTAwMjRlODc5MjdlYjBqBggrBgEFBQcBAQReMFwwWgYUaYPMk4Co'+
'mMyox72xp4CAqq7XihuGQmh0dHBzOi8vbXlib3NzLmpvbmxhYi50ZXN0YmVkLmVt'+
'dWxhYi5uZXQ6MTIzNjkvcHJvdG9nZW5pL3htbHJwYy9zYTANBgkqhkiG9w0BAQQF'+
'AAOBgQBcdrf70YPbnIoQvlUdX/rBRh4Xxo55uqJ8kZEdnIKcN/OaiwYkVuPHWl/k'+
'qxmTnB707+e9uhhszNhQLuWnXuD+w08gcBUNQiUxF9MjW1nw1LrLQjvShetJKVs6'+
'Uut/UnbDbeS05LkhQw0I1Q75alZcY6r5qRZkmcbDisR8IRHjJg=='+
'</owner_gid>'+
' <owner_urn>urn:publicid:IDN+jonlab.testbed.emulab.net+user+user</owner_urn>'+
' <target_gid>MIID/jCCA2egAwIBAgICA/gwDQYJKoZIhvcNAQEEBQAwgeMxCzAJBgNVBAYTAlVT'+
'MQ0wCwYDVQQIEwRVdGFoMRswGQYDVQQHExJTYWx0IExha2UgU2ltIENpdHkxITAf'+
'BgNVBAoTGFV0YWggTmV0d29yayBTZWNvbmQgTGlmZTEeMBwGA1UECxMVQ2VydGlm'+
'aWNhdGUgQXV0aG9yaXR5MSkwJwYDVQQDEyBteWJvc3Muam9ubGFiLnRlc3RiZWQu'+
'ZW11bGFiLm5ldDE6MDgGCSqGSIb3DQEJARYrdGVzdGJlZC1vcHNAbXlvcHMuam9u'+
'bGFiLnRlc3RiZWQuZW11bGFiLm5ldDAeFw0xMzA0MjIxNTE1NDNaFw0xODEwMTMx'+
'NjE1NDNaMIG+MQswCQYDVQQGEwJVUzENMAsGA1UECBMEVXRhaDEhMB8GA1UEChMY'+
'VXRhaCBOZXR3b3JrIFNlY29uZCBMaWZlMRIwEAYDVQQLEwlqb25sYWIuc2ExLTAr'+
'BgNVBAMTJGUxYTIxMzNkLWFiNjctMTFlMi1iMDAxLTAwMjRlODc5MjdlYjE6MDgG'+
'CSqGSIb3DQEJARYrdGVzdGJlZC1vcHNAbXlvcHMuam9ubGFiLnRlc3RiZWQuZW11'+
'bGFiLm5ldDCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAzYZo6Dq9Yo+LZ/Ah'+
'M2f6r/jkO/tJow5h6A4F4kqZfHIS1lyN/zICra47qjHpgrBC3npR5+ibr4AosC4m'+
'wDo09yFHbS0CUSIGuemt7Nnt/siD8ULqXwYMwHHDhr+wQnqgjiPoo0FT69lbfiQ3'+
'P1IH6TVn8j5vK/5i1PtolKqUg5MCAwEAAaOB4zCB4DAdBgNVHQ4EFgQUbXWxdwVR'+
'Ouopn6qnsRp9jaY9nBYwQgYDVR0RBDswOYY3dXJuOnB1YmxpY2lkOklETitqb25s'+
'YWIudGVzdGJlZC5lbXVsYWIubmV0K2F1dGhvcml0eStzYTAPBgNVHRMBAf8EBTAD'+
'AQH/MGoGCCsGAQUFBwEBBF4wXDBaBhRpg8yTgKiYzKjHvbGngICqrteKG4ZCaHR0'+
'cHM6Ly9teWJvc3Muam9ubGFiLnRlc3RiZWQuZW11bGFiLm5ldDoxMjM2OS9wcm90'+
'b2dlbmkveG1scnBjL3NhMA0GCSqGSIb3DQEBBAUAA4GBAHUtR537wn94Em+BJUS4'+
'lb6qQ/mDG49l1K12XJghyKU40pQCxRKlp4EWScghgtwcpBTaCcA3+ZOgkdwnHXLx'+
'pCabA69clBKdncqaaUzSCx4AGjGe9yMX6WliBvvh2dODQZeFlK7C9B7mTvkTFv4Z'+
'iMdQbxu/Fh8LdtU+ymuXekid'+
'</target_gid>'+
' <target_urn>urn:publicid:IDN+jonlab.testbed.emulab.net+authority+sa</target_urn>'+
' <uuid>9bc8ec4e-c869-11e2-b001-0024e87927eb</uuid>'+
' <expires>2013-05-30T14:11:08Z</expires>'+
'  <privileges>'+
'<privilege><name>*</name><can_delegate>1</can_delegate></privilege>'+
'</privileges></credential>'+
'  <signatures>'+
'  </signatures>'+
'</signed-credential>';

var password = 'passwordasdf';
var encryptedKey =
'-----BEGIN RSA PRIVATE KEY-----\n'+
'Proc-Type: 4,ENCRYPTED\n'+
'DEK-Info: DES-EDE3-CBC,EED7DA26C14CB43A\n'+
'\n'+
'SXVUpacwxLlSk5BdJQFHFPajFPdthOyu3hYgfdP4Ncb+BBtLGN5KJhz5K454V/rQ\n'+
'1uPI95QGpo0gi86pM6xl/jw3pLCRQKCXJNz7E/T6oVu5MPHj+V6jeb+ggktfj6aR\n'+
'hz+fokOTb4bKBnZzYVuDeSx9eqKFGAcpVuMX92xw+PknbKf8Eh+OAqHtvdxlDDC6\n'+
'9XYy4VLll0VGwqhapgOOJ5G093fbhvWPyir1qHLwk+OpLJVLE9l3/fBm6gR6qm3G\n'+
'x/yvyDJuvSp3CfMHJYUa3J6+mWliltYJ53Z2VKcs01SYs+owaEAkwdp803wxC6wD\n'+
'6xqdAADciMNsdU7Wp6yK/cxb13QvyPsizTuY2LhdMCD5FtFEbPeLPafma1ca0R3i\n'+
'HknxqATMh8VYX8/PdcXt1yf0GrKGligTxvbpKvbulrLh/bV17m9XPa7Xfpvti0gw\n'+
'JOQDB7GBGorjwGIGj0XP+D0fasKURFFcbVSDTBtQCBnQO9HnS9xbnoQh6/zE4UWl\n'+
'/aLUV2c/KdkjFjkxW3YSLX/ZxMXQHGPOssRkOszwoYvdgX89O2xhpRi7gIxTkNPs\n'+
'zH0TmSzsQ0b04JcfU4i4SIXkc6yQbgsb/k6mN7pVtgUmC0S1/NrC5+8+59Fopq+Y\n'+
'S9Io6pLDA+BaPdb1J0+e3T39809lQcDadbfC1zQpQy6edFlnk8L+8f0D1oiJhhSy\n'+
'6LAVy3NxTbburga8gC1fK77rjiepLxbjrQcQ/Q+y/fMzQN1Qw5DCI53CtWitQWO1\n'+
'mGS0M78du8+6nvTYpeYZnfYQL3vlhGpWKXaLfnyClLm2rQBX7FdUHw==\n'+
'-----END RSA PRIVATE KEY-----\n';

var cert =
'MIIEQTCCA6qgAwIBAgICBAcwDQYJKoZIhvcNAQEEBQAwgeMxCzAJBgNVBAYTAlVT'+
'MQ0wCwYDVQQIEwRVdGFoMRswGQYDVQQHExJTYWx0IExha2UgU2ltIENpdHkxITAf'+
'BgNVBAoTGFV0YWggTmV0d29yayBTZWNvbmQgTGlmZTEeMBwGA1UECxMVQ2VydGlm'+
'aWNhdGUgQXV0aG9yaXR5MSkwJwYDVQQDEyBteWJvc3Muam9ubGFiLnRlc3RiZWQu'+
'ZW11bGFiLm5ldDE6MDgGCSqGSIb3DQEJARYrdGVzdGJlZC1vcHNAbXlvcHMuam9u'+
'bGFiLnRlc3RiZWQuZW11bGFiLm5ldDAeFw0xMzA1MjkxMzU5MDFaFw0xNDA1Mjkx'+
'MzU5MDFaMIGzMQswCQYDVQQGEwJVUzENMAsGA1UECBMEVXRhaDEhMB8GA1UEChMY'+
'VXRhaCBOZXR3b3JrIFNlY29uZCBMaWZlMRQwEgYDVQQLEwtqb25sYWIudXNlcjEt'+
'MCsGA1UEAxMkNzcxZGUzY2EtYzg2Ny0xMWUyLWIwMDEtMDAyNGU4NzkyN2ViMS0w'+
'KwYJKoZIhvcNAQkBFh51c2VyQGpvbmxhYi50ZXN0YmVkLmVtdWxhYi5uZXQwgZ8w'+
'DQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAJwMbC6tGGlqcL5Jsm65uMQyyr9epUEJ'+
'MidAV5pMi5I2jlwy+xfI01OT+bmq/ZqB6yLgTERAXMx/xcjA3M9zRcO2h3gK6W2R'+
'5Jg1sZbocHaS6Qp8nrceXUdnWJxHPxwHlkGcNZisTNrB/jzUIZvzqpHKsHj8SKAF'+
'ByRXo7FgeEubAgMBAAGjggEwMIIBLDAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBQG'+
'0yIBzv5opmk6a6YDjdQb+jq09jCBkAYDVR0RBIGIMIGFhjR1cm46cHVibGljaWQ6'+
'SUROK2pvbmxhYi50ZXN0YmVkLmVtdWxhYi5uZXQrdXNlcit1c2VygR51c2VyQGpv'+
'bmxhYi50ZXN0YmVkLmVtdWxhYi5uZXSGLXVybjp1dWlkOjc3MWRlM2NhLWM4Njct'+
'MTFlMi1iMDAxLTAwMjRlODc5MjdlYjBqBggrBgEFBQcBAQReMFwwWgYUaYPMk4Co'+
'mMyox72xp4CAqq7XihuGQmh0dHBzOi8vbXlib3NzLmpvbmxhYi50ZXN0YmVkLmVt'+
'dWxhYi5uZXQ6MTIzNjkvcHJvdG9nZW5pL3htbHJwYy9zYTANBgkqhkiG9w0BAQQF'+
'AAOBgQBcdrf70YPbnIoQvlUdX/rBRh4Xxo55uqJ8kZEdnIKcN/OaiwYkVuPHWl/k'+
'qxmTnB707+e9uhhszNhQLuWnXuD+w08gcBUNQiUxF9MjW1nw1LrLQjvShetJKVs6'+
'Uut/UnbDbeS05LkhQw0I1Q75alZcY6r5qRZkmcbDisR8IRHjJg==';


  function initialize()
  {
    $('#original').html(htmlEncode(xml));
    $('#button').click(clickSign);
    $('#private').submit(clickSign);
  }
  
  function clickSign(event)
  {
    event.preventDefault();
//    var encryptedKey = $('#key').val();
//    var password = $('#password').val();
    var decrypted = PKCS5PKEY.getDecryptedKeyHex(encryptedKey, password);
    var key = new RSAKey();
    key.readPrivateKeyFromASN1HexString(decrypted);
    var sig = new SignedXml();
    sig.addReference("//*[local-name(.)='credential']");
    sig.signingKey = key;
    sig.signatureNode = "//*[local-name(.)='signatures']";
    sig.keyInfoProvider = new sigExport.StoredKeyInfo(cert);
    sig.computeSignature(xml);
    console.log(sig.getSignedXml());
    $('#signed').val(sig.getSignedXml());
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
