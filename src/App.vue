<template>
  <div>
    <TemperatureTracking/>
  </div>
</template>

<script>

import TemperatureTracking from "@/components/TemperatureTracking.vue";

export default {
  name: 'App',
  components: {
    TemperatureTracking
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
 background: hsl(210deg, 30%, 8%);
}
* {
  margin: 0;
}
input, button {
  font: inherit;
}
p, h1, h2, h3 {
  overflow-wrap: break-word;
  hyphens: auto;
}
div{
  box-sizing: border-box;
}
*, *::before, *::after {
  box-sizing: border-box;
}
.flex{
  display: flex;
  gap: 20px;
  align-items: center;
  position: relative;
}
.error{
  color: red;
  font-size: 10px;
}

</style>
