
var genilib = {};
genilib.trustedHost = '*';

genilib.authorize = function(id, cert, callback)
{
  var wrapper = {};

  wrapper.other = window.open('index.html?id=' + encodeURIComponent(id), 'GENI Tool Authorization',
                              'height=400,width=800');

  wrapper.listener = function (event) {
    var data;
    if (event.source === wrapper.other &&
        event.origin === genilib.trustedHost &&
        event.data.ready)
    {
      data = {
        certificate: cert
      };
      wrapper.other.postMessage(data, genilib.trustedHost);
    }
    else if (event.source === wrapper.other &&
             event.origin === genilib.trustedHost &&
             event.data.id && event.data.id === id && event.data.credential)
    {
      window.removeEventListener('message', wrapper.listener, false);
      wrapper.other.removeEventListener('close', wrapper.close, false);

      data = {
        id: event.data.id,
        ack: true
      };
      wrapper.other.postMessage(data, genilib.trustedHost);

      callback(event.data.credential);
    }
  };

  wrapper.close = function (event) {
    window.removeEventListener('message', wrapper.message, false);
    wrapper.other.removeEventListener('close', wrapper.close, false);
  };

  window.addEventListener('message', wrapper.listener, false);
  wrapper.other.addEventListener('close', wrapper.close, false);
};

genilib.sendCertificate = function (cert)
{
  window.opener.postMessage({certificate: cert}, genilib.trustedHost);
  window.close();
};
