<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ ."/functions.inc.php";

class TotalEmptyIPsTest extends TestCase {

    // test a mix of valid and empty
    public function testValidIPsAndEmptyInput() {
        $items = '111.111.1.1, , , 222.222.2.2';
        $expected = 2;
        $result = getTotalEmptyIPs($items);
        $this->assertEquals($expected, $result);
    }

    // test all empty input (commas)
    public function testAllEmptyInput() {
        $items = ', , , , ,';
        $expected = 6;
        $result = getTotalEmptyIPs($items);
        $this->assertEquals($expected, $result);
    }

    // test all valid input
    public function testNoEmptyInput() {
        $items = '111.111.1.1, 222.222.2.2, 333.333.3.3';
        $expected = 0;
        $result = getTotalEmptyIPs($items);
        $this->assertEquals($expected, $result);
    }
}