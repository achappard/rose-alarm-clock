/**
 * Get the Clock Ip saved in localStorage
 * If no value exist, return false
 * @returns {string|boolean}
 */
export const get_ip_saved = () => (localStorage.getItem('clock_ip') || false);

