<template>
  <div id="dynamic-bg-wrapper">
    <div ref="nightBG" id="night-bg" class="dynamic-bg"></div>
    <div ref="dayBg" id="day-bg" class="dynamic-bg"></div>
    <div id="inner-content-bg">
      <slot/>
    </div>
  </div>
</template>

<script>
// import { gsap } from "gsap";
import { PERIOD_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_BED_TIME, GET_IS_DAY_TIME} from "../store/mutation-types";
import {mapGetters} from "vuex";
import {animations_init, animation_day, animation_night} from "../animations/background";

export default {
  name: "DynamicBackground",
  mounted() {
    animations_init(this.$refs.dayBg, this.$refs.nightBG)
  },
  watch: {
    isBedTime(newValue) {
      if(newValue){
        animation_night();
      }
      else {
        animation_day();
      }
    }
  },
  computed:{
    ...mapGetters({
      isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
      isDayTime:`${PERIOD_CLOCK_MODULE}${GET_IS_DAY_TIME}`,
    })
  }
}
</script>

<style lang="scss" scoped>
#dynamic-bg-wrapper {
  width: $width-app;
  height: $height-app;
  position: relative;

  .dynamic-bg {
    position: absolute;
    z-index: 1;
    width: $width-app;
    height: $height-app;
    opacity: 0;
    visibility: hidden;
  }
  #day-bg{background: $background-day}
  #night-bg{background: $background-night}
}

#inner-content-bg {
  position: relative;
  z-index: 5;
}
</style>
