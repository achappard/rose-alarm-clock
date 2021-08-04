import {GET_IS_MENU_OPEN, TOGGLE_IS_OPEN} from "../mutation-types";

export const settingsClockStore = {
    namespaced: true,
    state: {
        isMenuOpen: false,
        weekSettings: {
            wakeUpTime: '',
            badTime: ''
        },
        weekEndSettings: {
            wakeUpTime: '',
            badTime: ''
        }
    },
    mutations: {
        [TOGGLE_IS_OPEN]: state => state.isMenuOpen = !state.isMenuOpen
        ,
    },
    actions: {
        [TOGGLE_IS_OPEN]: state => state.commit(TOGGLE_IS_OPEN),
    },
    getters: {
        [GET_IS_MENU_OPEN]: state => state.isMenuOpen
    }
}
