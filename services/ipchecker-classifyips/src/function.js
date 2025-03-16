function classifyIP(items) {
    const ips = items.split(",");
    const classifications = {};

    ips.forEach(ip => {
        
        const trimmedIP = ip.trim();

        // skip empty ip addresses
        if (!trimmedIP) {
            return; // continue iteration to next ip address
        }

        if (validateIPv4(trimmedIP)) {
            classifications[trimmedIP] = "IPv4";
        } else if (validateIPv6(trimmedIP)) {
            classifications[trimmedIP] = "IPv6";
        } else {
            classifications[trimmedIP] = "Invalid";
        }
    });
    return classifications;
}

// for checking if there are 4 groups of values seperated by dots
function validateIPv4(ip) {
    const groups = ip.split(".");
    return groups.length === 4;
};

// for checking if there are 2-8(inclusive) groups of values seperated :
function validateIPv6(ip) {
    const groups = ip.split(":");

    if (groups.length < 2 || groups.length > 8) {
        return false;
    }

    // check for any empty groups/segments - invalid if more than one, unless its a valid '::'
    let emptyGroups = groups.filter(group => group === "").length;

    // '::' is valid only once in an ipv6 address
    if (emptyGroups > 1) {
        return false;
    }
    return true;
};

// need to export the function so index can import it correctly
module.exports = { classifyIP };