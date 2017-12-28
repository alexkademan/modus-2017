<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
$this_ID = get_the_ID();
$this_post = get_post($this_ID);
$this_post->meta = get_post_meta($this_ID);
// $this_post->featrued_img = get

$thumb_ID = get_post_thumbnail_id($this_ID);
if (isset($thumb_ID)) {
  $this_post->featured_img = wp_get_attachment_image_src($thumb_ID, 'original');
}

echo '<article id="post-' . $this_ID . '" ';
post_class();
echo '>';

echo '<span class="centered-section">';
echo '<header class="entry-header">';

the_title( '<h1 class="entry-title">', '</h1>' );

echo '</header>'; // .entry-header
echo '</span>';



echo '<span class="centered-section">';
echo '<div class="entry-content">';

if (isset($this_post->featured_img)) {
  echo '<img src="' . $this_post->featured_img[0] . '" alt="' .
      $this_post->post_title . '" />';
}

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
echo '</article>'; // '#post-'the_ID();


$all_pets = get_posts(
  array(
    'posts_per_page' => -1,
    'post_type' => 'pets',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  )
);
if(isset($all_pets)) {
	$prev_next = find_previous_and_next_posts($all_pets, $this_post->ID);
}

if (isset($prev_next) && $prev_next !== '') {

	echo '<nav class="navigation post-navigation" role="navigation">';
	echo	'<h2 class="screen-reader-text">Post navigation</h2>';

	echo 	'<a href="' . get_permalink($prev_next['prev']->ID) . '" class="prev" rel="prev">';
	echo   '&larr; ' . $prev_next['prev']->post_title;
	echo  '</a>';

	echo 	'<a href="' . get_permalink($prev_next['next']->ID) . '" class="next" rel="next">';
	echo 	 $prev_next['next']->post_title . ' &rarr;';
	echo 	'</a>';
	echo '</nav>';
}
