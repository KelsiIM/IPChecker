<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
require('functions.inc.php');

$output = array(
	"error" => false,
  	"items" => "",
	"total_ips" => 0
);

// check if items param exists in the request and isnt empty
if(!isset($_REQUEST['items']) || empty(trim($_REQUEST['items']))) {
	// if 'items' is missing or empty, send an error message
	$output = array(
		"error" => "IP Address Missing"
	);
} else {
	$items = $_REQUEST["items"];

	$total_ips = getTotalIPs($items);

	$output['items'] = $items;
	$output['total_ips'] = $total_ips;
}
echo json_encode($output);
exit();
