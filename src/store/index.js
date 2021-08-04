import { createStore } from 'vuex'
import {ipClockStore as IP_CLOCK_MODULE} from './modules/ipClock'
import {periodClockStore as PERIOD_CLOCK_MODULE} from "./modules/periodClock";
import {settingsClockStore as SETTINGS_CLOCK_MODULE} from "./modules/settingsClock";

const store = createStore({
  modules: {
    IP_CLOCK_MODULE,
    PERIOD_CLOCK_MODULE,
    SETTINGS_CLOCK_MODULE,
  }
})

export default store
