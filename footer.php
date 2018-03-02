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
</div> <?php // .site ?>

<div id="site-footer" class="footer">
  <div class="centered-section">
    <div id="gooey-ui" class="gooey-ui"></div>
    <footer id="colophon" class="site-footer">

      <div class="right-col">
        <?php
          get_template_part( 'template-parts/info', 'address' );
        ?>
      </div>
      <div class="copyright">
        <p><?php
echo '&copy; ' . date("Y");
$company_name = func_get_single_custom_post('company_info', 'name');
if(is_object($company_name) && $company_name->post_content !== '') {
echo ' ' . $company_name->post_content;
}
?></p>
      </div>
    </footer>
  </div> <?php // #centered-section ?>
</div>




</div> <?php // .whole-layout ?>

<?php
get_template_part( 'template-parts/react', 'diagnostic' );
wp_footer();

echo get_template_part( 'template-parts/react', 'varsJSON' );

$main_js = get_webkit_asset('js', 'main');
if($main_js != '') {
  echo '<script type="text/javascript" src="' . $main_js . '"></script>';
}

echo  '</body>';
echo '</html>';
