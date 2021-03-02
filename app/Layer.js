class Layer {
  

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
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
            let point = new THREE.Vector3().addVectors(this.center, new THREE.Vector3(v.x, v.y, 0));
            this.points.push(point);
            
        }
    }
    
    


    createLayer() {
    
        if (this.nbPoints < 4) {
            console.log("not enough points : " + this.nbPoints);
            return;
        }


        //create curve
        let curve = new THREE.CatmullRomCurve3(this.points);
        curve.closed = true;

        //get geometry points
        let geomPoints = curve.getPoints( 200 );


        //create new geometry
        this.geometry = new THREE.BufferGeometry().setFromPoints( geomPoints );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( this.geometry, this.material );

        return curveObject;
    }


    clearLayer() {
        if (this.geometry != null) {
            this.geometry.dispose();
        }
            
    }
}