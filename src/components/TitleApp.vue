<template>
  <transition appear @enter="enter_title" @leave="leave_title" :css="false">
    <h1 v-if="!interval">{{ defaultTitle }}</h1>
  </transition>
  
  <transition appear @enter="enter_time" @leave="leaveTime" :css="false">
    <h1 class="time" v-if="localeDate">{{localeDate.format('HH:mm')}}</h1>  
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import {PERIOD_CLOCK_MODULE, } from "../store/namespaces";
import { GET_TIME_CLOCK, } from "../store/mutation-types";
import moment from 'moment';
import gsap from 'gsap';
export default {
  name: "TitleApp",
  data(){
    return {
      defaultTitle:"Réveil de Rose",
      interval : null,
      localeDate: null,
    }
  },
  computed: {
    ...mapGetters({
          timeClock: `${PERIOD_CLOCK_MODULE}${GET_TIME_CLOCK}`,
        }
    ),
  },
  methods:{
    enter_time(el, done){
      gsap.from(el, {autoAlpha:0,delay:2.5,scale:1.06, ease:"power1.out", onComplete:() => {done()}})
    },
    leaveTime(el, done){
      gsap.to(el, {autoAlpha:0,scale:0.94, ease:"power1.out", onComplete:() => {done()}})
    },
    enter_title(el, done){
      gsap.from(el, {autoAlpha:0,delay:0.4,scale:1.06, ease:"power1.out", onComplete:() => {done()}})
    },
    leave_title(el, done){
      gsap.to(el, {autoAlpha:0,scale:0.94, delay:2, ease:"power1.out", onComplete:() => {done()}})
    },
  },
  watch: {
    timeClock(newValue) {
      // console.log("TimeClock à changé pour "+ newValue);
      if(this.interval){
        clearInterval(this.interval);
      }
      if(newValue){
        this.localeDate = moment(newValue, "hh:mm:ss");
        this.interval = setInterval(()=>{
          this.localeDate = this.localeDate.clone().add(1,'s');
        }, 1000);
      }else{
        this.localeDate = null
        this.interval = null
      }
      
    }
  },
  unmounted() {
    if(this.interval){
      clearInterval(this.interval);
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 300;
  font-size: 3.875rem;
  user-select: none;
  padding: 60px 0 20px 0;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  width: 100%;
  &.time{
    font-size: 6.75rem;
  }
}
</style>
