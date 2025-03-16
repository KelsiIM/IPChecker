"""Test for function.py"""

import unittest
from function import get_ip_validation

class TestFunction(unittest.TestCase):

    # to test for valid ipv4 addresses
    def test_valid_ipv4_address(self):
        items = "192.168.0.1, 10.0.0.1, 172.16.0.1, 127.0.0.1"
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {
            "192.168.0.1" : "Valid",
            "10.0.0.1" : "Valid",
            "172.16.0.1" : "Valid",
            "127.0.0.1" : "Valid"
        }
        self.assertEqual(total_valid_ips, 4)
        self.assertEqual(result, expected_result)

    # to test for invalid ipv4 addresses
    def test_invalid_ipv4_address(self):
        items = "192.168.0, 192.168.1.1.1, 192.168.01.1.1, 192.168.0.0.24"
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {
            "192.168.0" : "Invalid",
            "192.168.1.1.1" : "Invalid",
            "192.168.01.1.1" : "Invalid",
            "192.168.0.0.24" : "Invalid"
        }
        self.assertEqual(total_valid_ips, 0)
        self.assertEqual(result, expected_result)

    # to test for valid ipv6 addresses
    def test_valid_ipv6_address(self):
        items = "2001:0db8:85a3:0000:0000:8a2e:0370:7334,fe80::1ff:fe23:4567:890a"
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {
            "2001:0db8:85a3:0000:0000:8a2e:0370:7334" : "Valid",
            "fe80::1ff:fe23:4567:890a" : "Valid"
        }
        self.assertEqual(total_valid_ips, 2)
        self.assertEqual(result, expected_result)

    # to test for invalid ipv6 addresses
    def test_invalid_ipv6_address(self):
        items = "2001:, 56FE:2:2159:5BBC:5F:6594:5637:9087:123"
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {
            "2001:" : "Invalid",
            "56FE:2:2159:5BBC:5F:6594:5637:9087:123" : "Invalid"
        }
        self.assertEqual(total_valid_ips, 0)
        self.assertEqual(result, expected_result)

    # test for empty inputs
    def test_empty_space(self):
        items = ""
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {

        }
        self.assertEqual(total_valid_ips, 0)
        self.assertEqual(result, expected_result)
    
    # test for input of only spaces
    def test_only_spaces(self):
        items = "    "
        total_valid_ips, result = get_ip_validation(items)
        expected_result = {

        }
        self.assertEqual(total_valid_ips, 0)
        self.assertEqual(result, expected_result)

if __name__ == '__main__':
    unittest.main()