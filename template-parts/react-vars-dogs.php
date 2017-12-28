<?php

function modus_get_dogs() {

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

  return $all_dogs;
}
