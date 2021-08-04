<template>
  <DynamicBackground>
    <h1>Réveil de Rose</h1>
    <ul class="list-unstyled">
      <li>Ip Clock = {{ ipClock }}</li>
    </ul>
  </DynamicBackground>
  <ClockSettings/>
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

<style lang="scss" scoped>
h1 {
  font-weight: 300;
  font-size: 3.875rem;
  user-select: none;
  padding: 60px 0 20px 0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
