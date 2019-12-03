import { Stage, CanvasCtx } from './types';
import { sleep } from './util';
import * as G from './gridstage';

function evalClosure(write : (msg: string) => void,
    display : DisplayEngine,
    loop : (times : number, gap : number, func : (i : number) => void) => void,
    forever : (gap : number, func : () => void) => void,
    finish : () => void,
    G : object,
    prog : string) {

    eval(prog);
}

export class ExecCtx {
    writeFn : (x : string) => void;
    display : DisplayEngine;
    frameGap : number = 10;
    halt : boolean = false;
    ival : number = 0;

    constructor(write : (x : string) => void, display : DisplayEngine){
        this.writeFn = write;
        this.display = display;
    }

    handleKeyDown(e : KeyboardEvent) {
        this.display.keyFn(e.code);
    }

    stop() {
        this.halt = true;
        clearInterval(this.ival);
    }

    running() : boolean {
        return !this.halt
    }

    async run(ctx : CanvasCtx, prog : string) {
        this.halt = false;
        this.ival = window.setInterval(() => this.display.draw(ctx), this.frameGap);

        const execution = new Promise(resolve => {
            const finish = ()=> { this.stop(); resolve(); };
            const loop = async (times : number, gap : number, func : (i:number)=>void) => {
                for(let i = 0; i < times && !this.halt; i++){
                    await func(i);
                    await sleep(gap);
                }
            };
            const forever = async (gap : number, func : Function) => {
                while(!this.halt){
                    await func();
                    await sleep(gap);
                }
            };
            evalClosure(this.writeFn, this.display, loop, forever, finish, G, prog);
        });

        await execution;
        this.display.draw(ctx);
    }
}

export class DisplayEngine {
    private stage : Stage | undefined;
    sizeX : number;
    sizeY : number;

    keyFn : (code : string) => void = (s : string) => {};

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

    registerKeyHandler(fn : (code : string)=>void){
        this.keyFn = fn;
    }

    setStage(stage : Stage){
        this.stage = stage;
    }
}
