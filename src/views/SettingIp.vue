<template>
  <p class="text-muted fs-7 no-select">Aucune adresse ip n’est configurée pour le réveil.</p>
  <IpField :ip="defaultIp" placeholder @changed="ipChanged" @keypress.enter="handleEnterPress"/>
  <div id="valid-ip-btn-wrapper">
    <ButtonOrange @click="handleSaveIp" v-show="ipIsValid">Enregister</ButtonOrange>
  </div>
</template>

<script>
import ButtonOrange from "../components/form/ButtonOrange";
import IpField from "../components/form/IpField";
import {mapActions, mapGetters} from 'vuex';
import {GET_IP_CLOCK, SET_IP_CLOCK_FROM_USER_INPUT} from "../store/mutation-types";

export default {
  name: 'App',
  components: {
    ButtonOrange,
    IpField
  },
  data(){
    return {
      ipIsValid: false,
      validIp:false
    }
  },
  computed:{
    ...mapGetters({defaultIp :GET_IP_CLOCK}),
  },
  methods: {
    ...mapActions([SET_IP_CLOCK_FROM_USER_INPUT]),
    /**
     * Ip from the field is valid, we store it locally and update ipIsValid bool
     * @param event
     */
    ipChanged(event)  {
      this.validIp = event.is_valid ? event.ip_formatted : false
      this.ipIsValid = event.is_valid;
    },
    /**
     * Handle click on the Save button
     */
    handleSaveIp(){
      // save new Ip in store
      this[SET_IP_CLOCK_FROM_USER_INPUT](this.validIp)
      // redirect
      this.$router.push({name:'Home'})
    },
    handleEnterPress(){
      if(this.ipIsValid && this.validIp){
        this.handleSaveIp();
      }
    }
    
  }
}
</script>
<style scoped>
#valid-ip-btn-wrapper {
  margin-top: 180px;
}
</style>
