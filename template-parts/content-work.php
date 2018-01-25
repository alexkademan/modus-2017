<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

// $query = new WP_Query(array(
//   'post_type' => 'work',
//   'post_status' => 'publish',
//   'posts_per_page' => -1,
// ));
//
//
// while ($query->have_posts()) {
//   $query->the_post();
//   $post_id = get_the_ID();
//   print_r($query->posts);
//   echo $post_id;
//   echo "<br>";
// }
//
// wp_reset_query();


$this_ID = get_the_ID();
$this_post = get_post($this_ID);
$this_post->meta = get_post_meta($this_ID);

// print_r($this_post);

if (isset($this_post->meta['hero_image'])) {
  $hero_ID = $this_post->meta['hero_image'][0];
  $this_post->hero_image = wp_get_attachment_image_src($hero_ID, 'full');
}

if(
  isset($this_post->meta['portfolio_a'][0]) OR
  isset($this_post->meta['portfolio_b'][0]) OR
  isset($this_post->meta['portfolio_c'][0])
) {
  $this_post->images = [];
}

if (isset($this_post->meta['portfolio_a'][0])) {
  array_push($this_post->images, get_post($this_post->meta['portfolio_a'][0]));
}
if (isset($this_post->meta['portfolio_b'][0])) {
  array_push($this_post->images, get_post($this_post->meta['portfolio_b'][0]));
}
if (isset($this_post->meta['portfolio_c'][0])) {
  array_push($this_post->images, get_post($this_post->meta['portfolio_c'][0]));
}

$all_work = get_posts(
  array(
    'posts_per_page' => -1,
    'post_type' => 'work',
    'orderby' => 'menu_order',
    'order' => 'ASC',
  )
);
if(isset($all_work)) {
	$prev_next = find_previous_and_next_posts($all_work, $this_post->ID);
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


if (isset($this_post->images)) {
  // print_r($this_post->images);
  ?>

  <div id="portfolio-images" class="portfolio-images">
    <?php
      foreach ($this_post->images as $key => $image) {
        print_r($image->guid);
        echo '<img src="' . $image->guid . '" />';
      };
    ?>
  </div>

  <?php
}

// if (isset($this_post->hero_image)) {
//   echo '<img src="' . $this_post->hero_image[0] . '" alt="' . $this_post->post_title . '" />';
// }

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

// show_hidden_span_with_print_r($prev_next['prev']);
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
