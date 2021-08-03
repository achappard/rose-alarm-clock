<template>
  <div>
    Ip Clock = {{ ipClock}}
  </div>
</template>
<script>
export default {
  name: "Home",
  data(){
    return {
      ipClock: '192.168.0.2'
    }
  },
}
</script>
