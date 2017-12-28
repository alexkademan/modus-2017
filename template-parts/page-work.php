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
  echo '<span class="centered-section no-padding">';
  echo '<ul class="work-items">';

  foreach ($all_work as $key => $job) {

    $job->meta = get_post_meta($job->ID);

    // print_r($job->meta);
    // print_r($job->custom);

    if (isset($job->meta['sample_image'])) {
      $sample_img_id = $job->meta['sample_image'][0];
      $job->thumbnail = wp_get_attachment_image_src($sample_img_id, 'full');
    } else {
      // no thumbnail image is set:
      $job->thumbnail = [];
      $job->thumbnail[0] = get_bloginfo('template_url') . '/images/placeholder-image.svg';
    };

    echo '<li class="work-post">';
    echo '<a href="' . get_permalink($job->ID) . '">';

    echo '<img src="' . $job->thumbnail[0] . '">';

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


  echo '</ul>';
  echo '</span>';
};
