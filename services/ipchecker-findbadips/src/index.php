<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
require('functions.inc.php');

$output = array(
	"error" => false,
    "items" => [],
	"bad_ips" => 0
);

if(!isset($_REQUEST['items']) || empty(trim($_REQUEST['items']))) {
	// if 'items' is missing, send an error message
	$output = array(
		"error" => "IP Address Missing"
	);
} else {
	$items = $_REQUEST["items"]; 

	// process the items and get bad ips
	$bad_ips = getBadIPs($items);

	$output['items'] = $items;
	$output['bad_ips'] = $bad_ips;
}
echo json_encode($output);
exit();
