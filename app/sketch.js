

//dimensions
let screenWidth = 800;
let screenHeight = 800;


//tmp
let ctr;
let txt;

var easycam;




function setup() {

    createCanvas(screenWidth, screenHeight, WEBGL);
    background(255);


    //camera
    Dw.EasyCam.prototype.apply = function(n) {
        var o = this.cam;
        n = n || o.renderer,
        n && (this.camEYE = this.getPosition(this.camEYE), this.camLAT = this.getCenter(this.camLAT), this.camRUP = this.getUpVector(this.camRUP), n._curCamera.camera(this.camEYE[0], this.camEYE[1], this.camEYE[2], this.camLAT[0], this.camLAT[1], this.camLAT[2], this.camRUP[0], this.camRUP[1], this.camRUP[2]))
      };

    createEasyCam();

    txt = "";

    ctr = new Construction();
    console.log("setup done" + ctr);

}




/*******************************************************************************/
//DRAWING
/*******************************************************************************/
function draw() {

    //debug   
    background(255);
    
    ctr.drawConstruction();

}

/*******************************************************************************/
//UPDATE
/*******************************************************************************/

function update() {
    //calcul texte...
    txt = select("#user_text").value();

    ctr = new Construction();
    ctr.parse(txt);

}



/*******************************************************************************/
//HANDLE KEYBOARD INPUT
// TODO FILTER KEYS
/*******************************************************************************/
function keyPressed() {

    //txt += key;
    update();
}

function mouseReleased() {
}