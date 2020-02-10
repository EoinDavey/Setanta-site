import * as Asserts from "../setanta/src/asserts";
import { RuntimeError } from "../setanta/src/error";
import { Parser } from "../setanta/src/gen_parser";
import { Interpreter, STOP } from "../setanta/src/i10r";
import { callFunc, goLitreacha, Value } from "../setanta/src/values";
import * as G from "./gridstage";
import { CanvasCtx, Stage } from "./types";
import { sleep } from "./util";

export class ExecCtx {
    private writeFn: (x: string) => void;
    private display: DisplayEngine;
    private frameGap: number = 10;
    private halt: boolean = false;
    private ival: number = 0;
    private interpreter: Interpreter | null = null;

    constructor(write: (x: string) => void, display: DisplayEngine) {
        this.writeFn = write;
        this.display = display;
    }

    public handleKeyDown(e: KeyboardEvent) {
        this.display.keyFn(e.code);
    }

    public stop() {
        this.halt = true;
        if (this.interpreter) {
            this.interpreter.stop();
        }
        clearInterval(this.ival);
    }

    public running(): boolean {
        return !this.halt;
    }

    public async run(ctx: CanvasCtx, prog: string) {
        this.halt = false;

        const builtins = this.getBuiltins(this.writeFn);

        const p = new Parser(prog);
        const res = p.parse();
        if (res.err) {
            alert(res.err);
            return;
        }
        const ast = res.ast!;
        const i = new Interpreter(builtins);
        this.interpreter = i;
        this.ival = window.setInterval(() => this.display.draw(ctx), this.frameGap);
        try {
            await i.interpret(ast);
        } catch (e) {
            if (e instanceof RuntimeError) {
                alert(e.msg);
            } else {
                throw e;
            }
        } finally {
            this.stop();
            this.display.draw(ctx);
        }
    }

    private getBuiltins(write: (msg: string) => void): Array<[string[], Value]> {

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
            [
                ["coladh"],
                {
                    ainm: "coladh",
                    arity: () => 1,
                    call: (args: Value[]): Promise<Value> => {
                        return new Promise<null>((r) => {
                            setTimeout(() => r(), Asserts.assertNumber(args[0]));
                        });
                    },
                },
            ],
            [
                ["méarchlár", "méarchlar", "mearchlár", "mearchlar"],
                {
                    ainm: "méarchlár",
                    arity: () => 1,
                    call: (args: Value[]): Promise<Value> => {
                        const f = Asserts.assertCallable(args[0]);
                        this.display.registerKeyHandler((code: string) => {
                            return callFunc(f, [code]).catch((err) => {
                                if (err !== STOP) {
                                    return Promise.reject(err);
                                }
                            });
                        });
                        return Promise.resolve(null);
                    },
                },
            ],
        ];
        return builtins;
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
