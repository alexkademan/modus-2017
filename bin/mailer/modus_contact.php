<?php

// set Access-Control-Allow-Origin header for CORS:
require './header_check.php';
date_default_timezone_set('America/Chicago');

if (
  (isset($_POST['first']) && $_POST['first'] != '') &&
  (isset($_POST['email']) && $_POST['email'] != '') &&
  (isset($_POST['message']) && $_POST['message'] != '')
) {
  $mail_message = '';

  $mail_message .= date("l, F j, Y, g:i a") . "\n";

  $mail_message .= '<p>';
  $mail_message .= 'first: ' . $_POST['first'] . "<br />\r\n";
  if (isset($_POST['last']) && $_POST['last'] != '') {
    $mail_message .= 'last: ' . $_POST['last'] . "<br />\r\n";
  }
  $mail_message .= "email: " . $_POST['email'] . "\n";
  $mail_message .= '</p>';

  $mail_message .= 'message: <br />' . $_POST['message'] . "\n";
  send_the_email($mail_message);

} else {
  echo 'missing required fields';
}


function send_the_email($the_message) {
  require './gmail2.php';
  $mail->Body = $the_message;

  //send the message, check for errors
  if (!$mail->send()) {
      // echo "Mailer Error: " . $mail->ErrorInfo;
      echo 'error';
  } else {
      echo 'success';
  }
}
