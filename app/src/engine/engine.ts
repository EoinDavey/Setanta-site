import * as Asserts from "../setanta/src/asserts";
import { RuntimeError } from "../setanta/src/error";
import { Parser } from "../setanta/src/gen_parser";
import { Interpreter, STOP } from "../setanta/src/i10r";
import { callFunc, goLitreacha, ObjWrap, Value } from "../setanta/src/values";
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
    }

    public running(): boolean {
        return !this.halt;
    }

    public async run(prog: string) {
        this.halt = false;

        const builtins = this.getBuiltins();

        const p = new Parser(prog);
        const res = p.parse();
        if (res.err) {
            alert(res.err);
            return;
        }
        const ast = res.ast!;
        const i = new Interpreter(builtins);
        this.interpreter = i;
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
        }
    }

    private getBuiltins(): Array<[string[], Value]> {

        const builtins: Array<[string[], Value]> = [
            [
                ["scríobh"],
                {
                    ainm: "scríobh",
                    arity: () => -1,
                    call: (args): Promise<Value> => {
                        return new Promise<null>((r) => {
                            this.writeFn(args.map(goLitreacha).join(" "));
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
                ["stáitse", "staitse"],
                new ObjWrap("stáitse", [
                    ["fadX", this.display.sizeX],
                    ["fadY", this.display.sizeY],
                    ["dath",
                        {
                            ainm: "dath",
                            arity: () => 1,
                            call: (args: Value[]) => this.display.changeColour(args),
                        },
                    ],
                    ["dron",
                        {
                            ainm: "dron",
                            arity: () => 4,
                            call: (args: Value[]) => this.display.drawRect(args),
                        },
                    ],
                ]),
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

const colourMap: Map<string, string> = new Map([
    ["ban", "white"],
    ["bandearg", "pink"],
    ["bán", "white"],
    ["bándearg", "pink"],
    ["dearg", "red"],
    ["dubh", "black"],
    ["glas", "green"],
    ["gorm", "blue"],
    ["liath", "gray"],
]);
export class DisplayEngine {
    private sizeXHidden: number;
    private sizeYHidden: number;
    private ctx: CanvasCtx;

    constructor(sizeX: number, sizeY: number, ctx: CanvasCtx) {
        this.sizeXHidden = sizeX;
        this.sizeYHidden = sizeY;
        this.ctx = ctx;
    }

    public get sizeX() {
        return this.sizeXHidden;
    }

    public get sizeY() {
        return this.sizeYHidden;
    }

    public keyFn: (code: string) => void = (s: string) => undefined;

    public registerKeyHandler(fn: (code: string) => void) {
        this.keyFn = fn;
    }

    public changeColour(args: Value[]): Promise<Value> {
        const s: string = Asserts.assertLitreacha(args[0]);
        this.ctx.fillStyle = colourMap.get(s) || s;
        return Promise.resolve(null);
    }

    public drawRect(args: Value[]): Promise<Value> {
        const x1 = Asserts.assertNumber(args[0]);
        const y1 = Asserts.assertNumber(args[1]);
        const x2 = Asserts.assertNumber(args[2]);
        const y2 = Asserts.assertNumber(args[3]);
        this.ctx.fillRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }
}
