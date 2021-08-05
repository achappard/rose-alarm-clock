/* ---------------------------------------------- */
/* -- 1.0 - Methods and mutations --------------- */
/* ---------------------------------------------- */

// ipClock Store
export const SET_IP_CLOCK_FROM_LOCAL_STORAGE = "SET_IP_CLOCK_FROM_LOCAL_STORAGE";
export const SET_IP_CLOCK_FROM_USER_INPUT = "SET_IP_CLOCK_FROM_USER_INPUT";
export const SET_PORT_CLOCK_FROM_LOCAL_STORAGE = "SET_PORT_CLOCK_FROM_LOCAL_STORAGE";

// PeriodClock Store
export const SET_IS_BED_TIME = "SET_IS_BED_TIME";
export const SET_IS_DAY_TIME = "SET_IS_DAY_TIME";
export const SET_TIME_CLOCK = "SET_TIME_CLOCK";

// SettingsClock Store
export const TOGGLE_IS_OPEN = "TOGGLE_IS_OPEN";
export const SET_WEB_SOCKETS_CONNECTION = "SET_WEB_SOCKETS_CONNECTION";
export const SET_WEB_SOCKETS_CONNECTION_STATUS = "SET_WEB_SOCKETS_CONNECTION_STATUS";
export const SET_WEEK_SETTINGS = "SET_WEEK_SETTINGS";
export const SET_WEEK_END_SETTINGS = "SET_WEEK_END_SETTINGS";

/* ---------------------------------------------- */
/* -- 2.0 - Getters ----------------------------- */
/* ---------------------------------------------- */

// ipClock Store
export const GET_IP_CLOCK = "GET_IP_CLOCK";
export const GET_PORT_CLOCK = "GET_PORT_CLOCK";
export const GET_COMPLETE_IP = "GET_COMPLETE_IP";

// PeriodClock Store
export const GET_IS_BED_TIME = "GET_IS_BED_TIME";
export const GET_IS_DAY_TIME = "GET_IS_DAY_TIME";
export const GET_TIME_CLOCK = "SET_TIME_CLOCK";

// SettingsClock Store
export const GET_IS_MENU_OPEN = "GET_IS_MENU_OPEN"; 
export const GET_WEB_SOCKETS_CONNECTION = "GET_WEB_SOCKETS_CONNECTION"; 
export const GET_WEB_SOCKETS_CONNECTION_STATUS = "GET_WEB_SOCKETS_CONNECTION_STATUS"; 
export const GET_WEEK_END_SETTINGS = "GET_WEEK_END_SETTINGS"; 
export const GET_WEEK_SETTINGS = "GET_WEEK_SETTINGS"; 
