import * as Asserts from "../setanta/src/asserts";
import { RuntimeError } from "../setanta/src/error";
import { Parser } from "../setanta/src/gen_parser";
import { Interpreter, STOP } from "../setanta/src/i10r";
import { callFunc, goLitreacha, ObjWrap, Value } from "../setanta/src/values";
import { DisplayEngine } from "./engine";

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
