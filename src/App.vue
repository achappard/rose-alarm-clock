<template>
  <h1>Réveil de Rose</h1>

<!--    <router-link :to="{name:'Home'}">Home</router-link>
    <router-link :to="{name:'IpSettings'}">Ip Setting</router-link>-->
    <router-view/>

</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'App',
  methods: {
    ...mapActions(['setIpClockFromLocalStorage'])
  },
  mounted() {
   //App mounted : retrieving ip saved in local Storage
    this.setIpClockFromLocalStorage()
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
