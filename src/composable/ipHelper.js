/**
 * Convert the array of IP segments back to a string
 */
export function arrayToIp(ipArray){
    return ipArray.join(".")
}

/**
 * Convert the IP address string to an array of values
 */
export function ipToArray(ip){
    let segments = [];
    ip.split('.').map(segment => {
        if (isNaN(segment) || segment < 0 || segment > 255)
            segment = 255;
        segments.push(segment);
    });

    // If something is not valid clear it all
    if (segments.length !== 4) {
        throw 'Ip not valid';
    } 
    return segments
}

export function validateIp (ip){
    return  (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))
}

export default {arrayToIp, ipToArray}
