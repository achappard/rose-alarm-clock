<template>
  <div class="time-field">
    <input type="number" maxlength="2" min="0" max="23">:<input type="number" maxlength="2" min="0" max="59">
  </div>
</template>

<script>
export default {
  name: "TimeField"
}
</script>

<style lang="scss" scoped>
.time-field{
  position: relative;
  display: inline-block;
  text-align: left;
  border-bottom: 1px solid $white;
  padding: 6px;
  user-select:none;
  input{
    text-align: center;
    background: transparent;
    font-size: inherit;
    color: #e0e0e0;
    width: 22px;
    border: none;
    outline: none;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
      -webkit-appearance: none
    }
  }
}
</style>
