const { classifyIP } = require('./function');

// test for valid ipv4 addresses
test('valid IPv4 address', () => {
    const result = classifyIP('192.168.0.1, 10.0.0.1, 172.16.0.1, 127.0.0.1');
    expect(result).toEqual({
        '192.168.0.1' : 'IPv4',
        '10.0.0.1' : 'IPv4',
        '172.16.0.1' : 'IPv4',
        '127.0.0.1' : 'IPv4'
    });
  });

// test for valid ipv6 addresses
test('valid IPv6 address', () => {
    const result = classifyIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334,fe80::1ff:fe23:4567:890a');
    expect(result).toEqual({
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334' : 'IPv6',
        'fe80::1ff:fe23:4567:890a' : 'IPv6'
    });
});

// test for invalid ipv4 addresses - less or more than 4 segments
test('invalid IPv4 address', () => {
    const result = classifyIP('192.168, 10.0.0.1.5, 300.300.300');
    expect(result).toEqual({
        '192.168' : 'Invalid', // less than 4
        '10.0.0.1.5' : 'Invalid', // more than 4
        '300.300.300' : 'Invalid' // less than 4
    });
});

// test for invalid ipv6 addresses - less than 2 segments or more than 8
test('invalid IPv6 address', () => {
    const result = classifyIP('2001, 56FE::2159:5BBC::6594:0:0:0:0');
    expect(result).toEqual({
        '2001' : 'Invalid', // less than 2
        '56FE::2159:5BBC::6594:0:0:0:0' : 'Invalid' // more than 8
    });
});

// test empty ip addresses
test('empty ip address', () => {
    const result = classifyIP('');
    expect(result).toEqual({});
});

