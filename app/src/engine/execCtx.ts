import * as Asserts from "../setanta/src/asserts";
import { RuntimeError } from "../setanta/src/error";
import { Parser } from "../setanta/src/gen_parser";
import { Interpreter, STOP } from "../setanta/src/i10r";
import { callFunc, goLitreacha, ObjWrap, Value } from "../setanta/src/values";
import { DisplayEngine } from "./engine";

export class ExecCtx {
    private writeFn: (x: string) => void;
    private display: DisplayEngine;
    private halt: boolean = true;
    private interpreter: Interpreter | null = null;
    private currentWriteWait: ((s: string) => void) | null = null;

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

    public write(s: string) {
        if (this.currentWriteWait) {
            this.currentWriteWait(s);
            this.currentWriteWait = null;
        }
    }

    public async run(prog: string) {
        const builtins = this.getBuiltins();

        const p = new Parser(prog);
        const res = p.parse();
        if (res.err) {
            return res.err;
        }
        const ast = res.ast!;
        const i = new Interpreter(builtins);
        this.interpreter = i;
        this.halt = false;
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
                ["scríobh", "scriobh"],
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
                ["ceist"],
                {
                    ainm: "ceist",
                    arity: () => 1,
                    call: (args: Value[]): Promise<Value> => {
                        this.writeFn(goLitreacha(args[0]));
                        return new Promise((r) => {
                            this.currentWriteWait = r;
                        });
                    },
                },
            ],
            [
                ["léigh", "leigh"],
                {
                    ainm: "léigh",
                    arity: () => 0,
                    call: (args): Promise<Value> => {
                        return new Promise((r) => {
                            this.currentWriteWait = r;
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
                    ["lthd",
                        {
                            ainm: "lthd",
                            arity: () => 1,
                            call: (args: Value[]) => this.display.changeWidth(args),
                        },
                    ],
                    ["dron",
                        {
                            ainm: "dron",
                            arity: () => 4,
                            call: (args: Value[]) => this.display.drawRect(args),
                        },
                    ],
                    ["líne",
                        {
                            ainm: "líne",
                            arity: () => 4,
                            call: (args: Value[]) => this.display.drawLineSeg(args),
                        },
                    ],
                    ["ciorcalLán",
                        {
                            ainm: "líne",
                            arity: () => 3,
                            call: (args: Value[]) => this.display.drawFullCirc(args),
                        },
                    ],
                    ["cruth",
                        {
                            ainm: "cruth",
                            arity: () => 1,
                            call: (args: Value[]) => this.display.drawShape(args),
                        },
                    ],
                    ["cruthLán",
                        {
                            ainm: "cruthLán",
                            arity: () => 1,
                            call: (args: Value[]) => this.display.drawShapeFull(args),
                        },
                    ],
                    ["ciorcal",
                        {
                            ainm: "líne",
                            arity: () => 3,
                            call: (args: Value[]) => this.display.drawCirc(args),
                        },
                    ],
                    ["glan",
                        {
                            ainm: "glan",
                            arity: () => 0,
                            call: (args: Value[]) => this.display.clear(args),
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
