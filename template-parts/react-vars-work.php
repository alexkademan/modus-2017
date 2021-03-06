<?php
function modus_get_work() {
  $query = new WP_Query(array(
    'post_type' => 'work',
    'post_status' => 'publish',
    'posts_per_page' => -1,
  ));

  if(isset($query->posts)) {
    $work = [];

    foreach($query->posts as $key => $this_post) {
      $editlink = '/wp-admin/post.php?post=' . $this_post->ID . '&action=edit';
      $this_post->editLink = get_bloginfo('wpurl') . $editlink;
      $this_post->permalink = get_permalink($this_post->ID);
      $this_meta = get_post_meta($this_post->ID);

      $this_post->sample_image = modus_get_post_sample_image($this_meta);
      $this_post->images = modus_get_work_images($this_meta);
      if (isset($this_meta['svg_icon'][0])) {
        $this_post->svg_icon = $this_meta['svg_icon'][0];
      }
      array_push($work, $this_post);
    }
  } else {
    $work = false;
  };

  wp_reset_query();
  return $work;
}

function modus_get_post_sample_image($this_meta) {
  if (isset($this_meta['sample_image'][0])) {
    $sample_image = wp_get_attachment_image_src($this_meta['sample_image'][0], 'full')[0];
  } else {
    $sample_image = get_bloginfo('template_url') .
        '/images/placeholder-image.svg';
  }
  return $sample_image;
}

function modus_get_work_images($this_meta) {
  $images = false;
  if (
    isset($this_meta['portfolio_a']) OR
    isset($this_meta['portfolio_b']) OR
    isset($this_meta['portfolio_c'])
  ) {
    $images = [];
  }

  if (
    isset($this_meta['portfolio_a'][0]) && $this_meta['portfolio_a'][0] != ''
  ) {
    $this_image = modus_get_image_info($this_meta['portfolio_a'][0]);
    array_push($images, $this_image);
  }
  if (
    isset($this_meta['portfolio_b'][0]) && $this_meta['portfolio_b'][0] != ''
  ) {
    $this_image = modus_get_image_info($this_meta['portfolio_b'][0]);
    array_push($images, $this_image);
  }
  if (
    isset($this_meta['portfolio_c'][0]) && $this_meta['portfolio_c'][0] != ''
  ) {
    $this_image = modus_get_image_info($this_meta['portfolio_c'][0]);
    array_push($images, $this_image);
  }

  return $images;
}

function modus_get_image_info($imageID) {
  $post_obj = get_post($imageID);
  $post_obj->img = wp_get_attachment_image_src($imageID, 'original');
  return get_post($post_obj);
}
