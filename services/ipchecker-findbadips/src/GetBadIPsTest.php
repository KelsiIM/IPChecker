<?php

use PHPUnit\Framework\TestCase;

// to make the functions available for the test file
require_once __DIR__ . '/functions.inc.php';

class GetBadIPsTest extends TestCase {

    // test for valid input of ipv4
    public function testValidInput() {
        $items = '100.200.300.400, 123.123.1.1, 101.201.301.401';
        $expected = [
            '100.200.300.400' => 'Bad IP',
            '123.123.1.1' => 'Good IP',
            '101.201.301.401' => 'Bad IP',
        ];

        $this->assertEquals($expected, getBadIPs($items));
    }

    // test for all of the assigned bap ips
    public function testAllBadIPs() {
        $items = '100.200.300.400, 101.201.301.401, 102.202.302.402, 103.203.303.403';
        $expected = [
            '100.200.300.400' => 'Bad IP',
            '101.201.301.401' => 'Bad IP',
            '102.202.302.402' => 'Bad IP',
            '103.203.303.403' => 'Bad IP',
        ];

        $this->assertEquals($expected, getBadIPs($items));
    }

    // test for good ipv4s
    public function testAllGoodIPs() {
        $items = '111.111.1.1, 222.222.2.2, 333.333.3.3';
        $expected = [
            '111.111.1.1' => 'Good IP',
            '222.222.2.2' => 'Good IP',
            '333.333.3.3' => 'Good IP',
        ];

        $this->assertEquals($expected, getBadIPs($items));
    }

    // test for invalid ipv4 input
    public function testInvalidInput() {
        $items = '123456, 123.1.1, 123.123.1.1.1';
        $expected = [
            '123456' => 'Invalid IPv4 address',
            '123.1.1' => 'Invalid IPv4 address',
            '123.123.1.1.1' => 'Invalid IPv4 address',
        ];
        $this->assertEquals($expected, getBadIPs($items));
    }
}