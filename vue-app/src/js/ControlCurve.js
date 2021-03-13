export default class ControlCurve {
  

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor(canvasId){

        this.canvas = document.getElementById(canvasId);

        paper.setup(this.canvas);

        //the curve path
        this.path = new paper.Path();
        this.path.strokeColor = 'black';

        var start = new paper.Point(100, 100);
        this.path.moveTo(start);
        this.path.lineTo(start.add([ 0, 300 ]));

        //preview segments as shapes
        this.points = [];
        this.addPoint(this.path.firstSegment);
        this.addPoint(this.path.lastSegment);
        //point being dragged
        this.draggedPoint = null;

        //paper.view.draw();

        //mouse events
        this.tool = new paper.Tool();
        //this.tool.onMouseDown = (event)=> {this.handleMouseDown(event)};
        this.tool.onMouseUp = (event) => {this.handleMouseUp(event)};
        this.tool.onMouseDrag = (event) => {this.handleMouseDrag(event)};
        
    }
    

    getValues(nbSamples) {
        let values = [];

        for (let i=0; i< nbSamples; i++) {
            let samplePos = this.path.getLocationAt(i * this.path.length/nbSamples).point;
            let sampleValue = remap(samplePos.x,0,200,0,0.2);
            values.push(sampleValue);
        }

        return values;
    }


    addPoint(segment){
        console.log("addding point", segment)
        let circle = new paper.Shape.Circle(segment.point, 10);
        circle.fillColor = 'red';


        circle.controlCurve = this;
        circle.segment = segment;

        circle.onMouseDown = function(event) {
            this.controlCurve.draggedPoint = this;
            this.fillColor = 'red';
        };

        
        this.points.push(circle);

    }


    handleMouseDrag(event) {
        if (this.draggedPoint == null)
            return;
        //update curve segment
        this.draggedPoint.segment.point.set(event.point);

        //update circle
        this.draggedPoint.setPosition(event.point);
        this.draggedPoint.fillColor ='green';

        //update amplitude (callback)
        this.onNewValues();
    }

    handleMouseUp(event) {

        if (this.draggedPoint == null)
            return;
        
        //update curve segment
        this.draggedPoint.segment.point.set(event.point);

        //update circle
        this.draggedPoint.setPosition(event.point);
        this.draggedPoint.fillColor ='red';

        this.draggedPoint = null;
    }

    updateCanvasSize(){
        //marche pas, mon css est override, à voir pourquoi
        //let cv = paper.view.element;
        //console.log(this.canvas)
        paper.view.setViewSize(200, HEIGHT);
    }


}