// test suite for country classifications for ipv4 addresses only
const { countryIP } = require('./function');

// test for ipv4 countries - valid
test('valid ipv4 countries', () => {
    const result = countryIP('100.168.0.1, 101.168.0.1, 102.168.0.1');
    expect(result).toEqual({
        '100.168.0.1' : 'US',
        '101.168.0.1' : 'UK',
        '102.168.0.1' : 'China'
    });
});

test('unknown ipv4 countries', () => {
    const result = countryIP('120.168.0.1, 192.168.0.1');
    expect(result).toEqual({
        '120.168.0.1' : 'Unknown',
        '192.168.0.1' : 'Unknown'
    });
});

test('invalid ipv4 address', () => {
    const result = countryIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334, fe80::1ff:fe23:4567:890a');
    expect(result).toEqual({
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334' : 'Invalid IPv4 address',
        'fe80::1ff:fe23:4567:890a' : 'Invalid IPv4 address'
    });
});

test('empty ip address', () => {
    const result = countryIP('');
    expect(result).toEqual({});
});