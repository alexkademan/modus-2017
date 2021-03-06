<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
$this_ID = get_the_id();
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<span class="centered-section">
		<header class="entry-header centered">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->
	</span>
<?php

echo '<span class="centered-section centered-single-column">';
echo 	'<div class="entry-content centered">';

the_content();

echo 	'</div>';
echo 	'<div id="contact-form" class="form"></div>';


// echo '<div class="address">';
// echo '<p>';
get_template_part( 'template-parts/info', 'address' );
// echo '</p>';
// echo '</div>';


echo '</span>'; // .centered-section


wp_link_pages( array(
	'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
	'after'  => '</div>',
) );

echo '</div>';
echo '<div id="map_canvas" class="google-map"></div>';
?>

</article><!-- #post-<?php the_ID(); ?> -->
