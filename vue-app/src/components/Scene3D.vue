<template>
  <div id="scene3D" ref="threeContainer" 
    :style="computedStyle"
    @mousedown="onMousePressed"
    @mouseup="onMouseReleased"
    @mousemove="onMouseMove"
  >
  </div>
</template>

<script>



//imports
import * as THREE from "three";
import Tube from "../js/Tube.js";
import PDHandler from "../js/PDHandler.js";


//divers (à mettre ailleurs sans doute)
const ROTATION_SPEED = 0.01;
const ANIM_FPS = 24;
const PD_FPS = 10;

function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}




export default {
  name: 'Scene3D',

  props: {
    dimensions:{},
  },

  data(){
    return {
      //three
      scene:null,
      camera:null,
      renderer:null,

      //tube
      tube:null,

      //pd
      pd:null,

      //interaction
      interaction: {
        trackPos:false,
        isMousePressed:false,
        mousePos:null,
        distance:null,
      }
    }
  },

  mounted:function(){
    this.initThree();
    this.initTube();
    this.initPD();
    this.updateScene();

    //start graphics animation
    setInterval(this.animate, 1000/ANIM_FPS)

    console.log("Scene3D mounted");
  },

  methods: {

    initPD() {
      this.pd = new PDHandler(this.startPD);
    },

    startPD() {
     
      this.pd.setNbLayers(this.tube.nbLayers);
      //amplitude tmp
      for (let i=0; i<this.tube.nbLayers; i++) {
        let amplitude = (i%10) < 1 ? i+0.99 : i+0.0

        this.pd.setLayer(amplitude)
      }

      this.pd.start();
      
      //start watching mouse events
      this.interaction.trackPos = true;
      setInterval(this.updateMousePosition, 1000/PD_FPS);

    },


    onMousePressed() {
      if (!this.interaction.trackPos)
        return;

      this.interaction.isMousePressed = true;
      this.pd.onMousePressed(this.interaction.distance);
    },


    onMouseReleased(){
       if (!this.interaction.trackPos)
        return;

      this.interaction.isMousePressed = false
      this.pd.onMouseReleased();
    },


    onMouseMove(event) {
       if (!this.interaction.trackPos)
        return;

      if (this.interaction.mousePos != null)
        this.interaction.distance = Math.floor(Math.abs((event.clientY - this.interaction.mousePos.y) / (this.dimensions.height/this.tube.nbLayers)));

      this.interaction.mousePos = {x:event.clientX, y:event.clientY};
    },


    updateMousePosition() {
      if (!this.interaction.trackPos || !this.interaction.isMousePressed)
        return;
      
      let currentIndex = Math.floor(remap(this.interaction.mousePos.y, 0, this.dimensions.height, 0, this.tube.nbLayers));
      this.pd.currentIndex(currentIndex);
    
    },


    initTube() {
      this.tube = new Tube();

      this.tube.setHeight(100);
      this.tube.setRadius(40);

      //tube.amplitudes = cr.getValues(tube.nbLayers);
      let amplitudes = []
      for (let i=0; i< this.tube.nbLayers; i++) {
        amplitudes.push(i%2==0?0:0.02);
      }
      this.tube.amplitudes = amplitudes;

    },


    initThree(){

      let w = this.dimensions.width;
      let h = this.dimensions.height;

      //scene
      this.scene = new THREE.Scene();

      //camera
      this.camera = new THREE.PerspectiveCamera( 75, w/h, 0.1, 1000 );
      this.camera.position.z = 0;
      this.camera.position.y = 0;
      this.camera.position.x = 100;
      this.camera.lookAt(new THREE.Vector3(0,0,0));

      //renderer
      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setClearColor( 0x000000, 1 );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( w, h );

      //add to dom
      let container = this.$refs.threeContainer;
      this.renderer.domElement.id = "sketch"
      container.appendChild( this.renderer.domElement );

      setInterval(this.animate, 1000/ANIM_FPS)
    },



    //rotate tube and refresh renderer
    animate(){
      this.tube.rotateTube(ROTATION_SPEED);
      this.renderer.render( this.scene, this.camera ); 
    },


    //remove old geometry and add new one
    updateScene(){

      this.scene.remove(this.tube.group);
      this.tube.clearTube();
      this.tube.updateLayers();
      this.tube.createTube();
      this.scene.add(this.tube.group);

      //move camera to fit the whole tube    
      let fov = this.camera.fov * ( Math.PI / 180 ); 
      let dist = this.tube.radius + this.tube.height/(2.5 * Math.sin(fov/2));
      this.camera.position.x = dist; 
    },


    //updates THREE renderer and camera
    onResize() {
      
      let w = this.dimensions.width;
      let h = this.dimensions.height;

      this.camera.aspect = w/h;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( w, h);
      this.renderer.render( this.scene, this.camera );

    },


  },

  watch: {
    dimensions: {
      handler() {
        this.onResize();
      },
      deep:true,
    }
    
  },

  computed: {
    computedStyle:function() {
      return {
        "width":this.dimensions.width + "px",
        "height":this.dimensions.height + "px",
      }
    }
  },

}

</script>


<style scoped>
#scene3D {
  margin-left:auto;
  margin-right:auto;
}
</style>
