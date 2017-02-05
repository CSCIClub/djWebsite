$(document).ready(function() {
  function getCookie(c_name) {
    if (document.cookie.length > 0) {
      var c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
        c_start = c_start + c_name.length + 1;
        var c_end = document.cookie.indexOf(";", c_start);
        if (c_end == -1) c_end = document.cookie.length;
        return unescape(document.cookie.substring(c_start,c_end));
      }
    }
    return "";
  }

  $("#subscribeForm").submit(function(event) {
    event.preventDefault();
    $.ajaxSetup({
      headers: { "X-CSRFToken": getCookie("csrftoken") }
    });

    $.ajax({
      type:"POST",
      url:"/email/subscribe/",
      data: {
        'csrf_token': $('').val(),
        'email_address': $('#id_email_address').val() // from form
      },
      success: function(data){
        var subscribeForm = $('#subscribeForm');
        var changeBackgroundTo = function (color) {
          subscribeForm.css('background-color', color);
        };
        if (data === 'success') {
          changeBackgroundTo('green');
        } else if (data === 'failure') {
          changeBackgroundTo('red');
        } else if (data === 'invalid') {
          changeBackgroundTo('black');
        }
        // $('#message').html("<h2>Contact Form Submitted!</h2>");
      }
    });
    return false;
  });
});
