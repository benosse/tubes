<template>
  <div id="app">
    <Scene3D :dimensions="scene3DData.dimensions"/>
  </div>
</template>

<script>

import Scene3D from "./components/Scene3D.vue"

export default {
  name: 'App',

  components: {
    Scene3D,
  },

  data() {
    return {
      scene3DData:{
        dimensions:{
          width:0,
          height:0,
        }    
      },
    }
    
  },

  mounted: function(){
    //add event listeners
    window.addEventListener('resize', this.onResize);
   

    this.scene3DData.dimensions.width = window.innerWidth /2;
    this.scene3DData.dimensions.height = window.innerHeight;
  },

  methods: {
    onResize(){
      this.scene3DData.dimensions.width = window.innerWidth /2;
      this.scene3DData.dimensions.height = window.innerHeight ;
    },
  }
}
</script>

<style>
#app {
  margin:0;
  padding:0;
}
</style>
