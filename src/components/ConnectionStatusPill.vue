<template>
  <div id="pills" :class="{connected:ws_connection_status === 'OPEN', connecting:ws_connection_status === 'CONNECTING'}"></div>
</template>

<script>
import {mapGetters} from "vuex";
import {SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_WEB_SOCKETS_CONNECTION_STATUS} from "../store/mutation-types";

export default {
  name: "ConnectionStatusPill",
  computed: {
    ...mapGetters({
          ws_connection_status:`${SETTINGS_CLOCK_MODULE}${GET_WEB_SOCKETS_CONNECTION_STATUS}`
        }
    ),
  },
}
</script>

<style lang="scss" scoped>
#pills{
  position: absolute;
  width: 10px;
  height: 10px;
  background: gray;
  bottom: 10px;
  right: 12px;
  user-select: none;
  border-radius: 50%;
  transition: background-color 0.3s ease-out;
  &.connected {
    background: green;
  }
  &.connecting{
    background: orange;
  }
}  

</style>
