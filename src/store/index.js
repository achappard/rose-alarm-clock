import { createStore } from 'vuex'
import {ipClockStore as IP_CLOCK_MODULE} from './modules/ipClock'
const store = createStore({
  modules: {
    IP_CLOCK_MODULE
  }
})

export default store
