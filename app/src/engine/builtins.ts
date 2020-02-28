import * as Asserts from "../setanta/src/asserts";
import { STOP } from "../setanta/src/i10r";
import { callFunc, goLitreacha, ObjWrap, Value } from "../setanta/src/values";
import { DisplayEngine } from "./engine";

export function genBuiltins(display: DisplayEngine, writeFn: (s: string) => void,
                            setWriteWait: (fn: (s: string) => void) => void): Array<[string[], Value]> {
    const builtins: Array<[string[], Value]> = [
        [
            ["scríobh", "scriobh"],
            {
                ainm: "scríobh",
                arity: () => -1,
                call: (args): Promise<Value> => {
                    return new Promise<null>((r) => {
                        writeFn(args.map(goLitreacha).join(" "));
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
                    writeFn(goLitreacha(args[0]));
                    return new Promise((r) => {
                        setWriteWait(r);
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
                        setWriteWait(r);
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
                [["líne", "line"],
                    {
                        ainm: "líne",
                        arity: () => 4,
                        call: (args: Value[]) => display.drawLineSeg(args),
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
                [["ciorcal"],
                    {
                        ainm: "líne",
                        arity: () => 3,
                        call: (args: Value[]) => display.drawCirc(args),
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
    ];
    return builtins;
}
