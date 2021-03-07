class PdHandler {
  

    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor(){

        //frequency of the tube
        this.frequency = 0;

        this.nbLayers = 0;

        this.layers = [];
    }
    
    


    sendTextureInfo(index) {
        let floatValue = Math.floor(index) + this.layers[index]/1;
    }


    clearLayer() {

    }
}