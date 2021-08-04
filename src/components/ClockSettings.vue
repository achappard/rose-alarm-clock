<template>
  <aside id="clock-settings" @click.self="handleClickBg" :class="{bedTime: isBedTime, dayTime: isDayTime}" ref="menu">
    <BurgerIcon/>
  </aside>
</template>

<script>
import BurgerIcon from "../components/BurgerIcon";
import {mapActions, mapGetters} from "vuex"
import {PERIOD_CLOCK_MODULE, SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_BED_TIME, GET_IS_DAY_TIME, GET_IS_MENU_OPEN, TOGGLE_IS_OPEN} from "../store/mutation-types";
import {closeMenu, openMenu} from "../animations/clockSettingMenu";

export default {
  name: "ClockSettings",
  computed: {
    ...mapGetters({
      isMenuOpen: `${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`,
      isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
      isDayTime:`${PERIOD_CLOCK_MODULE}${GET_IS_DAY_TIME}`,
    })
  },
  methods :{
    ...mapActions([`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]),
    handleClickBg(){
      console.log("click bg menu");
      if(!this.isMenuOpen){
        this[`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]()
      }  
    }
  },
  watch: {
    isMenuOpen(newValue) {
      if (newValue) {
        openMenu(this.$refs.menu)
      } else {
        closeMenu(this.$refs.menu)
      }
    }
  },
  components: {
    BurgerIcon
  }
}
</script>

<style lang="scss" scoped>


aside#clock-settings {
  background: rgba($black, .8);
  position: absolute;
  width: $width-app;
  height: $height-app;
  inset: 0;
  transform: translateX(-1 * $width-app + $width-close-menu);
  transition: background-color 1s ease-out .5s;

  &.dayTime {
    background-color: rgba($black, .93);
  }

  &.bedTime {
    background-color: rgba($black, .87);
  }
}


</style>
