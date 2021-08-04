import {GET_IP_CLOCK, SET_IP_CLOCK_FROM_LOCAL_STORAGE, SET_IP_CLOCK_FROM_USER_INPUT} from "../mutation-types";
import {validateIp} from "../../composable/ipHelper";

const IP_CLOCK_LOCAL_STORAGE_KEY = 'clock_ip';

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
            localStorage.setItem(IP_CLOCK_LOCAL_STORAGE_KEY, newIp)
        }
    },
    //pour les methodes assynchrones
    actions: {
        /**
         * Commit the ip value from the localStorage if exist AND is valid
         * If not commit false value
         * @param state
         */
        [SET_IP_CLOCK_FROM_LOCAL_STORAGE]: state => {
            const ipFromLocalStorage = (localStorage.getItem(IP_CLOCK_LOCAL_STORAGE_KEY))
            if (ipFromLocalStorage && validateIp(ipFromLocalStorage)) {
                state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, ipFromLocalStorage)
            } else {
                state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, false)
            }
        },

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
