
/*******************************************************************************/
//PARAM
//all the params of Construction follow this same logic
/*******************************************************************************/
class Param {


    constructor(base, increment, min, max) {
        this.base = base;
        this.value = base;
        this.increment = increment;
        this.min = min;
        this.max = max;
    }

    increase() {
        this.value = min(this.max, this.value + this.increment);
    }

    decrease() {
        this.value = max(this.min, this.value - this.increment);
    }

    reset() {
        this.value = this.base;
    }

}


class Construction {




    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor() {
        
        this.radius = new Param(100, 10, 0, 1000);  //base increment min max
        this.texture = new Param(0.2, 0.05, 0, 1);
        this.nbPoints = new Param(4, 2, 4, 40);
        this.offset = new Param(0, 4, 0, 10000);
        this.tilt = new Param(0, 0.1, -PI, PI);
        this.rotation = new Param(0, 0.1, -10000, 10000);

        this.r = new Param(100, 5, 0, 255);
        this.g = new Param(100, 5, 0, 255);
        this.b = new Param(100, 5, 0, 255);



        this.center = {x:0, y:0, z:0};
        this.txt;
        this.curves = new Array();

    }

    /*******************************************************************************/
    //PARSE TEXT
    /*******************************************************************************/
    parse(txt) {
        this.txt = txt.toUpperCase();
        this.curves = [];


        for (let i = 0; i < this.txt.length; i++) {
            let c = this.txt.charAt(i);

            switch (c) {

                //create curve ********************************************
                case ' ':
                    //get clr
                    let clr = color(this.r.value, this.g.value, this.b.value);
                    //create curve
                    let newCenter = {x:this.center.x, y:this.center.y, z:this.center.z + this.offset.value};
                    let newCurve = new Curve(newCenter, this.radius.value, this.nbPoints.value, this.texture.value, this.tilt.value, this.rotation.value, clr);
                    this.curves.push(newCurve);
                    //offset next center
                    this.offset.increase();
                    break;


                //nb polets ********************************************
                case 'Z':
                    this.nbPoints.decrease();
                    break;

                case 'I':
                    this.nbPoints.increase();
                    break;


                //rotation ********************************************
                case 'A':
                    this.rotation.increase();
                    break;

                case 'E':
                    this.rotation.decrease();
                    break;


                //texture ********************************************
                case 'O':
                    this.texture.increase();
                    break;

                case 'S':
                    this.texture.decrease();
                    break;


                //tilt ********************************************
                case ',':
                    this.tilt.increase();
                    break;

                case '.':
                    this.tilt.decrease();
                    break;

                //clr********************************************
                case 'R':
                    this.r.increase();
                    break;

                case 'G':
                    this.g.increase();
                    break;

                case 'B':
                    this.b.increase();
                    break;


                default:
                    break;
            }
        }

    }


    /*******************************************************************************/
    //DRAW
    /*******************************************************************************/
    drawConstruction() {

        //noFill();
        //strokeWeight(1);

        
        noStroke();
        for (let i = 0; i < this.curves.length; i++) {
            this.curves[i].drawCurve();
        }
        
    }




}