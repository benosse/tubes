/*******************************************************************************/
//UTILS
/*******************************************************************************/
function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}







//dimensions
let screenWidth = 800;
let screenHeight = 800;


//tmp
let tube;

var easycam;

var canvas;


function setup() {

    canvas = createCanvas(windowWidth/2, windowHeight, WEBGL);
    canvas.elt.id = "sketch";
    background(255);


    //camera
    let cam = createCamera();
    
    cam.lookAt(0,0,0);
    cam.setPosition(-150,0,0);

    cam.lookAt(0,0,0);

    /*
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
        n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
      };

    easycam = createEasyCam();
    easycam.setDistance(150, 0);
    */


    //todo set default height to html slider
    tube = new Tube();

    initCanvasEvents();
    console.log("setup done");

}


/*******************************************************************************/
//DOM INTERACTION
/*******************************************************************************/
function initCanvasEvents(){
    // *************************************************************************
    //height : from 0 to 100
    //sound

    //graphics : remap from 5 to 20
    let heightSlider = select("#heightSlider").elt;
    heightSlider .addEventListener('change', (event) => {
        tube.setHeight(remap(event.target.value, 0, 100, 50, 100));
      });

    // *************************************************************************
    //amplitude : from 0 to 100
    //sound

    //graphics : remap from 0 to 0.5
    let amplitudeSlider = select("#amplitudeSlider").elt;
    amplitudeSlider .addEventListener('change', (event) => {
        tube.setAmplitude(remap(event.target.value, 0, 100, 0, 0.1));
      });


}




/*******************************************************************************/
//DRAWING
/*******************************************************************************/
function draw() {

    //debug   
    background(255);
    
    push();
    //rotate on X (so Z is pointing upward)
    rotateX(PI/2)
    //tube revolution
    //rotateZ(millis() / 1000);
    tube.drawTube();
    pop();

}
