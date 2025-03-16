<?php
function getTotalEmptyIPs($items)
{
  $ips = explode(",", $items);
  $total_empty_ips = 0;

  foreach($ips as $ip) {
    $trimmed_ip = trim($ip);
    if($trimmed_ip === "") {
      $total_empty_ips++;
    }
  }
  return $total_empty_ips;
}
