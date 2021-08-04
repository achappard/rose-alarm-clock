<template>
  <router-view/>
</template>

<script>
import {mapActions} from 'vuex';
import { SET_IP_CLOCK_FROM_LOCAL_STORAGE} from "./store/mutation-types";
import {IP_CLOCK_MODULE} from "./store/namespaces";

export default {
  name: 'App',
  methods: {
    // ...mapActions([SET_IP_CLOCK_FROM_LOCAL_STORAGE])
    ...mapActions([`${IP_CLOCK_MODULE}${SET_IP_CLOCK_FROM_LOCAL_STORAGE}`])
  },
  mounted() {
    //App mounted : retrieving ip saved in local Storage
    this[`${IP_CLOCK_MODULE}${SET_IP_CLOCK_FROM_LOCAL_STORAGE}`]()
  }
}
</script>

<style lang="scss">
#app {
  background: $background-settings;
  width: $width-app;
  height: $height-app;
  overflow: hidden;
  position: relative;
}
</style>
