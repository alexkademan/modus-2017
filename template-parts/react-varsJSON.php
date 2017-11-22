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


$args = array(
  'post_type'=> 'Pets',
  'order'    => 'ASC'
);

$dogs = new WP_Query( $args );

$react_stuff['mainnav'] = $all_pages;
$react_stuff['dogs'] = $dogs->posts;

echo '<script type="text/javascript">';
echo 'window.reactData = ';
print_r(json_encode($react_stuff));
echo '</script>';
