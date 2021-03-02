class Tube {

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {

        //THREE group containing all layers
        this.group = null;

        //same material for all layers
        this.material = new THREE.LineBasicMaterial( { color : 0xffffff } );
        
        this.radius = 40;
        this.height = 40;
        this.layerOffset = 1;

        this.center = new THREE.Vector3(0,0,0);

        this.layers = new Array();
        this.nbLayers = 0;

        this.amplitude = 0.1;

        //computes the layers for the first time
        this.updateLayers();
    }



    /*******************************************************************************/
    //UPDATE LAYERS
    /*******************************************************************************/
    updateLayers() {
        this.nbLayers = Math.floor(this.height / this.layerOffset);

        this.layers = [];

        let nbPoints = 100;
  

        for (let i=0; i<this.nbLayers; i++) {
            //layer center
            let layerCenter = new THREE.Vector3(this.center.x, this.center.y, i*this.layerOffset);

            //layer rotation
            let rotation = i%2 == 0 ? 0 : ((2*Math.PI)/nbPoints);

            this.layers.push(new Layer(layerCenter, rotation, this.radius, nbPoints, this.amplitude, this.material));
        }
    }

    


    createTube(scene) {
        //make new group
        this.group = new THREE.Group();

        //get layers
        for (let i = 0; i < this.layers.length; i++) {
            this.group.add(this.layers[i].createLayer());
        }

        //center tube
        this.group.position.y = -this.height/2;
        
        //rotate tube
        this.group.rotation.x = -Math.PI/2;

        
    }


    clearTube() {

        //clear layers
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].clearLayer();
        }
        
        //clear group
        this.group = null;
    }


    rotateTube(speed){
        this.group.rotation.z += speed;
    }
}