class Tube {

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {

        //THREE group containing all layers
        this.layersGroup = null;
        //THREE group containing layersGroup and the tube
        this.group = null;

        //same material for all layers
        this.layerMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff} );
        this.tubeMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        
        this.radius = 40;
        this.height = 40;
        this.layerOffset = 1;

        this.center = new THREE.Vector3(0,0,0);

        this.layers = new Array();
        this.nbLayers = 0;

        this.amplitude = 0.1;

        //several amplitudes
        this.amplitudes = [];

        //computes the layers for the first time
        this.updateLayers();
    }

    /*******************************************************************************/
    //SETTERS
    /*******************************************************************************/
    setHeight(value) {
        this.height = value;
        this.nbLayers = Math.floor(this.height / this.layerOffset);
    }

    /*******************************************************************************/
    //UPDATE LAYERS
    /*******************************************************************************/
    updateLayers() {


        this.layers = [];

        let nbPoints = 100;
  

        for (let i=0; i<this.nbLayers; i++) {
            //layer center
            let layerCenter = new THREE.Vector3(this.center.x, this.center.y, i*this.layerOffset);

            //layer rotation
            let rotation = i%2 == 0 ? 0 : ((2*Math.PI)/nbPoints);

            //this.layers.push(new Layer(layerCenter, rotation, this.radius, nbPoints, this.amplitude, this.layerMaterial));
            this.layers.push(new Layer(layerCenter, rotation, this.radius, nbPoints, this.amplitudes[i], this.layerMaterial));
        }
    }

    


    createTube(scene) {
        //make new group
        this.group = new THREE.Group();

        this.layersGroup = new THREE.Group();

        //get layers
        for (let i = 0; i < this.layers.length; i++) {
            this.layersGroup.add(this.layers[i].createLayer());
        }

        //rotate layers
        this.layersGroup.rotation.x = -Math.PI/2;

        this.group.add(this.layersGroup);

        //inner cylinder
        const geometry = new THREE.CylinderGeometry( this.radius, this.radius, this.height, 32 );
        const cylinder = new THREE.Mesh( geometry, this.tubeMaterial);
        this.group.add( cylinder );

        //center tube
        this.layersGroup.position.y = -this.height/2;
        
    }


    clearTube() {

        //clear layers
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].clearLayer();
        }
        
        //clear groups
        this.layersGroup = null;
        this.group = null;

        //todo : clear inner tube?

    }


    rotateTube(speed){
        //no need to rotate the tube, only rotate the layers
        this.layersGroup.rotation.z += speed;
    }
}