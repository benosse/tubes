import "./printToSoundV3.js";
import "./printToSoundV3.asm.js";

export default class PDHandler {

    

    constructor(callback){
        console.log("creating PDHandler")
        //pd variables
        this.webAssemblySupported = (typeof WebAssembly === 'object');
        this.heavyModule = null;
        this.loader = null;

        if (this.webAssemblySupported) {
            this.heavyModule = printToSoundV3_Module();
            this.heavyModule['onRuntimeInitialized'] = () =>{
                console.log("this", this);
                this.moduleLoaded(callback)};
          }
          else {
            console.warn("heavy: web assembly not found, falling back to asm.js");
        
            var script = document.createElement('script');
            script.src = "./lib/pd/printToSoundV3.asm.js";
            script.onload = () => {
              this.heavyModule = printToSoundV3_AsmModule();
              
              this.moduleLoaded(callback);
            }
            document.body.appendChild(script);
          }
    }

    moduleLoaded(callback) {
        this.loader = new this.heavyModule.AudioLibLoader();
        
        this.loader.init({
          // optional: set audio processing block size, default is 2048
          blockSize: 1024,
          // optional: provide a callback handler for [print] messages
          printHook: this.onPrint,
          // optional: provide a callback handler for [s {sendName} @hv_param] messages
          sendHook: this.onFloatMessage,
          // optional: pass an existing web audio context, otherwise a new one
          // will be constructed.
          webAudioContext: null
        });

        callback();
    }

    start() {
        this.loader.start();
        console.log("pd started")
    }

    setFPS(value) {
        this.loader.audiolib.setFloatParameter("setFPS", value);
    }

    setNbLayers(value) {
        this.loader.audiolib.setFloatParameter("setNbLayers", value);
    }

    setLayer(value) {
        this.loader.audiolib.setFloatParameter("setLayer", value);
    }

    currentIndex(value) {
        this.loader.audiolib.setFloatParameter("currentIndex", value);
    }
    
    onMousePressed(value) {
        this.loader.audiolib.setFloatParameter("onMousePressed", value);    
    }

    onMouseReleased(){
        this.loader.audiolib.sendEvent("onMouseRelease");
    }
      
    stop() {
        this.loader.stop();
    }
}