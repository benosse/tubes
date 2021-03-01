class Layer {
  

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor(center, rotation, radius, nbPoints, amplitude){


        this.center = center;
        this.radius = radius;
        this.nbPoints = nbPoints;
        this.amplitude = amplitude;
        this.rotation = rotation;
    
    
        this.points = new Array();
    
        for (let i = 0; i < nbPoints; i++) {
            //texture
            let r = i % 2 == 0 ? radius : radius + radius * amplitude;
    
            let v = new PVector(0, r);
            v.rotateTo((TWO_PI / nbPoints) * i);
            v.add(center);
            this.points.push(v);
        }
    }
    
    
    
    /*******************************************************************************/
    //DRAW
    /*******************************************************************************/
    drawLayer() {
    
        if (this.nbPoints < 4) {
            console.log("pas assez de points dans la couche : " + this.nbPoints);
            return;
        }
    
        push();

        rotate(this.rotation);

        beginShape();
        
        //last point
        curveVertex(this.points[this.nbPoints - 1].x, this.points[this.nbPoints - 1].y, this.points[this.nbPoints - 1].z);
        //points in-between
        for (let i = 0; i < this.nbPoints; i++) {
            curveVertex(this.points[i].x, this.points[i].y, this.points[i].z);
        }
        //first points
        curveVertex(this.points[0].x, this.points[0].y, this.points[0].z);
        curveVertex(this.points[1].x, this.points[1].y, this.points[1].z);
    
        endShape(CLOSE);
    
        
        pop();
    } 
}