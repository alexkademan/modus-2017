<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header();

echo '<div id="primary" class="content-area">';
echo '<main id="main" class="site-main">';

while ( have_posts() ) : the_post();
	if (get_the_ID() == 2) {
		get_template_part( 'template-parts/page', 'home' );
	} elseif (get_the_ID() == 7) {
		get_template_part( 'template-parts/page', 'contact' );
	} else {
		get_template_part( 'template-parts/content', 'page' );
	}

	// If comments are open or we have at least one comment, load up the comment template.
	if ( comments_open() || get_comments_number() ) :
		comments_template();
	endif;

endwhile; // End of the loop.

echo '</main>'; // #main
echo '</div>'; // #primary

// get_search_form();
get_sidebar();
get_footer();
