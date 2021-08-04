<template>
  <DynamicBackground>
    <h1>Réveil de Rose</h1>
    <ClockSettings/>
    <ul class="list-unstyled">
      <li>Ip Clock = {{ ipClock }}</li>
    </ul>
  </DynamicBackground>
</template>
<script>
import {mapGetters} from "vuex"
import {GET_IP_CLOCK} from "../store/mutation-types";
import {IP_CLOCK_MODULE} from "../store/namespaces";
import DynamicBackground from "../components/DynamicBackground";
import ClockSettings from "../components/ClockSettings";

export default {
  name: "Home",
  components: {
    DynamicBackground,
    ClockSettings,
  },
  computed: {
    ...mapGetters({
          ipClock: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`,
        }
    ),
  },
}
</script>
