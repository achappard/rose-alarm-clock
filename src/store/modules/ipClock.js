import {
    GET_COMPLETE_IP,
    GET_IP_CLOCK,
    GET_PORT_CLOCK,
    SET_IP_CLOCK_FROM_LOCAL_STORAGE,
    SET_IP_CLOCK_FROM_USER_INPUT,
    SET_PORT_CLOCK_FROM_LOCAL_STORAGE
} from "../mutation-types";
import {validateIp} from "../../composable/ipHelper";

const IP_CLOCK_LOCAL_STORAGE_KEY = 'clock_ip';

export const ipClockStore = {
    namespaced: true,
    state: {
        ipClock: false,
        portClock:false
    },
    //pour les methodes synchrones
    mutations: {
        /**
         * Store the ip retrieved from the localStorage
         * @param state
         * @param newIp
         */
        [SET_IP_CLOCK_FROM_LOCAL_STORAGE]: (state, newIp) => state.ipClock = newIp,

        
        [SET_PORT_CLOCK_FROM_LOCAL_STORAGE]: (state, newPort) => state.portClock = newPort,
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
            
            if(ipFromLocalStorage){
                let portPos = ipFromLocalStorage.indexOf(':');
                if(portPos !== -1){
                    let ipAndPort = ipFromLocalStorage.split(":");
                    let ip_part = ipAndPort[0];
                    let port_part = ipAndPort[1];
                    if(validateIp(ip_part)){
                        state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, ip_part)
                        state.commit(SET_PORT_CLOCK_FROM_LOCAL_STORAGE, port_part)
                    }else{
                        state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, false)
                    }
                }else{
                    if(validateIp(ipFromLocalStorage)){
                        state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, ipFromLocalStorage)
                    }else{
                        state.commit(SET_IP_CLOCK_FROM_LOCAL_STORAGE, false)
                    }
                }
            }else{
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
        [GET_IP_CLOCK]: state => {
            if(state.portClock){
                return `${state.ipClock}`
            }
            return state.ipClock
        },
        [GET_PORT_CLOCK]: state => state.portClock,
        [GET_COMPLETE_IP] : state => {
            if(state.portClock !== false && state.ipClock !== false){
                return `${state.ipClock}:${state.portClock}`
            }else if(state.ipClock !== false){
                return state.ipClock
            }
            return false;
        }
    }
}
