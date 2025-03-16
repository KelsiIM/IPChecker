<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

require('functions.inc.php');

$output = array(
	"error" => false,
  	"items" => "",
	"total_empty_ips" => 0
);

if(!isset($_REQUEST['items']) || empty(trim($_REQUEST['items']))) {
	// if items is missing or empty, send error message
	$output = array(
		"error" => "IP Address Missing"
	);
} else {
	$items = $_REQUEST["items"];

	// get total count of empty ips
	$total_empty_ips = getTotalEmptyIPs($items);

	// set items and total empty ips in the output
	$output['items'] = $items;
	$output['total_empty_ips'] = $total_empty_ips;
}
echo json_encode($output);
exit();
