<?php

function modus_main_nav() {
  $get_array = [
    'sort_column' => 'menu_order',
  ];

  $nav_pages = get_pages($get_array);
  foreach (get_pages($get_array) as $key => $page) {
    if ($page->menu_order != 666) {
      $all_pages[$key] = $page;
      $all_pages[$key]->permalink = get_permalink($page->ID);
    }
  }

  return $all_pages;
}
