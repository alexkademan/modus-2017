<?php
// Variables that I have to send to my react app directly from the server:
$this_id = get_the_ID();
$this_page = [
  'ID' => get_the_ID(),
  'template_path' => get_template_directory() . '/template-parts',
  '$current_custom_fields' => get_post_meta($this_id),
];

require_once($this_page['template_path'] . '/react-vars-mainnav.php');
require_once($this_page['template_path'] . '/react-vars-dogs.php');
require_once($this_page['template_path'] . '/react-vars-dot-header.php');

$react_stuff['mainnav'] = modus_main_nav();
$react_stuff['dogs'] = modus_get_dogs();

if ($this_id == 2) {
  $react_stuff['welcome'] = modus_get_welcome_vars();
}

if (isset($this_page['$current_custom_fields']['header_image'])) {
  $cf = $this_page['$current_custom_fields'];
  $react_stuff['dot_header_image'] = modus_get_dot_image($cf);
}

echo '<script type="text/javascript">';
echo 'window.reactData = ';
print(json_encode($react_stuff));
echo '</script>';
