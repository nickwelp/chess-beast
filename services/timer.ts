class  Timer {
  public internalTimer:number = 0;
  private initTime = new Date();
  private timeLapsed:number = -1;
  private callBack:Function = () => null;
  private maxTime:number = 20;
  updateMaxTime = (a:number) => {
    this.maxTime = a;
  }
  static reset = () => {
    console.log('reseting');
    if(typeof Timer.thisTimer !== "boolean" && Timer.thisTimer){
      const { thisTimer } = Timer;
      if(typeof thisTimer !== "boolean" && typeof thisTimer !== "undefined"){
        thisTimer.initTime = new Date();
        thisTimer.timeLapsed = -1;
        if(thisTimer.internalTimer) window.clearInterval(thisTimer.internalTimer);
        Timer.thisTimer.internalTimer =  window.setInterval(()=>{
          thisTimer.timeLapsed += 1;
          if(thisTimer.timeLapsed > thisTimer.maxTime) {
            window.clearInterval(thisTimer.internalTimer);
            thisTimer.end();
          } 
        }, 1000);
      }
      console.log('reset!!',Timer.thisTimer.internalTimer);

    } 
  }

  static pause = () => {
    const rsh = Timer.getThisNoCb();
    if(rsh && typeof rsh !== "boolean"){
      const {internalTimer} = rsh;
      window.clearInterval(internalTimer);
    }
  }
  static unpause = () => {
    const rsh = Timer.getThisNoCb();
    if(typeof rsh !== "boolean" && typeof rsh !== "undefined"){
      rsh.initTime = new Date();
      window.clearInterval(rsh.internalTimer);
      if(rsh.maxTime > 0){
        rsh.internalTimer =  window.setInterval(()=>{
          rsh.timeLapsed += 1;
          if(rsh.timeLapsed > rsh.maxTime) {
            window.clearInterval(rsh.internalTimer);
            rsh.end();
          }
        }, 1000);
      }
    }
  }

  private static thisTimer:undefined|Timer|boolean;
  // singleton
  static getThis(cb:Function, timeLimit:number){
    if(!Timer.thisTimer) {
      Timer.thisTimer = true;
      Timer.thisTimer = new Timer(cb, timeLimit);
      return Timer.thisTimer;
    }
    else return Timer.thisTimer;
  }
  static getThisNoCb() {
    return Timer.thisTimer;
  }
  constructor(callBack:Function|undefined, timeLimit:number) {
    if(!Timer.thisTimer) throw new Error('instantiate with .getThis()');
    console.log('new timer');
    this.maxTime = timeLimit;
    this.callBack = callBack ? callBack : () => void(0);
  }
  start(){
    this.initTime = new Date();
    if(this.maxTime > 0){  
      this.internalTimer = window.setInterval(()=>{
        this.timeLapsed += 1;
        if(this.timeLapsed > this.maxTime) {
          window.clearInterval(this.internalTimer);
          this.end();
        }
      }, 1000);
    }
  }

  getTime() {
    return this.timeLapsed;
  }

  end() {
    window.clearInterval(this.internalTimer);
    if(this.maxTime>0){
      this.callBack(this.timeLapsed);
    }
    return new Date().getSeconds() - this.initTime.getSeconds();
  }

}

export default Timer;