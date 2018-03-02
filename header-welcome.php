<?php
echo '<div id="page-header-image" class="page-header-image"></div>'
?>
<div class="header-bg home-header">
	<span class="centered-section">
		<?php

		echo '<span class="site-branding">';

			// the_custom_logo();
			echo '<a href="' .  esc_url(home_url('/')) . '" class="logo" rel="home">';
			// bloginfo( 'name' );
			echo '<img ';
			echo 	'src="' . get_bloginfo('template_url') . '/images/modus-logo-reverse.svg" ';
			echo 	'title="' . get_bloginfo('name') . '" ';
			echo 	'itemprop="logo"';
			echo 	'class="site-logo"';
			echo '>';
			// echo file_get_contents(get_bloginfo('template_url') . '/images/modus-logo.svg');
			echo '</a>';


		echo  '</span>'; // .site-branding


		?>
		<header id="masthead" class="site-header">
			<?php
				echo '<h1 class="hid">';
				echo get_bloginfo('name');
				echo '</h1>';

				echo '<span class="subhead hid">';
				// $description = get_bloginfo( 'description', 'display' );
				// if ($description) {
				// 	echo '<h1 class="site-description">';
				// 	echo $description; /* WPCS: xss ok. */
				// 	echo '</h1>';
				// }
				echo '<h1>Good Business<br />By Design.</h1>';
				echo '<p>We\'re cool</p>';
				echo '</span>'; // .subhead
			?>

			<?php get_template_part('header', 'nav') ?>
			<?php // get_search_form(); ?>
		</header><!-- #masthead -->
	</span>
</div>
