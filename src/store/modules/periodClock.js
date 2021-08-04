import {
    GET_IS_BED_TIME,
    GET_IS_DAY_TIME,
    SET_IS_BED_TIME,
    SET_IS_DAY_TIME
} from "../mutation-types";

export const periodClockStore = {
    namespaced: true,
    state: {
        isBedTime: null,
    },
    mutations: {
        [SET_IS_BED_TIME]: (state, isBedTime) => {
            state.isBedTime = isBedTime
        },
        [SET_IS_DAY_TIME]: (state, isDayTime) => {
            state.isBedTime = !isDayTime
        }
    },
    actions: {
        [SET_IS_BED_TIME]: (state, payload) => state.commit(SET_IS_BED_TIME, payload),
        [SET_IS_DAY_TIME]: (state, payload) => state.commit(SET_IS_DAY_TIME, payload),
    },
    getters: {
        [GET_IS_BED_TIME]: state => state.isBedTime,
        [GET_IS_DAY_TIME]: state => {
            if(state.isBedTime === null){
                return null
            }
            return !state.isBedTime
        }
    }
}
