<template>
  <ClockSettings/>
  <WebSocketClockClient ref="ws_clock"/>
  <DynamicBackground>
    <TitleApp ref="title"/>
    <transition appear :css="false" @enter="enterLoader" @leave="leaveLoader">
      <div id="loader" v-if="ws_is_connecting === 'CONNECTING'">
        <ClockLoaderAnimation/>
        <p class="fs-7">Connexion au réveil en cours...</p>
      </div>
    </transition>
    <transition appear :css="false" @enter="enterConnectionClosed" @leave="leaveConnectionClosed">
      <div id="connection-closed" v-if="ws_is_connecting === 'CLOSED'">
        <p>
          <strong>
            Impossible de se connecter au Réveil de Rose.
          </strong>
          <br>
          <span class="fs-7">
            Vérifier l'adresse ip et assurez-vous
            que le réveil est branché.
          </span>
        </p>
        <ButtonOrange @click="retry_connection" class="mt-5">Réessayer</ButtonOrange>
      </div>
    </transition>
  </DynamicBackground>
</template>
<script>
import DynamicBackground from "../components/DynamicBackground";
import ClockSettings from "../components/ClockSettings";
import ClockLoaderAnimation from "../components/ClockLoaderAnimation";
import TitleApp from "../components/TitleApp";
import WebSocketClockClient from "../components/renderless/WebSocketClockConnection";
import {mapGetters} from "vuex";
import {SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {GET_WEB_SOCKETS_CONNECTION_STATUS} from "../store/mutation-types";
import gsap from 'gsap';
import ButtonOrange from "../components/form/ButtonOrange";

export default {
  name: "Home",
  components: {
    ButtonOrange,
    DynamicBackground,
    ClockSettings,
    ClockLoaderAnimation,
    TitleApp,
    WebSocketClockClient,
  },
  methods: {
    enterLoader(el, done) {
      gsap.from(el, {autoAlpha: 0, y: '+10px', delay: 0.5, ease: "power1.out", onComplete: () => done()})
    },
    leaveLoader(el, done) {
      gsap.to(el, {autoAlpha: 0, ease: "power1.out", onComplete: () => done()})
    },
    enterConnectionClosed(el, done){
      const text = el.querySelector("p"); 
      const button = el.querySelector("button"); 
      const  tl = gsap.timeline({delay:0.4,defaults:{duration:0.5}, onComplete : () => done()});
      tl.from(text, {autoAlpha:0, y:'+10px', ease:"power1.out"})
      .from(button, {autoAlpha:0, y:'+10px', ease:"power1.out"}, '-=.2')
    },
    leaveConnectionClosed(el, done){
      const text = el.querySelector("p");
      const button = el.querySelector("button");
      const  tl = gsap.timeline({delay:0,defaults:{duration:0.5}, onComplete : () => done()});
      tl.to(button, {autoAlpha:0, y:'+10px', ease:"power1.out"})
          .to(text, {autoAlpha:0, y:'+10px', ease:"power1.out"}, '-=.2')
    },
    retry_connection(){
      this.$refs.ws_clock.launch_connection()
    }
  },
  computed: {
    ...mapGetters({
      ws_is_connecting: `${SETTINGS_CLOCK_MODULE}${GET_WEB_SOCKETS_CONNECTION_STATUS}`
    })
  }
}
</script>

<style lang="scss" scoped>
#loader {
  // position: absolute;
  position: relative;
  padding-top: 170px;
  p{
    position: relative;
    top: -75px;
  }
}

#connection-closed {
  position: absolute;
  top: 240px;
  width: 90%;
  margin-left: 5%;
}

</style>
