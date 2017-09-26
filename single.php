<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package _s
 */

$post_type = get_post_type();
get_header();

echo '<div id="primary" class="content-area">';
echo '<main id="main" class="site-main">';

while ( have_posts() ) : the_post();

	get_template_part( 'template-parts/content', $post_type );

	if($post_type != 'work') {
		the_post_navigation();

		// If comments are open or we have at least one comment, load up the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;
	}

endwhile; // End of the loop.

echo '</main>';// #main
echo '</div>'; // #primary

get_sidebar();
get_footer();
