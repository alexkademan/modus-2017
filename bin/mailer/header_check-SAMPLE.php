<?php
if ($_SERVER['HTTP_HOST'] == 'domain1') {
  header('Access-Control-Allow-Origin: http://domain1.com', false);
} elseif ($_SERVER['HTTP_HOST'] == 'domain2') {
  header('Access-Control-Allow-Origin: http://domain2.com', false);
};
