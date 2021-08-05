<template>
  <div class="horaire-field">
    <p class="legend">
      {{ label }}
    </p>
    <span class="legend">Levé à</span>
    <TimeField class="me-5"/>
    <span class="legend">Couché à</span>
    <TimeField/>
  </div>
</template>

<script>
import TimeField from "./TimeField";
export default {
  name: "HorairesFields",
  props: {
    label: {
      type: [String],
      default: '',
      required: false
    },
    name: {
      type: [String],
      required: true
    },
  },
  components:{
    TimeField
  },
  setup(props) {
    console.log(props)
  }
}
</script>

<style lang="scss" scoped>
.horaire-field{
  padding: 6px;
  user-select:none;
  p.legend, span.legend{
    font-size: .75rem;
    color: $white;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span.legend{text-transform: none}
}

</style>
