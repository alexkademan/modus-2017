<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
$this_post = get_post(get_the_ID());


echo '<article id="post-' . get_the_ID() . '" ';
post_class();
echo '>';
?>
	<span class="centered-section">
		<header class="entry-header">
			<?php
			if ( is_singular() ) :
				the_title( '<h1 class="entry-title">', '</h1>' );
			else :
				the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
			endif;

			if ( 'post' === get_post_type() ) : ?>
			<div class="entry-meta">
				<?php _s_posted_on(); ?>
			</div><!-- .entry-meta -->
			<?php
			endif; ?>
		</header><!-- .entry-header -->
	</span>
<?php

echo '<span class="centered-section">';
echo '<div class="entry-content">';

the_content( sprintf(
	wp_kses(
		/* translators: %s: Name of current post. Only visible to screen readers */
		__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', '_s' ),
		array(
			'span' => array(
				'class' => array(),
			),
		)
	),
	get_the_title()
) );

echo '</div>';
echo '</span>';

wp_link_pages( array(
	'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
	'after'  => '</div>',
) );

echo '</div>'; // .entry-content
echo '</article>'; // '#post-' . the_ID();
