<?php

$diagnostic_class = 'hid';

if (current_user_can('administrator')) {
  $user = wp_get_current_user();
  if($user->user_email == 'alex@designbymodus.com') {
    $diagnostic_class = 'is_admin';
  }
}

echo '<div id="react-diagnostic" class="' . $diagnostic_class . '">'; // for stats when logged in.
echo '</div>';
