<template>
    <p class="text-muted fs-7 no-select">Aucune adresse ip n’est configurée pour le réveil.</p>
  <IpField placeholder @changed="ipChanged"/>
  <div id="valid-ip-btn-wrapper">
    <ButtonOrange>Enregister</ButtonOrange>
  </div>
</template>

<script>
import ButtonOrange from "../components/form/ButtonOrange";
import IpField from "../components/form/IpField";
import {ref} from "vue";

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
