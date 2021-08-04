<template>
  <aside id="clock-settings"
         ref="menu" 
         @click.self="handleClickBg" 
         :class="{bedTime: isBedTime, dayTime: isDayTime}" 
         :style="defaultStyle">
    <BurgerIcon/>
    <div id="settings-content">
      <h1>Réglages du réveil</h1>
    </div>
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
  data(){
    return {
      defaultStyle: {}
    }
  },
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
  mounted() {
    this.defaultStyle = this.isMenuOpen ? {transform: 'translate(-35px, 0px)'} : {}
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
  z-index: 40;

  &.dayTime {
    background-color: rgba($black, .93);
  }

  &.bedTime {
    background-color: rgba($black, .87);
  }
  #settings-content{
    margin-left: $width-close-menu;
    h1 {
      font-weight: 300;
      font-size: 2.875rem;
      user-select: none;
      padding: 60px 0 20px 0;
      text-align: center;
    }
  }
}


</style>
