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
	<div class="site">
		<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>
		<span class="centered-section">
			<header id="masthead" class="site-header">
				<?php
					echo '<h1 class="hid">';
					echo get_bloginfo('name');
					echo '</h1>';
				?>
				<span class="site-branding">
					<?php

					// the_custom_logo();

					echo '<a href="' .  esc_url(home_url('/')) . '" class="logo" rel="home">';
					// bloginfo( 'name' );
					echo '<img ';
					echo 	'src="' . get_bloginfo('template_url') . '/images/modus-logo.svg" ';
					echo 	'title="' . get_bloginfo('name') . '" ';
					echo 	'itemprop="logo"';
					echo 	'class="site-logo"';
					echo '>';
					// echo file_get_contents(get_bloginfo('template_url') . '/images/modus-logo.svg');
					echo '</a>';

					$description = get_bloginfo( 'description', 'display' );
					if ( $description || is_customize_preview() ) : ?>
						<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
					<?php
					endif; ?>
				</span><!-- .site-branding -->

				<nav id="site-navigation" class="main-navigation hid">
					<h1 class="hid">Site Navigation</h1>
					<?php
						wp_nav_menu( array(
							'theme_location' => 'menu-1',
							'menu_id'        => 'primary-menu',
							'exclude'				 => 2,
						) );
					?>
				</nav><!-- #site-navigation -->
				<?php // get_search_form(); ?>
			</header><!-- #masthead -->
		</span>
		<div id="page-header-image"></div>

		<div id="content" class="site-content">
