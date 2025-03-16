<?php
function isValidIPv4($ip) {
    // split the ip with full stops
    $groups = explode('.', $ip);

    // check if there are 4 groups
    if(count($groups) !== 4) {
        return false;
    }
    return true;
}

function getBadIPs($items)
{
    // defined list of bad IPs from project brief
    $badIPList = [
        '100.200.300.400',
        '101.201.301.401',
        '102.202.302.402',
        '103.203.303.403'
    ];

    // split the input of IPs by commas to get IPs individually
    $ips = explode(",", $items);
    $result = [];

    // loop through the IPs and check to see if it is a bad IP
    foreach($ips as $ip) {
        // trim any empty space from the IP
        $trimIP = trim($ip);

        // skip empty ips
        if($trimIP === "") {
            continue;
        }

        // validate ipv4 address first
        if(!isValidIPv4($trimIP)) {
            $result[$trimIP] = "Invalid IPv4 address";
        } else {
            // check if the IP is in the bad IP list and add whether it is good or bad
        $result[$trimIP] = in_array($trimIP, $badIPList) ? "Bad IP" : "Good IP";
        }
    }
    return $result; 
}
