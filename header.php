<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
	<?php
	wp_head();
	$main_css = get_webkit_asset('css', 'main');
	if($main_css != '') {
		echo '<link rel="stylesheet"  href="' . $main_css . '" type="text/css" media="all" />';
	}
	?>
</head>
<body <?php body_class() ?>>
	<?php

	?>
<div id="page" class="whole-layout">

	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>

	<?php
		switch (get_the_ID()) {
			case 2:
				get_template_part('header', 'welcome');
				break;

			default:
				get_template_part('header', 'common');
				break;
		}
	?>
	<div class="site">
		<div id="content" class="site-content">
