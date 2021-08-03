<template>
  <div>
    Ip Clock = {{ ipClock }}
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {GET_IP_CLOCK} from "../store/mutation-types";

export default {
  name: "Home",
  computed:{
    ...mapGetters({ipClock: GET_IP_CLOCK})
  },
}
</script>
