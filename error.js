define(['jquery'],
function ($) {
  var error = {};

  error.show = function () {
    $('#error-box').html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Incorrect password or certificate is invalid.</div>');
  };

  error.hide = function() {
  	$('#error-box').html('');
  }

  return error;
});
