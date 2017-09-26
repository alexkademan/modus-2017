<?php
add_theme_support( 'post-thumbnails' );

function func_get_single_custom_post($category, $slug) {

  // get a single post using the name of it's category, and it's slug:
  $args = array(
    'name'        => $slug,
    'post_type'   => $category,
    'post_status' => 'publish',
    'numberposts' => 1
  );
  $single_post = get_posts($args);
  if(is_array($single_post) && count($single_post) > 0) {
    return $single_post[0];
  }
  return 'No post with slug "' . $slug . '" in "' . $category . '" category';
}



function show_hidden_span_with_print_r($variable) {
  echo '<span class="hid">' . "\n\n";
  print_r($variable);
  echo '</span>';
}



function find_previous_and_next_posts($all_cat_posts, $current_post_id) {

  // $all_cat_posts == array of all posts in a category.
  // $current_post_id == post on page at moment.
  $current_key = '';
  $last_key = '';
  $prev_next = array();

  if( !isset($current_post_id) or $current_post_id == '') {
    return '';
  }

  if(!is_array($all_cat_posts)) {
    return '';
  }

  if(count($all_cat_posts) < 3) {
    return '';
  }

  foreach($all_cat_posts as $key => $item) {
    if($item->ID == $current_post_id) {
      $current_key = $key;
    }
  }

  if($current_key == '' && $current_key != 0) {
    return '';
  }

  $last_key = (count($all_cat_posts) - 1);
  if ($current_key == $last_key) {
    $prev_next['next'] = $all_cat_posts[0];
  } elseif ($current_key == 0) {
    $prev_next['prev'] = $all_cat_posts[$last_key];
  };

  if (!isset($prev_next['prev'])) {
    $prev_next['prev'] = $all_cat_posts[$current_key - 1];
  }

  if (!isset($prev_next['next'])) {
    $prev_next['next'] = $all_cat_posts[$current_key + 1];
  }

  return $prev_next;
}



function get_webkit_asset($dir, $filename) {

  // takes directory, name without the hash, and returns a URL for the href.
  $assets_dir = '/_assets/build/static/';
  $webkit_dir = get_template_directory() . $assets_dir;
  $directory = $webkit_dir . $dir;
  $this_file = '';
  $webkit_link = '';

  $all_files = scandir($directory);

  if(is_array($all_files)) {
    foreach ($all_files as $value) {
      if($value != '.' && $value != '..') {
        $value_arr = explode('.', $value);
        if(
          $value_arr[0] == $filename &&
          $value_arr[count($value_arr) - 1] != 'map'
        ) {
          $this_file = $value;
        }
      };
    }
  }
  if($this_file != '') {
    $webkit_link = get_bloginfo('stylesheet_directory') . $assets_dir;
    $this_file = $webkit_link . $dir . '/' . $this_file;
  }

  return $this_file;
}
