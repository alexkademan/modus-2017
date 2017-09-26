<?php

$all_work = get_posts(
  array(
    'posts_per_page' => -1,
    'post_type' => 'work',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  )
);

if(is_array($all_work)) {
  echo '<span class="centered-single-column">';
  echo '<ul class="work-items">';

  foreach ($all_work as $key => $job) {

    $job->meta = get_post_meta($job->ID);

    if(isset($job->meta['_thumbnail_id'][0])) {

      // this one has a featured image:
      $thumbID = $job->meta['_thumbnail_id'][0];
      $job->featured_image = wp_get_attachment_image_src($thumbID, 'full', true)[0];
      $job->thumbnail = wp_get_attachment_image_src($thumbID)[0];
    } else {

      // no featured image is set:
      $job->featured_image = get_bloginfo('template_url') . '/images/placeholder-image.svg';
      $job->thumbnail = get_bloginfo('template_url') . '/images/placeholder-image.svg';

    };

    echo '<li class="work-post">';
    echo '<a href="' . get_permalink($job->ID) . '">';

    echo '<img src="' . $job->featured_image . '">';

    echo '<hgroup>';

    echo '<h3>';
    print_r($job->post_title);
    echo '</h3>';

    if(isset($job->meta['subtitle'][0]) && $job->meta['subtitle'][0] != '') {
      echo '<h4>';
      echo $job->meta['subtitle'][0];
      echo '</h4>';
    }

    echo '</hgroup>';
    echo '</a>';

    // show_hidden_span_with_print_r($job);
    echo '</li>';
  }


  echo '</ul></span>';
};
