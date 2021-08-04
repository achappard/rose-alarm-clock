<template>
  <DynamicBackground>
    <h1>Réveil de Rose</h1>
    <aside id="clock-settings">
      <BurgerIcon/>
    </aside>
    <ul class="list-unstyled">
      <li>Ip Clock = {{ ipClock }}</li>
    </ul>
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
import BurgerIcon from "../components/BurgerIcon";

export default {
  name: "Home",
  components: {
    DynamicBackground,
    BurgerIcon,
  },
  methods: {
    ...mapActions([
      `${PERIOD_CLOCK_MODULE}${SET_IS_BED_TIME}`,
      `${PERIOD_CLOCK_MODULE}${SET_IS_DAY_TIME}`,
    ]),
  },
  computed: {
    ...mapGetters({
          ipClock: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`,
          isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
        }
    ),
  },
}
</script>
