/*global require: true */

require(['jquery', 'text!cred/user.pem'],
function ($, cert) {
  'use strict';

  function initialize()
  {
    $('#login').submit(clickLogin);
    $('#login-button').click(clickLogin);
  }

  function clickLogin(event)
  {
    event.preventDefault();
    genilib.sendCertificate(cert);
    return false;
  }
  
  $(document).ready(initialize);

});
