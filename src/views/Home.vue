<template>
  <DynamicBackground>
    <h1>Réveil de Rose</h1>
    <ul class="list-unstyled">
      <li>Ip Clock = {{ ipClock }}</li>
      <li>data.isBedTime : {{ isBedTime}}</li>
    </ul>
    <div class="btn-group mt-3" role="group" aria-label="Basic radio toggle button group">
      <input type="radio" class="btn-check" :value="false"  id="btnDay" @click="switchToDayPeriod(true)" v-model="isBedTime" autocomplete="off">
      <label class="btn btn-outline-dark" for="btnDay">Jour</label>

      <input type="radio" class="btn-check" :value="true"  id="btnNight" @click="switchToBedPeriod(true)"  v-model="isBedTime" autocomplete="off">
      <label class="btn btn-outline-dark" for="btnNight">Nuit</label>
    </div>
  </DynamicBackground>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
import {
  GET_IP_CLOCK,
  GET_IS_BED_TIME,
  SET_IS_BED_TIME,
  SET_IS_DAY_TIME
} from "../store/mutation-types";
import {IP_CLOCK_MODULE, PERIOD_CLOCK_MODULE} from "../store/namespaces";
import DynamicBackground from "../components/DynamicBackground";
export default {
  name: "Home",
  components:{
    DynamicBackground,
  },
  methods : {
    ...mapActions([
        `${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`,
        `${PERIOD_CLOCK_MODULE}${SET_IS_DAY_TIME}`,
    ]),
    switchToDayPeriod(b){
      this[`${PERIOD_CLOCK_MODULE}${SET_IS_DAY_TIME}`](b)
    },
    switchToBedPeriod(b){
      this[`${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`](b)
    }
  },
  computed:{
    ...mapGetters({
      ipClock: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`,
      isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
    }
    ),
  },
}
</script>
