<template>
  <h1>Réveil de Rose</h1>
  <p class="text-muted fs-7 no-select">Aucune adresse ip n’est configurée pour le réveil.</p>
  <IpField placeholder @changed="ipChanged"/>
  <div id="valid-ip-btn-wrapper">
    <ButtonOrange>Enregister</ButtonOrange>
  </div>
</template>

<script>
import IpField from "./components/form/IpField";
import {ref} from "vue";
import ButtonOrange from "./components/form/ButtonOrange";

export default {
  name: 'App',
  components: {
    ButtonOrange,
    IpField
  },
  setup() {
    const ipIsValid = ref(false)
    const ipChanged = (event) => {
      ipIsValid.value = event.is_valid;
      // console.log("ip reçue : " + event.ip + ", port:" + event.port + "  =>  " + (event.is_valid ? "Cette ip est valide" : "Cette Ip n'est pas valide") );
      // console.log("ip formated = "+event.ip_formatted);
    }
    return {ipChanged, ipIsValid}
  },
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
