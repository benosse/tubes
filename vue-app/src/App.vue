<template>
  <div id="app">
    <Scene3D/>
  </div>
</template>

<script>

import Scene3D from "./components/Scene3D.vue"

export default {
  name: 'App',
  components: {
    Scene3D,
  }
}
</script>

<style>
#app {
  margin:0;
  padding:0;
}
</style>
