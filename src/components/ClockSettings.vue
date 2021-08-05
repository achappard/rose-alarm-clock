<template>
  <aside id="clock-settings"
         ref="menu"
         @click.self="handleClickBg"
         :class="{bedTime: isBedTime, dayTime: isDayTime}"
         :style="defaultStyle">
    <BurgerIcon/>
    <ConnectionStatusPill/>
    <div id="settings-content" @click="handleClickBg">
      <h1>Réglages du réveil</h1>
      <form  @submit.prevent>
        <div class="mb-5">
          <HorairesFields label="Horaire en semaine" name="week_input"/>
        </div>
        <div class="mb-5">
          <HorairesFields label="Horaire le week-end" name="weekend_input"/>
        </div>
        <div class="mb-5">
          <IpField :ip="defaultIp" :port="defaultPort"/>
        </div>
        <ButtonOrange>Enregistrer</ButtonOrange>
      </form>
    </div>
  </aside>
</template>

<script>
import BurgerIcon from "../components/BurgerIcon";
import ConnectionStatusPill from "../components/ConnectionStatusPill";
import IpField from "../components/form/IpField";
import HorairesFields from "../components/form/HorairesFields";
import ButtonOrange from "../components/form/ButtonOrange";
import {mapActions, mapGetters} from "vuex"
import {IP_CLOCK_MODULE, PERIOD_CLOCK_MODULE, SETTINGS_CLOCK_MODULE} from "../store/namespaces";
import {
  GET_IP_CLOCK,
  GET_IS_BED_TIME,
  GET_IS_DAY_TIME,
  GET_IS_MENU_OPEN, GET_PORT_CLOCK,
  TOGGLE_IS_OPEN
} from "../store/mutation-types";
import {closeMenu, openMenu} from "../animations/clockSettingMenu";

export default {
  name: "ClockSettings",
  components: {
    BurgerIcon,
    ConnectionStatusPill,
    IpField,
    HorairesFields,
    ButtonOrange,
  },
  data() {
    return {
      defaultStyle: {}
    }
  },
  created() {
    // console.log("listen esc keyboard ");
    window.document.addEventListener('keydown', this.keypressHandler)
  },
  unmounted() {
    // console.log("unmounted");
    window.document.removeEventListener('keydown', this.keypressHandler)
  },
  computed: {
    ...mapGetters({
      isMenuOpen: `${SETTINGS_CLOCK_MODULE}${GET_IS_MENU_OPEN}`,
      isBedTime: `${PERIOD_CLOCK_MODULE}${GET_IS_BED_TIME}`,
      isDayTime: `${PERIOD_CLOCK_MODULE}${GET_IS_DAY_TIME}`,
      defaultIp: `${IP_CLOCK_MODULE}${GET_IP_CLOCK}`,
      defaultPort: `${IP_CLOCK_MODULE}${GET_PORT_CLOCK}`,
    })
  },
  methods: {
    ...mapActions([`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]),
    handleClickBg() {
      if (!this.isMenuOpen) {
        this[`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]()
      }
    },
    keypressHandler(event) {
      if (this.isMenuOpen && event.code === "Escape") {
        this[`${SETTINGS_CLOCK_MODULE}${TOGGLE_IS_OPEN}`]()
      }
    }
  },
  watch: {
    isMenuOpen(newValue) {
      if (newValue) {
        openMenu(this.$refs.menu)
      } else {
        closeMenu(this.$refs.menu)
      }
    }
  },
  mounted() {
    this.defaultStyle = this.isMenuOpen ? {transform: 'translate(-35px, 0px)'} : {}
  },
}
</script>

<style lang="scss" scoped>


aside#clock-settings {
  background: rgba($black, .8);
  position: absolute;
  width: $width-app;
  height: $height-app;
  inset: 0;
  transform: translateX(-1 * $width-app + $width-close-menu);
  transition: background-color 1s ease-out .5s;
  z-index: 40;

  &.dayTime {
    background-color: rgba($black, .93);
  }

  &.bedTime {
    background-color: rgba($black, .83);
  }

  #settings-content {
    margin-left: $width-close-menu;
    h1 {
      font-weight: 300;
      font-size: 2.875rem;
      user-select: none;
      padding: 60px 0 30px 0;
      text-align: center;
    }
    form{
      margin: 0px auto;
      width: 300px;
      button{
        display: block;
        margin: 0px auto;
      }
    }
    
  }
}


</style>
