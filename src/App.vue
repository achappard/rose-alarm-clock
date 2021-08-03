<template>
  <h1>Réveil de Rose</h1>
  <div id="nav">
    <router-link :to="{name:'Home'}">Home</router-link>
    <router-link :to="{name:'IpSettings'}">Ip Setting</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
#app {
  text-align: center;
  background: #335958;
  background: $background-settings;
  transition: background 1s ease;
  width: 512px;
  height: 577px;

  h1 {
    font-weight: 300;
    font-size: 3.875rem;
    user-select: none;
    margin: 60px 0 20px 0;
  }
}

#valid-ip-btn-wrapper {
  margin-top: 180px;
}
</style>
