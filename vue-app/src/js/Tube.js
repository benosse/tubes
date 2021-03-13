import * as THREE from "three";

/*******************************************************************************/
//CLASS LAYER
/*******************************************************************************/
class Layer {
  
    constructor(center, rotation, radius, nbPoints, amplitude, material){

        //Three related params
        this.material = material;
        this.geometry = null;

        this.center = center;
        this.radius = radius;
        this.nbPoints = nbPoints;
        this.amplitude = amplitude;
        this.rotation = rotation;
    
    
        this.points = new Array();
        for (let i = 0; i < nbPoints; i++) {
            //texture
            let r = i % 2 == 0 ? radius : radius + radius * amplitude;
    
            let v = new THREE.Vector2(0, r );
            v.rotateAround(new THREE.Vector2(0, 0), this.rotation + ((2*Math.PI) / nbPoints) * i);

            //let point = new THREE.Vector3().addVectors(this.center, new THREE.Vector3(v.x, v.y, 0));
            this.points.push(v);
            
        }
    }
    
    
    createLayer() {
    
        if (this.nbPoints < 4) {
            console.log("not enough points : " + this.nbPoints);
            return;
        }

        //curve with more points...
        /*
        let curve = new THREE.CatmullRomCurve3(this.points);
        curve.closed = true;
        let curvePoints = curve.getPoints( 200 );
        this.geometry = new THREE.BufferGeometry().setFromPoints( curvePoints );
        */

        //create new geometry
        this.geometry = new THREE.BufferGeometry().setFromPoints( this.points );

        // Create the final object to add to the scene
        const line = new THREE.LineLoop( this.geometry, this.material );
        line.position.z= this.center.z;
        return line;
    }

    clearLayer() {
        if (this.geometry != null) {
            this.geometry.dispose();
        }   
    }
}



export default  class Tube {

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {

        //THREE group containing all layers
        this.layersGroup = null;
        //THREE group containing layersGroup and the tube
        this.group = null;

        //same material for all layers
        this.layerMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff} );
        this.tubeMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
        
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

    setRadius(value) {
        this.radius = value;
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

    


    createTube() {
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