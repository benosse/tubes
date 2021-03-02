/*******************************************************************************/
//UTILS
/*******************************************************************************/
function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



/*******************************************************************************/
//PARAMS
/*******************************************************************************/
const MIN_SLIDER = 0;
const MAX_SLIDER = 100;

const MIN_HEIGHT = 10;
const MAX_HEIGHT = 200;

const MIN_AMPLITUDE = 0;
const MAX_AMPLITUDE = 0.4;

const rotationSpeed = 0.01;

let WIDTH = window.innerWidth/2;
let HEIGHT = window.innerHeight;

const tube = new Tube();



//sliders
const heightSlider = document.getElementById("heightSlider");
const amplitudeSlider = document.getElementById("amplitudeSlider");


/*******************************************************************************/
//THREE SETUP
/*******************************************************************************/
//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );
camera.position.z = 100;
camera.position.x = 100;
camera.lookAt(new THREE.Vector3(0,0,0));

//renderer
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( WIDTH, HEIGHT );

renderer.domElement.id = "sketch"
//todo : onresize and init window dimensions
//renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




/*******************************************************************************/
//INIT
/*******************************************************************************/
bindEvents();
initTube();
animate();



//animate
function animate() {
	requestAnimationFrame( animate );
  tube.rotateTube(rotationSpeed);
	renderer.render( scene, camera );
}


function update(){
  //remove tube from scene
  scene.remove(tube.group);
  //clear previous tube
  tube.clearTube();
  //set new values for tube
  tube.updateLayers();
  //create new tube
  tube.createTube();
  //add tube to scene
  scene.add(tube.group);
}



/*******************************************************************************/
//DOM INTERACTION
/*******************************************************************************/

function bindEvents(){
  window.addEventListener( 'resize', onWindowResize );
  heightSlider.addEventListener('change', onHeightChange);
  amplitudeSlider .addEventListener('change', onAmplitudeChange);
}

function initTube(){
  tube.height = remap(heightSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_HEIGHT, MAX_HEIGHT);
  tube.amplitude = remap(amplitudeSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_AMPLITUDE, MAX_AMPLITUDE);
  update();
}

function onHeightChange(event){
  tube.height = remap(event.target.value, MIN_SLIDER, MAX_SLIDER, MIN_HEIGHT, MAX_HEIGHT);
  update();
}

function onAmplitudeChange(event){
  tube.amplitude = remap(event.target.value, MIN_SLIDER, MAX_SLIDER, MIN_AMPLITUDE, MAX_AMPLITUDE);
  update();
}




function onWindowResize() {

  WIDTH = window.innerWidth/2;
  HEIGHT = window.innerHeight;
  camera.aspect = WIDTH/HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WIDTH, HEIGHT);

}