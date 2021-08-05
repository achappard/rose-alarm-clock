<template>
  <svg height="240" width="240">
    <line class="loader-pointer" x1="120" y1="120" x2="120" y2="97"/>
    <line class="loader-line" x1="120" y1="120" x2="135" y2="120"/>
    <circle class="loader-circle" cx="120" cy="120" r="30"/>
    <circle class="loader-center" cx="120" cy="120" r="5"/>
  </svg>
</template>

<script>
export default {
  name: "ClockLoaderAnimation"
}
</script>

<style lang="scss" scoped>
svg {
  animation: upDown 1s ease-in-out infinite;
}

.loader-circle, .loader-pointer, .loader-line {
  fill: none;
  stroke-width: 3px;
  stroke: $white;
}

.loader-center {
  fill: $white;
}

.loader-pointer {
  transform-origin: bottom center;
  animation: spin 4s linear infinite;
}

.loader-line {
  transform-origin: bottom center;
  animation: spin 60s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
    transform-origin: 50% 50%;
  }
  to {
    transform: rotate(360deg);
    transform-origin: 50% 50%;
  }
}


</style>
