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
  text-align: center;
  background: $background-settings;
  width: $width-app;
  height: $height-app;
  overflow: hidden;

  h1 {
    font-weight: 300;
    font-size: 3.875rem;
    user-select: none;
    padding: 60px 0 20px 0;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
}


</style>
