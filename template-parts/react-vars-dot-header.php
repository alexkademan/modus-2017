<?php
// echo 'react-header!!';

function modus_get_dot_image($custom_fields) {
  $header_image_ID = $custom_fields['header_image'][0];
  $header_image = wp_get_attachment_image_src($header_image_ID, 'original');

  $dot_header = [
    'ID' => $header_image_ID,
    'url' => $header_image[0],
    'width' => $header_image[1],
    'height' => $header_image[2],
    'dots_wide' => $custom_fields['dots_wide'][0],
    'header_color' => $custom_fields['header_color'][0],
  ];

  return $dot_header;
}

function modus_get_welcome_vars($custom_fields) {
  // print_r($custom_fields['home_subhead'][0]);
  $welcome = [
    'headline1' => 'Good Business',
    'headline2' => 'By Design.',
    'subhead1' => $custom_fields['home_subhead'][0],
  ];

  return $welcome;
}
