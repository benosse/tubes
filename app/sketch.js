

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
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
        n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
      };

    easycam = createEasyCam();
    easycam.setDistance(150, 0);


    //todo set default height to html slider
    tube = new Tube();

    initCanvasEvents();
    console.log("setup done");

}


/*******************************************************************************/
//DOM INTERACTION
/*******************************************************************************/
function initCanvasEvents(){
    // height goes from 1 to 8
    let heightSlider = select("#heightSlider").elt;
    heightSlider .addEventListener('change', (event) => {
        tube.setHeight(event.target.value * 10);
      });


}




/*******************************************************************************/
//DRAWING
/*******************************************************************************/
function draw() {

    //debug   
    background(255);
    
    tube.drawTube();

}
