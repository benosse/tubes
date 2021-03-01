class Tube {

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {
        
        this.radius = 40;
        this.height = 40;
        this.layerOffset = 1;

        this.center = {x:0, y:0, z:0};

        this.layers = new Array();
        this.nbLayers = 0;

        this.amplitude = 0;

        //computes the layers for the first time
        this.updateLayers();
    }

    /*******************************************************************************/
    //SETTERS
    /*******************************************************************************/
    setHeight(newHeight) {
        this.height = newHeight;
        //computes new layers 
        this.updateLayers();
    }

    setAmplitude(newAmplitude) {
        this.amplitude = newAmplitude;
        //computes new layers 
        this.updateLayers();
    }

    /*******************************************************************************/
    //UPDATE LAYERS
    /*******************************************************************************/
    updateLayers() {
        this.nbLayers = Math.floor(this.height / this.layerOffset);

        this.layers = [];

        let nbPoints = 60;
  

        for (let i=0; i<this.nbLayers; i++) {
            //layer center
            let layerCenter = {x:this.center.x, y:this.center.y, z:this.center.y - this.height/2 + i*this.layerOffset};
            //layer rotation
            let rotation = i%2 == 0 ? 0 : (TWO_PI/nbPoints);

            this.layers.push(new Layer(layerCenter, rotation, this.radius, nbPoints, this.amplitude));
        }
    }

    

    /*******************************************************************************/
    //DRAW
    /*******************************************************************************/
    drawTube() {

        fill(255);
        strokeWeight(0.3);
        //curveTightness(5);
        curveDetail(4);
        smooth();

        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].drawLayer();
        }
        
    }
}