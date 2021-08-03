import {GET_IP_CLOCK, SET_IP_CLOCK_FROM_LOCAL_STORAGE, SET_IP_CLOCK_FROM_USER_INPUT} from "../mutation-types";
export const ipClockStore = {
    namespaced: true,
    state: {
        ipClock: false
    },
    //pour les methodes synchrones
    mutations: {
        /**
         * Store the ip retrieved from the localStorage
         * @param state
         * @param newIp
         */
        [SET_IP_CLOCK_FROM_LOCAL_STORAGE]: (state, newIp) => state.ipClock = newIp,

        /**
         * Store the ip retrieved from the user input inside the store itself and in localstorage
         * @param state
         * @param newIp
         */
        [SET_IP_CLOCK_FROM_USER_INPUT]: (state, newIp) => {
            state.ipClock = newIp
            localStorage.setItem('clock_ip', newIp)
        }
    },
    //pour les methodes assynchrones
    actions: {
        /**
         * Commit the ip value from the localStorage if exist.
         * If not commit false value
         * @param state
         */
        [SET_IP_CLOCK_FROM_LOCAL_STORAGE]: state => state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, localStorage.getItem('clock_ip') || false),

        /**
         * Commit the ip value from the user input in Settings Page
         * @param state
         * @param payload
         */
        [SET_IP_CLOCK_FROM_USER_INPUT]: (state, payload) => state.commit(SET_IP_CLOCK_FROM_USER_INPUT, payload),

    },
    getters: {
        [GET_IP_CLOCK]: state => state.ipClock
    }
}
