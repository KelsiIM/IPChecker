<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ ."/functions.inc.php";

class TotalIPsTest extends TestCase {

    // to test for total of valid ipv4 addresses
    public function testValidIPv4() {
        $items = '111.111.1.1, 222.222.2.2, 333.333.3.3';
        $expected = 3;
        $result = getTotalIPs($items);
        $this->assertEquals($expected, $result);
    }

    // to test for total of valid ipv6 addresses
    public function testValidIPv6() {
        $items = '1111:1111:1111:1111:1111:1111, 2222:2222:2222:2222:2222::2222';
        $expected = 2;
        $result = getTotalIPs($items);
        $this->assertEquals($expected, $result);
    }

    // to test for total of both valid ipv4 and ipv6 addreses
    public function testMixedIPInput() {
        $items = '111.111.1.1, 1111:1111:1111:1111:1111:1111, 222.222.2.2, 2222:2222:2222:2222:2222::2222';
        $expected = 4;
        $result = getTotalIPs($items);
        $this->assertEquals($expected, $result);
    }

    // to test for total of invalid inputs (for now will count as 'valid' and increase the total)
    public function testInvalidIPInput() {
        $items = '111.111.1.1.1, 123456, , 1111::1111::1111::1111:::';
        $expected = 4;
        $result = getTotalIPs($items);
        $this->assertEquals($expected, $result);
    }
}