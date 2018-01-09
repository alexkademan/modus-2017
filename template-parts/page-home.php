<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
$this_ID = get_the_ID();
// $this_post = get_post($this_ID);
// $this_post->meta = get_post_meta($this_ID);
?>

<div class="welcome-2">
  <article id="post-<?php post_class() ?>">
    <span class="centered-section">
      <header class="entry-header">
        <?php the_title( '<h1 class="entry-title">', '</h1>' ) ?>
      </header>
      <div class="entry-content">
        <?php echo the_content() ?>
      </div>
    </span>
  </article>
</div>
