import { createStore } from 'vuex'

const store = createStore({
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
    setIpClockFromLocalStorage(state, newIp) {
      state.ipClock = newIp;
    },
    /**
     * Store the ip retrieved from the user input inside the store itself and in localstorage
     * @param state
     * @param newIp
     */
    setIpClockFromUserInput(state, newIp) {
      state.ipClock = newIp
      localStorage.setItem('clock_ip', newIp)
      console.log("Nouvelle ip sauvegardée !");
    }
  },
  //pour les methodes assynchrones
  actions: {
    /**
     * Commit the ip value from the localStorage if exist.
     * If not commit false value
     * @param state
     */
    setIpClockFromLocalStorage(state) {
      state.commit("setIpClockFromLocalStorage", localStorage.getItem('clock_ip') || false);
    },
    /**
     * Commit the ip value from the user input in Settings Page
     * @param state
     * @param payload
     */
    setIpClockFromUserInput(state, payload){
      state.commit("setIpClockFromUserInput", payload);
    }
  },
  modules: {
  },
  getters: {
    getIpClock : (state) => state.ipClock

  }
})

export default store
