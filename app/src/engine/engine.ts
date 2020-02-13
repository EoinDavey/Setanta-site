import * as Asserts from "../setanta/src/asserts";
import { Value } from "../setanta/src/values";
import { ExecCtx } from "./execCtx";
import { CanvasCtx } from "./types";

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
