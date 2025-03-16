function countryIP(items){

    const ips = items.split(",");
    const countryips = {};

    ips.forEach(ip => {
        
        const trimmedIP = ip.trim();

        // skip empty ip addresses
        if (!trimmedIP) {
            return; // continue iteration to next ip address
        }

        if(validateIPv4(trimmedIP)) {
            const firstThreeDigits = trimmedIP.split('.')[0];

            let country;

            switch(firstThreeDigits) {
                case '100':
                    country = 'US';
                    break;
                case '101':
                    country = 'UK';
                    break;
                case '102':
                    country = 'China'
                    break;
                default:
                    country = 'Unknown';
                    break;
            }

            countryips[trimmedIP] = country;
        } else {
            // mark as invalid if not a valid ipv4 address
            countryips[trimmedIP] = 'Invalid IPv4 address';
        }
    });

    return countryips;
}


function validateIPv4(ip) {
    const groups = ip.split(".");
    return groups.length === 4;
}

// need to export the function so index can import it correctly
module.exports = { countryIP };