<template>
  <div id="dynamic-bg-wrapper" @click="handleClickBackground">
    <div ref="nightBG" id="night-bg" class="dynamic-bg"></div>
    <div ref="dayBg" id="day-bg" class="dynamic-bg"></div>
    <ClockContent>
      <slot/>
    </ClockContent>
  </div>
</template>

<script>

import {PERIOD_CLOCK_MODULE, SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_BED_TIME, GET_IS_DAY_TIME, GET_IS_MENU_OPEN, TOGGLE_IS_OPEN} from "../store/mutation-types";
import {mapGetters, mapActions} from "vuex";
import {animations_init, animation_day, animation_night} from "../animations/background";
import ClockContent from "./ClockContent";
export default {
  name: "DynamicBackground",
  mounted() {
    animations_init(this.$refs.dayBg, this.$refs.nightBG)
  },
  components :{
    ClockContent
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
  methods:{
    ...mapActions([`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]),
    handleClickBackground(){
      if(this.isMenuOpen){
        this[`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]()
      }
    }
  },
  computed:{
    ...mapGetters({
      isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
      isDayTime:`${PERIOD_CLOCK_MODULE}${GET_IS_DAY_TIME}`,
      isMenuOpen:`${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`
    })
  }
}
</script>

<style lang="scss" scoped>
#dynamic-bg-wrapper {
  width: $width-app;
  height: $height-app;
  position: relative;
  z-index: 2;
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
</style>
