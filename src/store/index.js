import { createStore } from 'vuex'
import {ipClockStore as IP_CLOCK_MODULE} from './modules/ipClock'
import {periodClockStore as PERIOD_CLOCK_MODULE} from "./modules/periodClock";

const store = createStore({
  modules: {
    IP_CLOCK_MODULE,
    PERIOD_CLOCK_MODULE
  }
})

export default store
