<?php

$all_pets = get_posts(
  array(
    'posts_per_page' => -1,
    'post_type' => 'pets',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  )
);

if(is_array($all_pets)) {
  echo '<span class="centered-single-column">';
  echo '<ul class="work-items">';

  foreach ($all_pets as $key => $pet) {
    // $pet->meta = get_post_meta($pet->ID);
    $thumb_ID = get_post_thumbnail_id($pet->ID);

    if (isset($thumb_ID)) {
      $pet->thumbnail = wp_get_attachment_image_src($thumb_ID, 'original');
    } else {
      // no thumbnail image is set:
      $pet->thumbnail = [];
      $pet->thumbnail[0] = get_bloginfo('template_url') . '/images/placeholder-image.svg';
    };

    echo '<li class="work-post">';
    echo '<a href="' . get_permalink($pet->ID) . '">';

    echo '<img src="' . $pet->thumbnail[0] . '">';

    echo '<hgroup>';

    echo '<h3>';
    print_r($pet->post_title);
    echo '</h3>';

    if(isset($pet->meta['subtitle'][0]) && $pet->meta['subtitle'][0] != '') {
      echo '<h4>';
      echo $pet->meta['subtitle'][0];
      echo '</h4>';
    }

    echo '</hgroup>';
    echo '</a>';

    // show_hidden_span_with_print_r($pet);
    echo '</li>';
  }


  echo '</ul></span>';
};
