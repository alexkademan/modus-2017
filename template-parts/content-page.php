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

	$user = wp_get_current_user();

	if (current_user_can('administrator')) {
		$user = wp_get_current_user();
		if($user->user_email == 'alex@designbymodus.com') {

		};
	}

	the_content();
	// if (get_the_ID() == 2) {
	// 	for ($i = 1; $i <= 10; $i++) {
	//     echo '<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>';
	// 	}
	// };
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
