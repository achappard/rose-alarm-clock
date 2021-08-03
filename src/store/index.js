import { createStore } from 'vuex'
import {ipClockStore} from './modules/ipClock'
const store = createStore({
  modules: {
    ipClockStore
  }
})

export default store
