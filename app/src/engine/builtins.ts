import * as Asserts from "setanta/node_build/asserts";
import { STOP } from "setanta/node_build/consts";
import { callFunc, goTéacs, ObjIntfWrap, Value } from "setanta/node_build/values";
import { Context } from "setanta/node_build/ctx";
import { DisplayEngine } from "./engine";

function readPromise(ctx: Context,
    setWriteWait: (fn: (s: string)=>void) => void): Promise<string|null> {
    return new Promise((acc, rej) => {
        ctx.addRejectFn(rej);
        setWriteWait((s: string) => {
            ctx.removeRejectFn(rej);
            acc(s)
        });
    });
}

export function genBuiltins(display: DisplayEngine, writeFn: (s: string) => void,
    setWriteWait: (fn: (s: string) => void) => void): (ctx: Context) => [string[], Value][] {
        return (ctx: Context) => [
        [
            ["scríobh", "scriobh"],
            {
                ainm: "scríobh",
                arity: () => -1,
                call: (args): Promise<Value> => {
                    return new Promise<null>((r) => {
                        writeFn(args.map(goTéacs).join(" "));
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
                    writeFn(goTéacs(args[0]));
                    return readPromise(ctx, setWriteWait);
                },
            },
        ],
        [
            ["léigh", "leigh"],
            {
                ainm: "léigh",
                arity: () => 0,
                call: (args): Promise<Value> => {
                    return readPromise(ctx, setWriteWait);
                },
            },
        ],
        [
            ["stáitse", "staitse"],
            new ObjIntfWrap("stáitse", [
                [["fadX"], display.sizeX],
                [["fadY"], display.sizeY],
                [["dath"],
                    {
                        ainm: "dath",
                        arity: () => 1,
                        call: (args: Value[]) => display.changeColour(args),
                    },
                ],
                [["lthd"],
                    {
                        ainm: "lthd",
                        arity: () => 1,
                        call: (args: Value[]) => display.changeWidth(args),
                    },
                ],
                [["dron"],
                    {
                        ainm: "dron",
                        arity: () => 4,
                        call: (args: Value[]) => display.drawRect(args),
                    },
                ],
                [["dronLán"],
                    {
                        ainm: "dronLán",
                        arity: () => 4,
                        call: (args: Value[]) => display.drawFullRect(args),
                    },
                ],
                [["líne", "line"],
                    {
                        ainm: "líne",
                        arity: () => 4,
                        call: (args: Value[]) => display.drawLineSeg(args),
                    },
                ],
                [["ciorcal"],
                    {
                        ainm: "ciorcal",
                        arity: () => 3,
                        call: (args: Value[]) => display.drawCirc(args),
                    },
                ],
                [["ciorcalLán", "ciorcalLan"],
                    {
                        ainm: "líne",
                        arity: () => 3,
                        call: (args: Value[]) => display.drawFullCirc(args),
                    },
                ],
                [["cruth"],
                    {
                        ainm: "cruth",
                        arity: () => 1,
                        call: (args: Value[]) => display.drawShape(args),
                    },
                ],
                [["cruthLán", "cruthLan"],
                    {
                        ainm: "cruthLán",
                        arity: () => 1,
                        call: (args: Value[]) => display.drawShapeFull(args),
                    },
                ],
                [["píosaCiorcal", "piosaCiorcal"],
                    {
                        ainm: "píosaCiorcal",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArc(args),
                    },
                ],
                [["píosaCiorcalLán", "piosaCiorcalLan"],
                    {
                        ainm: "píosaCiorcalLán",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArcFull(args),
                    },
                ],
                [["glanDron"],
                    {
                        ainm: "glanDron",
                        arity: () => 4,
                        call: (args: Value[]) => display.clearRect(args),
                    },
                ],
                [["glan"],
                    {
                        ainm: "glan",
                        arity: () => 0,
                        call: (args: Value[]) => display.clear(args),
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
                    display.registerKeyHandler((code: string) => {
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
        [
            ["luch_síos", "luch_sios"],
            {
                ainm: "luch_síos",
                arity: () => 1,
                call: (args: Value[]): Promise<Value> => {
                    const f = Asserts.assertCallable(args[0]);
                    display.registerMouseDownHandler((x: number, y: number) => {
                        return callFunc(f, [x, y]).catch((err) => {
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
}
