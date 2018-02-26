<?php
// Variables that I have to send to my react app directly from the server:
$this_id = get_the_ID();
$this_page = [
  'ID' => get_the_ID(),
  'template_path' => get_template_directory() . '/template-parts',
  '$current_custom_fields' => get_post_meta($this_id),
];

// print_r($this_page);
$cf = $this_page['$current_custom_fields'];

require_once($this_page['template_path'] . '/react-vars-mainnav.php');
require_once($this_page['template_path'] . '/react-vars-dogs.php');
require_once($this_page['template_path'] . '/react-vars-dot-header.php');
require_once($this_page['template_path'] . '/react-vars-home-page.php');

$react_stuff['mainnav'] = modus_main_nav();
$react_stuff['dogs'] = modus_get_dogs();

if ($this_id == 2) {
  $react_stuff['welcome'] = modus_get_welcome_vars();
}

if (isset($this_page['$current_custom_fields']['header_image'])) {
  // $cf = $this_page['$current_custom_fields'];
  $react_stuff['dot_header_image'] = modus_get_dot_image($cf);
}

if ($this_id == 2) {
  // stuff for the home page: 
  $react_stuff['home_content'] = modus_get_home_blurbs($cf);
}

if ($this_id == 10) {
  require_once($this_page['template_path'] . '/react-vars-work.php');
  $react_stuff['work'] = modus_get_work();
};

echo '<script type="text/javascript">';
echo 'window.reactData = ';
print(json_encode($react_stuff));
echo '</script>';
