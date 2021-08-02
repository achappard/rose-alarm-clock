<template>
  <div class="vue-ip" :class="{valid, 'show-port' : portCopy !== null, active}">
    <span class="label">Adresse IP</span>
    <span class="segment" v-for="(segment, index) in ipCopy" :key="index">
      <input
          :placeholder="placeholderPos(index)"
          type="number" maxlength="3"
          v-model="ipCopy[index]"
          @blur="ipBlur($event, index)"
          @focus="ipFocus(index)"
          @keydown="ipKeyDown($event, index)"
          @paste="paste($event)"
          min="0"
          max="255"

          :ref="el => { if (el) ipSegmentFields[index] = el }"/>
    </span>
    <input type="number"
           v-show="portCopy !== null"
           class="port"
           @blur="portBlur"
           @focus="portFocus"
           @keydown="portKeydown"
           @paste="paste($event)"
           min="0"
           max="65535"
           v-model="portCopy"
           :placeholder="placeholder ? '8080': ''"
           ref="portSegementField"
    />

  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {arrayToIp, ipToArray, validateIp} from './../../composable/ipHelper'

export default {
  name: "IpField",
  emits: ["changed"],
  props: {
    placeholder: {
      type: Boolean,
      default: false,
      required: false
    },
    ip: {
      type: String,
      default: '',
      required: false
    },
    port: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  setup(props, {emit}) {
    const ipSegmentFields = ref([])
    const portSegmentField = ref(null)
    const ipCopy = ref(['','', '',''])
    const portCopy = ref(null)
    const valid = ref(false);
    const active = ref(false);

    onMounted(() => copyValue(props.ip, props.port))

    // Watch prop ip change
    watch(() => props.ip, () => {
      copyValue(props.ip, props.port)
    });

    // Watch prop port change
    watch(() => props.port, () => {
      copyValue(props.ip, props.port)
    });

    // Watch ipCopy array
    watch(() => [...ipCopy.value], (currentValue) => {
      // Update if its valid locally
      valid.value = validateIp(arrayToIp(currentValue))
    });

    /**
     * Copy prop into local copy
     */
    const copyValue = (ip, port) => {
      if (ip) {
        try {
          ipCopy.value = ipToArray(ip);
        } catch (e) {
          clearAll()
        }
      }
      if( port ){
        if( isNaN(parseInt(port) )){
          portCopy.value = ''
        }else{
          portCopy.value = port
        }
      }
      

      // Update if its valid locally
      valid.value = validateIp(arrayToIp(ipCopy.value))

      // report change event
      changed()
    }

    /**
     * Trigger a 'changed' event
     */
    const changed = (ip = ipCopy.value, port = portCopy.value) => {
      let ipLocal = arrayToIp(ip)
      let ip_formatted = port ? (ipLocal + ":" + port) : ipLocal
      emit('changed', {ip: ipLocal, port, ip_formatted, is_valid: validateIp(ipLocal)})
    }


    /**
     * Keydown on a ip segment field
     */
    const ipKeyDown = (event, index) => {
      let keyCode = event.keyCode || event.which;
      // Return or left on keypad
      if (keyCode === 8 || keyCode === 37) {
        // If there is nothing within the selected input go the the one before it
        if (ipCopy.value[index].length === 0 && ipCopy.value[index - 1] !== undefined)
          ipSegmentFields.value[index - 1].focus();
      }
      // Semi-colon (jump to port number)
      else if (keyCode === 186) {
        portSegmentField.value.focus();
      }

      setTimeout(() => {
        if (parseInt(ipCopy.value[index]) === 0) {
          moveToNextIpSegment(index, false)
        } else {
          moveToNextIpSegment(index)
        }

        changed();
      })
    }

    /**
     * Keydown on the port segment field
     */
    const portKeydown = (event) => {
      let keyCode = event.keyCode || event.which;
      // Return or left on keypad
      if (keyCode === 8 || keyCode === 37) {
        // If there is nothing within the selected input go back to the last IP segment
        if (!portCopy.value || portCopy.value.length === 0) {
          ipSegmentFields.value[3].focus();
        }

      }
      setTimeout(changed);
    }

    /**
     * Need to move to the next field ?
     */
    const moveToNextIpSegment = (index, ifOverThree = true) => {
      if (ifOverThree) {
        if (ipCopy.value[index].toString().length >= 3 && ipCopy.value[index + 1] !== undefined) {
          ipSegmentFields.value[index + 1].focus();
        } else if (ipCopy.value[index].toString().length >= 3 && ipCopy.value[index + 1] === undefined) {
          portSegmentField.value.focus();
        }

      } else {
        if (ipCopy.value[index + 1] !== undefined) {
          ipSegmentFields.value[index + 1].focus();
        } else if (ipCopy.value[index + 1] === undefined) {
          portSegmentField.value.focus();
        }

      }
    }

    /**
     * Blur on a input
     */
    const portBlur = () => {
      active.value = false;
      let value_port_field = portCopy.value;
      if(value_port_field > 65535){
        portCopy.value = 65535
      }
      if(value_port_field < 0){
        portCopy.value = 0
      }
    }

    /**
     * Blur on a input
     */
    const ipBlur = (event, index) => {
      active.value = false;
      let value_ip_field = ipCopy.value[index];
      if(value_ip_field > 255){
        ipCopy.value[index] = 255
      }
      if(value_ip_field < 0){
        ipCopy.value[index] = 0
      }
    }

    /**
     * Reset all internal data
     */
    const clearAll = () => {
      ipCopy.value = ['', '', '', '']
      valid.value = false
    }

    /**
     * Focus on a input ip segment field
     */
    const ipFocus = (index) => {
      active.value = true;
      ipCopy.value[index] = ''
      changed()
    }

    /**
     * Focus on port field
     */
    const portFocus = () => {
      active.value = true;
      portCopy.value = ''
      changed()
    }

    /**
     * Get the placeholder part
     * @param segment
     * @returns {string|*}
     */
    const placeholderPos = (segment) => {
      // No placeholder provided, return empty string
      if (!props.placeholder) {
        return '';
      }
      // Dummy IP placeholder
      switch (segment) {
        case 0:
          return '192';
        case 1:
          return '168';
        case 2:
          return '0';
        case 3:
          return '1';
      }

    }

    /**
     * Paste ip
     * @param event
     */
    const paste = (event) => {
      // Focus on first el
      ipSegmentFields.value[0].focus();

      // Get clipboard text
      let pasteText = event.clipboardData.getData('text/plain');

      // Check if we have a port or not
      let portPos = pasteText.indexOf(':');

      // If we have ports turned off, remove the port and only update the IP value
      if (!props.port && portPos !== -1) {
        console.warn("A IP address with a port has been entered but this module has no port attribute. Please enable it update the port.");
        clearAll();
        let ipAndPort = pasteText.split(":");
        copyValue(ipAndPort[0], null);
        // Blur off input
        ipSegmentFields.value[0].blur();
        return;
      }
      // Based on if we have a port or not
      switch (portPos) {
        case -1:
          copyValue(pasteText, null);
          changed();
          // Blur off input
          ipSegmentFields.value[0].blur();
          break;
        default: {
          let ipAndPort = pasteText.split(":");
          copyValue(ipAndPort[0], ipAndPort[1]);
          changed();
          // Blur off input
          ipSegmentFields.value[0].blur();
          break
        }
      }

    }

    return {
      ipSegmentFields,
      portSegementField: portSegmentField,
      ipCopy,
      portCopy,
      valid,
      active,
      placeholderPos,
      ipFocus,
      portFocus,
      ipKeyDown,
      portKeydown,
      ipBlur,
      portBlur,
      paste,
    }
  }
}
</script>

<style lang="scss">
div.vue-ip {
  position: relative;
  display: inline-block;
  text-align: left;
  border-bottom: 1px solid $white;
  padding: 6px;
  user-select:none;
  .label {
    display: block;
    position: relative;
    width: 100%;
    font-size: .75rem;
    color: $white;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .segment {
    display: inline-block;

    &:after {
      color: white;
    }

    &:not(:last-of-type) {
      &:after {
        content: '.';
        display: inline-block;
      }
    }
  }

  input {
    text-align: center;
    background: transparent;
    font-size: inherit;
    color: #e0e0e0;
    width: 40px;
    border: none;
    outline: none;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
      -webkit-appearance: none
    }

    &::placeholder {
      color: $white-muted
    }

    &.port {
      width: 60px;
    }

  }

  &.show-port {
    .segment {
      &:last-of-type {
        &:after {
          content: ':'
        }
      }
    }
  }

  &.active {
    border-bottom-color: $invalid-input-ip-color;

    .label {
      color: $invalid-input-ip-color;
    }

    .segment {
      &:after {
        color: $invalid-input-ip-color;
      }
    }

    &.valid {
      border-bottom-color: $valid-input-ip-color;

      .label {
        color: $valid-input-ip-color;
      }

      .segment {
        &:after {
          color: $valid-input-ip-color;
        }
      }
    }
  }
}

</style>
