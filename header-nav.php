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
