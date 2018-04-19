<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?>
</div><?php // #content ?>
</div> <?php // .site-content ?>

<?php
// echo $the_ID();
$this_page_id = get_the_id();

?>
<div class="centered-section">
  <div id="site-footer" class="footer">
  </div>
<?php
echo '</div>'; // .centered-section
echo '</div>'; // .site
echo '</div>'; // .whole-layout

get_template_part( 'template-parts/react', 'diagnostic' );
wp_footer();

echo get_template_part( 'template-parts/react', 'varsJSON' );

$main_js = get_webkit_asset('js', 'main');
if($main_js != '') {
  echo '<script type="text/javascript" src="' . $main_js . '"></script>';
}

if ($this_page_id == 7) {
  get_template_part( 'template-parts/google', 'maps' );
}



echo  '</body>';
echo '</html>';
