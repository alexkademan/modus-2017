
<div class="header-bg header-common">
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
				echo 	'src="' . get_bloginfo('template_url') . '/images/modus-logo-reverse.svg" ';
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
			<?php get_template_part('header', 'nav') ?>
			<?php // get_search_form(); ?>
		</header><!-- #masthead -->
	</span>
</div>
