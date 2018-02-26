<?php
function modus_get_home_blurbs($custom_fields) {
  $home_blurbs = [];

  array_push ( $home_blurbs, [
    'title' => $custom_fields['blurb_1_title'][0],
    'paragraph' => $custom_fields['blurb_1_paragraph'][0],
    'key' => $custom_fields['_blurb_1_title'][0],
    'sort' => 0,
  ]);

  array_push ( $home_blurbs, [
    'title' => $custom_fields['blurb_2_title'][0],
    'paragraph' => $custom_fields['blurb_2_paragraph'][0],
    'key' => $custom_fields['_blurb_2_title'][0],
    'sort' => 1,
  ]);

  array_push ( $home_blurbs, [
    'title' => $custom_fields['blurb_3_title'][0],
    'paragraph' => $custom_fields['blurb_3_paragraph'][0],
    'key' => $custom_fields['_blurb_3_title'][0],
    'sort' => 2,
  ]);

  $home_stuff = [
    'title' => get_the_title(),
    'blurbs' => $home_blurbs,
  ];

  return $home_stuff;
}
