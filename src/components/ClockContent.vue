<template>
  <div id="clock-content" 
       ref="content"
       :style="defaultStyle">
    <slot/>
  </div>
</template>

<script>
import {SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_MENU_OPEN} from "../store/mutation-types";
import {mapGetters} from "vuex";
import {slideToLeft, slideToRight} from "../animations/slideMainContent";

export default {
  name: "ClockContent",
  data(){
    return {
      defaultStyle: {}
    }
  },
  mounted() {
    this.defaultStyle = this.isMenuOpen ? {transform: 'translate(512px, 0px)'} : {}
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...mapGetters({
      isMenuOpen: `${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`,
    })
  },
  watch: {
    isMenuOpen(newValue) {
      
      if (newValue) {
        slideToRight(this.$refs.content);
      } else {
        slideToLeft(this.$refs.content);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#clock-content {
  position: relative;
  z-index: 5;
  text-align: center;
  width: $width-app - $width-close-menu;
  margin-left: $width-close-menu;
}

</style>
