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
                [["dronLán"], // DEPRECATED
                    {
                        ainm: "dronLán",
                        arity: () => 4,
                        call: (args: Value[]) => display.drawFullRect(args),
                    },
                ],
                [["dron_lán"],
                    {
                        ainm: "dron_lán",
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
                [["ciorcalLán", "ciorcalLan"], // DEPRECATED
                    {
                        ainm: "ciorcalLán",
                        arity: () => 3,
                        call: (args: Value[]) => display.drawFullCirc(args),
                    },
                ],
                [["ciorcal_lán", "ciorcal_lan"],
                    {
                        ainm: "ciorcal_lán",
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
                [["cruthLán", "cruthLan"], // DEPRECATED
                    {
                        ainm: "cruthLán",
                        arity: () => 1,
                        call: (args: Value[]) => display.drawShapeFull(args),
                    },
                ],
                [["cruth_lán", "cruth_lan"],
                    {
                        ainm: "cruth_lán",
                        arity: () => 1,
                        call: (args: Value[]) => display.drawShapeFull(args),
                    },
                ],
                [["píosaCiorcal", "piosaCiorcal"], // DEPRECATED
                    {
                        ainm: "píosaCiorcal",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArc(args),
                    },
                ],
                [["píosa_ciorcal", "piosa_ciorcal"],
                    {
                        ainm: "píosa_ciorcal",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArc(args),
                    },
                ],
                [["píosaCiorcalLán", "piosaCiorcalLan"], // DEPRECATED
                    {
                        ainm: "píosaCiorcalLán",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArcFull(args),
                    },
                ],
                [["píosa_ciorcal_lán", "píosa_ciorcal_lan", "piosa_ciorcal_lán", "piosa_ciorcal_lan"],
                    {
                        ainm: "píosa_ciorcal_lán",
                        arity: () => 6,
                        call: (args: Value[]) => display.drawArcFull(args),
                    },
                ],
                [["glanDron"], // DEPRECATED
                    {
                        ainm: "glanDron",
                        arity: () => 4,
                        call: (args: Value[]) => display.clearRect(args),
                    },
                ],
                [["glan_dron"],
                    {
                        ainm: "glan_dron",
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
                // MOUSE DOWN event handler
                [["luch"],
                    {
                        ainm: "luch",
                        arity: () => 1,
                        call: (args: Value[]) => display.registerMouseDownHandler(args),
                    },
                ],
                // MOUSE UP event handler
                [["luch_suas"],
                    {
                        ainm: "luch_suas",
                        arity: () => 1,
                        call: (args: Value[]) => display.registerMouseUpHandler(args),
                    },
                ],
                // MOUSE MOVE event handler
                [["luch_bog"],
                    {
                        ainm: "luch_bog",
                        arity: () => 1,
                        call: (args: Value[]) => display.registerMouseMoveHandler(args),
                    },
                ],
                // KEY DOWN event handler
                [["méarchlár", "méarchlar", "mearchlár", "mearchlar"],
                    {
                        ainm: "méarchlár",
                        arity: () => 1,
                        call: (args: Value[]) => display.registerKeyDownHandler(args),
                    },
                ],
                // KEY UP event handler
                [["méarchlár_suas", "méarchlar_suas", "mearchlár_suas", "mearchlar_suas"],
                    {
                        ainm: "méarchlár_suas",
                        arity: () => 1,
                        call: (args: Value[]) => display.registerKeyUpHandler(args),
                    },
                ],
            ]),
        ],
        [
            // DEPRECATED
            ["méarchlár", "méarchlar", "mearchlár", "mearchlar"],
            {
                ainm: "méarchlár",
                arity: () => 1,
                call: (args: Value[]) => display.registerKeyDownHandler(args),
            },
        ],
    ];
}
