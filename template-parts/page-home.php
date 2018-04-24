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
  <article id="home-icons" class="centered-section centered-single-column">
    <ul class="iconlist">
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/cart.svg" alt="">
        <h1>cart</h1>
      </li>
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/hands.svg" alt="">
        <h1>hands</h1>
      </li>
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/heart.svg" alt="">
        <h1>heart</h1>
      </li>
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/network.svg" alt="">
        <h1>network</h1>
      </li>
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/sphere.svg" alt="">
        <h1>sphere</h1>
      </li>
      <li>
        <img src="<?php bloginfo('stylesheet_directory') ?>/images/icons/thumbprint.svg" alt="">
        <h1>thumbprint</h1>
      </li>
    </ul>
  </article>
</div>
