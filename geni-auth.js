
var genilib = {};
genilib.trustedHost = 'https://www.emulab.net';
genilib.trustedPath = '/protogeni/speaks-for/index.html';

genilib.authorize = function(id, cert, callback, defaultMA)
{
  var wrapper = {};

  wrapper.other = window.open(genilib.trustedHost + genilib.trustedPath +
                              '?id=' +
                              encodeURIComponent(id),
                              'GENI Tool Authorization',
                              'height=400,width=800');

  wrapper.listener = function (event) {
    var data;
    if (event.source === wrapper.other &&
        event.origin === genilib.trustedHost &&
        event.data.ready)
    {
      data = {
        certificate: cert,
        tool: true
      };
      /* Include the default MA if specified. */
      if (defaultMA && defaultMA.url && defaultMA.name) {
          data.ma = {};
          data.ma.url = defaultMA.url;
          data.ma.name = defaultMA.name;
      }
      console.log('Sending cert to ' + genilib.trustedHost);
      wrapper.other.postMessage(data, genilib.trustedHost);
    }
    else if (event.source === wrapper.other &&
             event.origin === genilib.trustedHost &&
             event.data.id && event.data.id === id && event.data.credential)
    {
      window.removeEventListener('message', wrapper.listener, false);
//      wrapper.other.removeEventListener('close', wrapper.close, false);

      data = {
        id: event.data.id,
        ack: true
      };
      console.log('Sending ack to ' + genilib.trustedHost);
      wrapper.other.postMessage(data, genilib.trustedHost);

      callback(event.data.credential);
    }
  };

  wrapper.close = function (event) {
    window.removeEventListener('message', wrapper.message, false);
//    wrapper.other.removeEventListener('close', wrapper.close, false);
  };

  window.addEventListener('message', wrapper.listener, false);
//  wrapper.other.addEventListener('close', wrapper.close, false);
};

genilib.sendCertificate = function (cert)
{
  var options = {
    certificate: cert,
    authority: true
  };
  window.opener.postMessage(options, '*'/*genilib.trustedHost*/);
  window.close();
};

genilib.sendCredential = function (cred)
{
  var options = {
    sfcred: cred,
    authority: true
  };
  window.opener.postMessage(options, '*'/*genilib.trustedHost*/);
  window.close();
};
