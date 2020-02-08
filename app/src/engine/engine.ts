import { RuntimeError } from "../setanta/src/error";
import { Parser } from "../setanta/src/gen_parser";
import { Interpreter } from "../setanta/src/i10r";
import { goLitreacha, Value } from "../setanta/src/values";
import * as G from "./gridstage";
import { CanvasCtx, Stage } from "./types";
import { sleep } from "./util";

async function evalClosure(write: (msg: string) => void,
                           display: DisplayEngine,
                           loop: (times: number, gap: number, func: (i: number) => void) => void,
                           finish: () => void,
                           prog: string) {

    const p = new Parser(prog);
    const res = p.parse();
    if (res.err) {
        alert(res.err);
        finish();
        return;
    }
    const ast = res.ast!;

    const builtins: Array<[string[], Value]> = [
        [
            ["scríobh"],
            {
                ainm: "scríobh",
                arity: () => -1,
                call: (args): Promise<Value> => {
                    return new Promise<null>((r) => {
                        write(args.map(goLitreacha).join(" "));
                        r(null);
                    });
                },
            },
        ],
    ];
    const i = new Interpreter(builtins);
    try {
        await i.interpret(ast);
    } catch (e) {
        if (e instanceof RuntimeError) {
            alert(e);
        }
        throw e;
    } finally {
        finish();
    }
}

export class ExecCtx {
    public writeFn: (x: string) => void;
    public display: DisplayEngine;
    public frameGap: number = 10;
    public halt: boolean = false;
    public ival: number = 0;

    constructor(write: (x: string) => void, display: DisplayEngine) {
        this.writeFn = write;
        this.display = display;
    }

    public handleKeyDown(e: KeyboardEvent) {
        this.display.keyFn(e.code);
    }

    public stop() {
        this.halt = true;
        clearInterval(this.ival);
    }

    public running(): boolean {
        return !this.halt;
    }

    public async run(ctx: CanvasCtx, prog: string) {
        this.halt = false;
        this.ival = window.setInterval(() => this.display.draw(ctx), this.frameGap);

        const execution = new Promise((resolve) => {
            const finish = () => { this.stop(); resolve(); };
            const loop = async (times: number, gap: number, func: (i: number) => void) => {
                for (let i = 0; i < times && !this.halt; i++) {
                    await func(i);
                    await sleep(gap);
                }
            };
            evalClosure(this.writeFn, this.display, loop, finish, prog);
        });

        await execution;
        this.display.draw(ctx);
    }
}

export class DisplayEngine {
    public sizeX: number;
    public sizeY: number;
    private stage: Stage | undefined;

    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    public keyFn: (code: string) => void = (s: string) => undefined;

    public draw(ctx: CanvasCtx): void {
        if (this.stage) {
            ctx.clearRect(0, 0, this.sizeX, this.sizeY);
            this.stage.draw(ctx);
        }
    }

    public registerKeyHandler(fn: (code: string) => void) {
        this.keyFn = fn;
    }

    public setStage(stage: Stage) {
        this.stage = stage;
    }
}
