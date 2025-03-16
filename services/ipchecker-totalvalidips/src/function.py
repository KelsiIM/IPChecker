def get_ip_validation(items):

     # check if items is a valid string
    if not isinstance(items, str):
        raise ValueError("IP addresses should be a comma-separated")
    
    ips = items.split(",")
    validation_results = {};
    total_valid_ips = 0;

    for ip in ips:
        ip = ip.strip() # remove empty spaces if required
        if not ip: # skips empty inputs
            continue
        if is_valid_ipv4(ip) or is_valid_ipv6(ip):
            validation_results[ip] = "Valid"
            total_valid_ips += 1
        else:
            validation_results[ip] = "Invalid"
    
    return total_valid_ips, validation_results
            
# to check if the ipv4 address is valid with 4 groups/segments
def is_valid_ipv4(ip):

    groups = ip.split('.')

    if len(groups) != 4:
        return False
    
    for group in groups:
        if not group:
            return False
        
    return True

# to check if the ipv6 address is valid with 2-8 groups/segments
def is_valid_ipv6(ip):

    groups = ip.split(':')

    if len(groups) < 2 or len(groups) > 8:
        return False
    
    # check for compression in ipv6
    if ip.count('::') > 1:
        return False
    
    for group in groups:
        if not group and ip.count('::') == 0:  # empty group without :: is invalid
            return False
        
    return True


