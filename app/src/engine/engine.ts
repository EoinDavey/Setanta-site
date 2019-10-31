import { Stage, CanvasCtx } from './types';
export class DisplayEngine {
    private stage : Stage | undefined;
    sizeX : number;
    sizeY : number;

    constructor(sizeX : number, sizeY : number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    draw(ctx : CanvasCtx) : void {
        if(this.stage){
            ctx.clearRect(0, 0, this.sizeX, this.sizeY);
            this.stage.draw(ctx);
        }
    }

    setStage(stage : Stage){
        this.stage = stage;
    }
}

export { DirectionalAgent, GridStage, Agent } from './gridstage';
