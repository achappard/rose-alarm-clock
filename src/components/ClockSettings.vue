<template>
  <aside id="clock-settings" ref="menu">
    <BurgerIcon/>
  </aside>
</template>

<script>
import BurgerIcon from "../components/BurgerIcon";
import {mapGetters} from "vuex"
import {SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_MENU_OPEN} from "../store/mutation-types";
import {closeMenu, openMenu} from "../animations/clockSettingMenu";

export default {
  name: "ClockSettings",
  computed: {
    ...mapGetters({
      isMenuOpen: `${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`
    })
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
}

</style>
