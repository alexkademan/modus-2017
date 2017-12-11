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

echo '</div>'; // #content
echo '<div id="gooey-ui" class="gooey-ui"></div>';
echo '<div class="centered-section">';
echo '<footer id="colophon" class="site-footer">';

echo	 '<div class="copyright">';

echo '&copy; ' . date("Y");
$company_name = func_get_single_custom_post('company_info', 'name');
if(is_object($company_name) && $company_name->post_content !== '') {
  echo ' ' . $company_name->post_content;
}
echo	 '</div>';

echo	 '<div class="company-info">';
get_template_part( 'template-parts/info', 'address' );
echo	 '</div>';

echo  '</footer>'; // #colophon
echo '</div>'; // #centered-section
echo '</div>'; // #page
echo '</div>'; // #whole-layout

get_template_part( 'template-parts/react', 'diagnostic' );
wp_footer();

echo get_template_part( 'template-parts/react', 'varsJSON' );

$main_js = get_webkit_asset('js', 'main');
if($main_js != '') {
  echo '<script type="text/javascript" src="' . $main_js . '"></script>';
}

echo  '</body>';
echo '</html>';
