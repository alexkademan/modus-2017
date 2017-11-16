<?php
// Variables that I have to send to my react app directly from the server:

$get_array = [
  'sort_column' => 'menu_order',
];

$nav_pages = get_pages($get_array);
foreach (get_pages($get_array) as $key => $page) {
  $all_pages[$key] = $page;
  $all_pages[$key]->permalink = get_permalink($page->ID);
}

$react_stuff['mainnav'] = $all_pages;

echo '<script type="text/javascript">';
echo 'window.reactData = ';
print_r(json_encode($react_stuff));
echo '</script>';
