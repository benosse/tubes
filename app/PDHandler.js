class PDHandler {
  
    /*******************************************************************************/
    //CONSTRUCTOR
    /*******************************************************************************/
    constructor(){
        console.log("creating PDHandler")
        //pd variables
        this.webAssemblySupported = (typeof WebAssembly === 'object');
        this.heavyModule = null;
        this.loader = null;

        if (this.webAssemblySupported) {
            this.heavyModule = printToSound_Module();
            this.heavyModule['onRuntimeInitialized'] = () =>{
                console.log("this", this);
                this.moduleLoaded()};
          }
          else {
            console.warn("heavy: web assembly not found, falling back to asm.js");
        
            var script = document.createElement('script');
            script.src = "./lib/pd/printToSound.asm.js";
            script.onload = () => {
                console.log("this", this)
              this.heavyModule = printToSound_AsmModule();
              
              this.moduleLoaded();
            }
            document.body.appendChild(script);
          }
    }

    moduleLoaded() {
        console.log("moduleloaded")
        this.loader = new this.heavyModule.AudioLibLoader();
        
        this.loader.init({
          // optional: set audio processing block size, default is 2048
          blockSize: 2048,
          // optional: provide a callback handler for [print] messages
          printHook: this.onPrint,
          // optional: provide a callback handler for [s {sendName} @hv_param] messages
          sendHook: this.onFloatMessage,
          // optional: pass an existing web audio context, otherwise a new one
          // will be constructed.
          webAudioContext: null
        });

        
        this.start();
        this.updateSlider_frequency(200.0);

    }

    start() {
        this.loader.start();
        console.log("pd started")
    }
      
    stop() {
        this.loader.stop();
    }
      
    toggleTransport(element) {
        (this.loader.isPlaying) ? this.stop() : this.start();
    }
      
    onPrint(message) {
        console.log(message);
    }
      
    onFloatMessage(sendName, floatValue) {
        console.log(sendName, floatValue);
    }

    // Generated Parameter Update Methods
    updateSlider_frequency(value) {
        this.loader.audiolib.setFloatParameter("frequency", value);
    }
      
    updateSlider_interpolation(value) {
        this.loader.audiolib.setFloatParameter("interpolation", value);
    }
}