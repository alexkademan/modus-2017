<?php

$diagnostic_class = '';

if (current_user_can('administrator')) {
  $user = wp_get_current_user();
  if($user->user_email == 'alex@designbymodus.com') {
    $diagnostic_class = 'is-admin';
  }
}

echo '<div id="react-div" class="' . $diagnostic_class . '"></div>';
