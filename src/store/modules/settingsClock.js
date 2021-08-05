import {
    GET_IS_MENU_OPEN,
    GET_WEB_SOCKETS_CONNECTION, GET_WEB_SOCKETS_CONNECTION_STATUS, GET_WEEK_END_SETTINGS, GET_WEEK_SETTINGS,
    SET_WEB_SOCKETS_CONNECTION, SET_WEB_SOCKETS_CONNECTION_STATUS, SET_WEEK_END_SETTINGS, SET_WEEK_SETTINGS,
    TOGGLE_IS_OPEN
} from "../mutation-types";

export const settingsClockStore = {
    namespaced: true,
    state: {
        isMenuOpen: true,
        ws_connection: false,
        ws_connection_status: 'CLOSED',
        weekSettings: {
            wakeUpTime: null,
            bedTime: null
        },
        weekEndSettings: {
            wakeUpTime: null,
            bedTime: null
        }
    },
    mutations: {
        [TOGGLE_IS_OPEN]: state => state.isMenuOpen = !state.isMenuOpen,
        [SET_WEB_SOCKETS_CONNECTION]: (state, connection) => state.ws_connection = connection,
        [SET_WEB_SOCKETS_CONNECTION_STATUS]: (state, connection_status) => state.ws_connection_status = connection_status,

        [SET_WEEK_SETTINGS]: (state, settings) => state.weekSettings = settings,
        [SET_WEEK_END_SETTINGS]: (state, settings) =>  state.weekEndSettings = settings
    },
    actions: {
        [TOGGLE_IS_OPEN]: state => state.commit(TOGGLE_IS_OPEN),
        [SET_WEB_SOCKETS_CONNECTION]: (state, payload) => state.commit(SET_WEB_SOCKETS_CONNECTION, payload),
        [SET_WEB_SOCKETS_CONNECTION_STATUS]: (state, payload) => state.commit(SET_WEB_SOCKETS_CONNECTION_STATUS, payload),
        
        [SET_WEEK_SETTINGS]: (state, payload) => state.commit(SET_WEEK_SETTINGS, payload),
        [SET_WEEK_END_SETTINGS]: (state, payload) => state.commit(SET_WEEK_END_SETTINGS, payload)
    },
    getters: {
        [GET_IS_MENU_OPEN]: state => state.isMenuOpen,
        [GET_WEB_SOCKETS_CONNECTION]: state => state.ws_connection,
        [GET_WEB_SOCKETS_CONNECTION_STATUS]: state => state.ws_connection_status,
        [GET_WEEK_SETTINGS]: state => state.weekSettings,
        [GET_WEEK_END_SETTINGS]: state => state.weekEndSettings,
    }
}
