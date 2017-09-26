<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<span class="centered-section">
		<header class="entry-header">
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header><!-- .entry-header -->
	</span>
<?php

if(get_the_ID() === 10) {

	// 'work' page:
	get_template_part( 'template-parts/page', 'work' );

} else {
	echo '<span class="centered-section">';
	echo '<div class="entry-content">';
	the_content();
	echo '</div>';
	echo '</span>';

	wp_link_pages( array(
		'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
		'after'  => '</div>',
	) );

};
echo '</div>';
?>

</article><!-- #post-<?php the_ID(); ?> -->
