<template>
 <h1>Ip Field</h1>
  <br>
  <IpField placeholder/>
</template>

<script>
import IpField from "./components/form/IpField";
export default {
  name: 'App',
  components :{
    IpField
  },
  setup(){
    const ipmodified = (event) => {
      console.log("ip reçue : " + event.ip + ", port:" + event.port + "  =>  " + (event.is_valid ? "Cette ip est valide" : "Cette Ip n'est pas valide") );
      console.log("ip formated = "+event.ip_formatted);
    }
    return {ipmodified}
  },
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  margin-top: 60px;
}

</style>
