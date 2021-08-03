<template>
  <div>
    Ip Clock = {{ ipClock }}
  </div>
</template>
<script>
import {mapGetters} from "vuex"
import {GET_IP_CLOCK} from "../store/mutation-types";
import {IP_CLOCK_MODULE} from "../store/namespaces";

export default {
  name: "Home",
  computed:{
    ...mapGetters({ipClock: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`})
  },
}
</script>
