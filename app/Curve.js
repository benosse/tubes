class Curve {
  


/*******************************************************************************/
//CONSTRUCTOR
/*******************************************************************************/
constructor(center, radius, nbPoints, texture, tilt, rotation, clr){
    this.alpha = 100;
    this.center = center;
    this.radius = radius;
    this.nbPoints = nbPoints;
    this.tilt = tilt;
    this.rotation = rotation;
    this.clr = clr;
    this.texture = texture;



    this.points = new Array();
    //creating the polets

    for (let i = 0; i < nbPoints; i++) {
        //texture
        let r = i % 2 == 0 ? radius : radius + radius * texture;

        let v = new PVector(0, r);
        v.rotateTo((TWO_PI / nbPoints) * i);
        this.points.push(v);
    }

    console.log("curve created with params nbPoints: " + nbPoints + " radius: " + radius + "texture: " + texture + " tilt: " + tilt + " rotation: " + rotation + "offset: " + center.z);

}



/*******************************************************************************/
//DRAW
/*******************************************************************************/
drawCurve() {

    if (this.nbPoints < 4) {
        console.log("pas assez de points dans la couche : " + this.nbPoints);
        return;
    }

    fill(this.clr, this.alpha);

    push();
    translate(this.center.x, this.center.y, this.center.z);
    rotateZ(this.rotation);
    rotateX(this.tilt);



    beginShape();


    curveVertex(this.points[this.nbPoints - 1].x, this.points[this.nbPoints - 1].y, this.points[this.nbPoints - 1].z);
    
    for (let i = 0; i < this.nbPoints; i++) {
        curveVertex(this.points[i].x, this.points[i].y, this.points[i].z);
    }
    //deux premiers points
    curveVertex(this.points[0].x, this.points[0].y, this.points[0].z);
    curveVertex(this.points[1].x, this.points[1].y, this.points[1].z);

    endShape(CLOSE);

    pop();
} 
  }