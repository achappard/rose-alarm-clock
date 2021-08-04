<template>
  <div id="burger-menu">
    <input type="checkbox" @click="handleClick" :checked="isMenuOpen"  />
    <span class="first"></span>
    <span class="middle"></span>
    <span class="last"></span>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_IS_MENU_OPEN, TOGGLE_IS_OPEN} from "../store/mutation-types";
export default {
  name: "BurgerIcon",
  methods:{
    ...mapActions([`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]),
    handleClick(){
      this[`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]()
    }
  },
  computed:{
    ...mapGetters({
        isMenuOpen:`${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`
    })
  }
}
</script>

<style lang="scss" scoped>
#burger-menu{
  position: absolute;
  width: $width-close-menu;
  height: $width-close-menu;
  overflow: hidden;
  top: 0;
  right: 0;
  user-select: none;
  cursor: pointer;
  padding-top: 12px;
  input{
    display: block;
    width: $width-close-menu;
    height: $width-close-menu;
    position: absolute;
    top:0px;
    left: 0px;
    cursor: pointer;
    border-radius: 0;
    border: none;

    opacity: 0; /* hide this */
    z-index: 2;
    -webkit-touch-callout: none;
    &:checked ~ span{
      opacity: 1;
      transform: rotate(45deg) translate(2px, 0px);

      &.middle{
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      &.last{
        transform: rotate(-45deg) translate(0, 2px);
      }
    }
  }
  span{
    display: block;
    width: 15px;
    height: 2px;
    margin-bottom: 2px;
    margin-left: 10.5px;// ($width-close-menu - 14px) / 2;
    position: relative;
    background: $white;
    border-radius: 3px;
    z-index: 1;
    transform-origin: 4px 0;
    transition: transform .4s cubic-bezier(0.77,0.2,0.05,1.0) .1s,
    background .4s cubic-bezier(0.77,0.2,0.05,1.0) .1s,
    opacity .45s ease .1s;

    &.top{
      transform-origin: 0 100%;
    }
    &.last{
      transform-origin: 0 0;
    }
  }
}
</style>
