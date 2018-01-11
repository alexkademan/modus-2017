<?php
/**
 * Company address using custom posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package Modus 2017
 */

$company_name = func_get_single_custom_post('company_info', 'name');
$company_address = func_get_single_custom_post('company_info', 'address');
$company_phone = func_get_single_custom_post('company_info', 'phone-number');

if(is_object($company_name) or
		is_object($company_address) or
		is_object($company_phone)) {
	echo '<div class="address">';

	if(is_object($company_name) && $company_name->post_content !== '') {
		echo '<p>' . $company_name->post_content . '</p>';
	}
	if(is_object($company_address) && $company_address->post_content !== '') {
		if($company_address->optional_url !== '') {
			echo '<a href="' . strip_tags($company_address->optional_url) . '" target="_blank">';
			echo $company_address->post_content;
			echo '</a>';
		} else {
			echo $company_address->post_content;
		}
	}
	if(is_object($company_phone) && $company_phone->post_content !== '') {
		if($company_phone->optional_url !== '') {
			echo '<a href="' . $company_phone->optional_url . '">';
			echo $company_phone->post_content;
			echo '</a>';
		} else {
			echo $company_phone->post_content . '<br />';
		}
	}

	echo '</div>'; // .address
}
