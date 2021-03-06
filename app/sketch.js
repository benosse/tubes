/*******************************************************************************/
//UTILS
/*******************************************************************************/
function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



/*******************************************************************************/
//PARAMS
/*******************************************************************************/
//sliders
const MIN_SLIDER = 0;
const MAX_SLIDER = 100;

const MIN_HEIGHT = 10;
const MAX_HEIGHT = 200;

const MIN_RADIUS= 10;
const MAX_RADIUS = 100;

const MIN_AMPLITUDE = 0;
const MAX_AMPLITUDE = 0.4;


//animation
const rotationSpeed = 0.01;

//camera
const CAM_POS_X = 100;
const CAM_POS_Y = 0;
const CAM_POS_Z = 0;


//canvas
let WIDTH = window.innerWidth/2;
let HEIGHT = window.innerHeight;

const tube = new Tube();
//ctrlcurve with paper.js
const cr= new ControlCurve("controlCurve");


//sliders
const heightSlider = document.getElementById("heightSlider");
const radiusSlider = document.getElementById("radiusSlider");


/*******************************************************************************/
//THREE SETUP
/*******************************************************************************/
//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera( 75, WIDTH/HEIGHT, 0.1, 1000 );
camera.position.z = CAM_POS_Z;
camera.position.y = CAM_POS_Y;
camera.position.x = CAM_POS_X;
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


cr.onNewValues = onAmplitudeChange;







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


  //move camera to fit the whole tube
  let fov = camera.fov * ( Math.PI / 180 ); 
  let dist = tube.radius + tube.height/(2.5 * Math.sin(fov/2));
  camera.position.x = dist;
}



/*******************************************************************************/
//DOM INTERACTION
/*******************************************************************************/

function bindEvents(){
  window.addEventListener( 'resize', onWindowResize );
  heightSlider.addEventListener('change', onHeightChange);
  radiusSlider.addEventListener('change', onRadiusChange);
}

function initTube(){
  tube.setHeight(remap(heightSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_HEIGHT, MAX_HEIGHT));
  /*tube.height = remap(heightSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_HEIGHT, MAX_HEIGHT);*/
  tube.radius = remap(radiusSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_RADIUS, MAX_RADIUS);
  //tube.amplitude = remap(amplitudeSlider.value, MIN_SLIDER, MAX_SLIDER, MIN_AMPLITUDE, MAX_AMPLITUDE);
  tube.amplitudes = cr.getValues(tube.nbLayers);

  update();
}

function onHeightChange(event){
  tube.setHeight(remap(event.target.value, MIN_SLIDER, MAX_SLIDER, MIN_HEIGHT, MAX_HEIGHT));
  update();
}


function onRadiusChange(event){
  tube.radius = remap(event.target.value, MIN_SLIDER, MAX_SLIDER, MIN_RADIUS, MAX_RADIUS);
  update();
}

//callback of controlcurve
function onAmplitudeChange(event){
  tube.amplitudes = cr.getValues(tube.nbLayers).reverse();
  update();
}




function onWindowResize() {

  WIDTH = window.innerWidth/2;
  HEIGHT = window.innerHeight;
  camera.aspect = WIDTH/HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize( WIDTH, HEIGHT);


  //also updates ctrl curves
  cr.updateCanvasSize();

}