<?php
// Variables that I have to send to my react app directly from the server:

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


$pets_args = array(
  'post_type'=> 'Pets',
  'order'    => 'ASC'
);

$dogs = new WP_Query( $pets_args );
$dogs_page = get_bloginfo('wpurl') . '/pets';

foreach($dogs->posts as $key => $post) {
  $post->allDogsURL = $dogs_page;
  $post->permalink = get_permalink($post->ID);
  $thumb_ID = get_post_thumbnail_id($post->ID);
  if (isset($thumb_ID)) {
    $post->featured_img = wp_get_attachment_image_src($thumb_ID, 'original');
  }

  $all_dogs[$key] = $post;
}
// print_r($all_dogs);
$react_stuff['mainnav'] = $all_pages;
$react_stuff['dogs'] = $all_dogs;

echo '<script type="text/javascript">';
echo 'window.reactData = ';
print(json_encode($react_stuff));
echo '</script>';
