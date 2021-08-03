<template>
  <h1>Réveil de Rose</h1>

<!--    <router-link :to="{name:'Home'}">Home</router-link>
    <router-link :to="{name:'IpSettings'}">Ip Setting</router-link>-->
    <router-view/>

</template>

<script>
import {mapActions} from 'vuex';
import {SET_IP_CLOCK_FROM_LOCAL_STORAGE} from "./store/mutation-types";
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
  width: 512px;
  height: 577px;

  h1 {
    font-weight: 300;
    font-size: 3.875rem;
    user-select: none;
    margin: 60px 0 20px 0;
  }
}


</style>
