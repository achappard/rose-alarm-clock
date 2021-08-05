import {
    GET_IS_BED_TIME,
    GET_IS_DAY_TIME, GET_TIME_CLOCK,
    SET_IS_BED_TIME, SET_IS_DAY_TIME, SET_TIME_CLOCK,
} from "../mutation-types";

export const periodClockStore = {
    namespaced: true,
    state: {
        isBedTime: null,
        timeClock:null,
    },
    mutations: {
        [SET_IS_BED_TIME]: (state, isBedTime) => {
            state.isBedTime = isBedTime
        },
        [SET_IS_DAY_TIME]: (state, isDayTime) => {
            state.isBedTime = !isDayTime
        },
        [SET_TIME_CLOCK]: (state, timeClock) => {
            state.timeClock = timeClock
        },
    },
    actions: {
        [SET_IS_BED_TIME]: (state, payload) => state.commit(SET_IS_BED_TIME, payload),
        [SET_IS_DAY_TIME]: (state, payload) => state.commit(SET_IS_DAY_TIME, payload),
        [SET_TIME_CLOCK]: (state, payload) => state.commit(SET_TIME_CLOCK, payload),
    },
    getters: {
        [GET_IS_BED_TIME]: state => state.isBedTime,
        [GET_IS_DAY_TIME]: state => {
            if(state.isBedTime === null){
                return null
            }
            return !state.isBedTime
        },
        [GET_TIME_CLOCK]: state => state.timeClock
    }
}
