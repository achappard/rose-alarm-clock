<template>
  <div>
    Ip Clock = {{ ipClock }}
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  name: "Home",
  computed:{
    ...mapGetters({ipClock: 'getIpClock'})
  },
}
</script>
