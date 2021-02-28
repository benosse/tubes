

//dimensions
let screenWidth = 800;
let screenHeight = 800;


//tmp
let ctr;
let txt;



function settings() {
    createCanvas(screenWidth, screenHeight, P3D);
}

function setup() {


    background(255);


    //camera
    //initCamera();

    //debug : load txt
    txt = "";
    /*
    let[] lines = loadlets("formula.txt");
    for (let i = 0 ; i < lines.length; i++) {
      txt += lines[i];
    }
    */

    //Curve c = new Curve(new let(width/2,height/2), 100, 0.2);
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
    ctr.parse(txt);

}


/*******************************************************************************/
//INIT
/*******************************************************************************/

function initCamera() {
    cam = new PeasyCam(this, 0, 0, 0, 100);
    perspective(PI / 3.0, width / height, 1, 100000);
    gpdh = cam.getPanDragHandler();
    grdh = cam.getRotateDragHandler();
    //cam.reset();
    cam.rotateX(-PI / 3);

    cam.setLeftDragHandler(grdh);
    cam.setCenterDragHandler(grdh);
    cam.setRightDragHandler(grdh);
}





/*******************************************************************************/
//HANDLE KEYBOARD INPUT
// TODO FILTER KEYS
/*******************************************************************************/
function keyPressed() {

    txt += key;
    update();
}

function mouseReleased() {
}