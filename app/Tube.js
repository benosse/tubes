class Tube {

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {
        
        this.radius = 40;
        this.height = 40;
        this.layerOffset = 2;

        this.center = {x:0, y:0, z:0};

        this.layers = new Array();
        this.nbLayers = 0;

        //computes the layers for the first time
        this.updateLayers();
    }

    /*******************************************************************************/
    //SET HEIGHT
    /*******************************************************************************/
    setHeight(newHeight) {
        this.height = newHeight;

        //computes new layers 
        this.updateLayers();
    }

    /*******************************************************************************/
    //UPDATE LAYERS
    /*******************************************************************************/
    updateLayers() {
        this.nbLayers = Math.floor(this.height / this.layerOffset);

        this.layers = [];

        let nbPoints = 40;
        let amplitude = 0.04;

        for (let i=0; i<this.nbLayers; i++) {
            //layer center
            let layerCenter = {x:this.center.x, y:this.center.y, z:this.center.y - this.height/2 + i*this.layerOffset};
            //layer rotation
            let rotation = i%2 == 0 ? 0 : (TWO_PI/nbPoints)/2;

            this.layers.push(new Layer(layerCenter, rotation, this.radius, nbPoints, amplitude));
        }
    }

    

    /*******************************************************************************/
    //DRAW
    /*******************************************************************************/
    drawTube() {

        noFill();
        strokeWeight(0.2);
        curveTightness(5);
        curveDetail(3);

        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].drawLayer();
        }
        
    }
}