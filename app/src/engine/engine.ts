import * as Asserts from "setanta/src/asserts";
import { Value } from "setanta/src/values";
import { ExecCtx } from "./execCtx";
import { CanvasCtx } from "./types";

const colourMap: Map<string, string> = new Map([
    ["ban", "white"],
    ["bandearg", "pink"],
    ["bui", "yellow"],
    ["buí", "yellow"],
    ["bán", "white"],
    ["bándearg", "pink"],
    ["corcra", "purple"],
    ["dearg", "red"],
    ["dubh", "black"],
    ["glas", "green"],
    ["gorm", "blue"],
    ["oraiste", "orange"],
    ["oráiste", "orange"],
    ["liath", "gray"],
]);
export class DisplayEngine {

    public get sizeX() {
        return this.sizeXHidden;
    }

    public get sizeY() {
        return this.sizeYHidden;
    }
    private sizeXHidden: number;
    private sizeYHidden: number;
    private ctx: CanvasCtx;

    constructor(sizeX: number, sizeY: number, ctx: CanvasCtx) {
        this.sizeXHidden = sizeX;
        this.sizeYHidden = sizeY;
        this.ctx = ctx;
    }

    public keyFn: (code: string) => void = (s: string) => undefined;

    public registerKeyHandler(fn: (code: string) => void) {
        this.keyFn = fn;
    }

    // arity: 1; args[0]: string
    // changes fill stye colour
    public changeColour(args: Value[]): Promise<Value> {
        const s: string = Asserts.assertLitreacha(args[0]);
        const col = colourMap.get(s) || s;
        this.ctx.fillStyle = col;
        this.ctx.strokeStyle = col;
        return Promise.resolve(null);
    }

    // arity: 1; args[0]: number
    // change line width to args[0]
    public changeWidth(args: Value[]): Promise<Value> {
        const wth = Asserts.assertNumber(args[0]);
        this.ctx.lineWidth = wth;
        return Promise.resolve(null);
    }

    // arity: 4; args[0]: number, args[1]: number, args[2]: number, args[3]: number
    // draws rectangle at position (args[0], args[1]) with width args[2] and height args[3]
    public drawRect(args: Value[]): Promise<Value> {
        const x1 = Asserts.assertNumber(args[0]);
        const y1 = Asserts.assertNumber(args[1]);
        const x2 = Asserts.assertNumber(args[2]);
        const y2 = Asserts.assertNumber(args[3]);
        this.ctx.fillRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }

    // arity: 4; args[0]: number, args[1]: number, args[2]: number, args[3]: number
    // draws a line segment from (args[0], args[1]) to (args[2], args[3])
    public drawLineSeg(args: Value[]): Promise<Value> {
        const x1 = Asserts.assertNumber(args[0]);
        const y1 = Asserts.assertNumber(args[1]);
        const x2 = Asserts.assertNumber(args[2]);
        const y2 = Asserts.assertNumber(args[3]);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: ; args[0]: number, args[1]: number, args[3]: number
    public drawFullCirc(args: Value[]): Promise<Value> {
        const x = Asserts.assertNumber(args[0]);
        const y = Asserts.assertNumber(args[1]);
        const r = Asserts.assertNumber(args[2]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 3; args[0]: number, args[1]: number, args[3]: number
    public drawCirc(args: Value[]): Promise<Value> {
        const x = Asserts.assertNumber(args[0]);
        const y = Asserts.assertNumber(args[1]);
        const r = Asserts.assertNumber(args[2]);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 1, args[0]: list
    // Draws the shape given by the points in order in the list.
    public drawShape(args: Value[]): Promise<Value> {
        const pts = Asserts.assertLiosta(args[0]);
        this.drawShapePath(pts);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 1, args[0]: list
    // Draws the shape given by the points in order in the list.
    // Fills in internal area
    public drawShapeFull(args: Value[]): Promise<Value> {
        const pts = Asserts.assertLiosta(args[0]);
        this.drawShapePath(pts);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 6; args[0-6]: number
    // x, y, rad, startAngle, endAngle, clockwise?
    // Draws a filled in arc
    public drawArcFull(args: Value[]): Promise<Value> {
        this.ctx.beginPath();
        this.arcPath(args);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 6; args[0-6]: number
    // x, y, rad, startAngle, endAngle, clockwise?
    // Draws an arc
    public drawArc(args: Value[]): Promise<Value> {
        this.ctx.beginPath();
        this.arcPath(args);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 4; args[0]: number, args[1]: number, args[2]: number, args[3]: number
    // clears rectangle at position (args[0], args[1]) with width args[2] and height args[3]
    public clearRect(args: Value[]): Promise<Value> {
        const x1 = Asserts.assertNumber(args[0]);
        const y1 = Asserts.assertNumber(args[1]);
        const x2 = Asserts.assertNumber(args[2]);
        const y2 = Asserts.assertNumber(args[3]);
        this.ctx.clearRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }

    // arity: 0;
    // clears the display
    public clear(args: Value[]): Promise<Value> {
        this.ctx.clearRect(0, 0, this.sizeXHidden, this.sizeYHidden);
        return Promise.resolve(null);
    }

    private arcPath(args: Value[]): Promise<Value> {
        const x = Asserts.assertNumber(args[0]);
        const y = Asserts.assertNumber(args[1]);
        const radius = Asserts.assertNumber(args[2]);
        const start = Asserts.assertNumber(args[3]);
        const end = Asserts.assertNumber(args[4]);
        const clockwise = Asserts.assertBool(args[5]);
        this.ctx.arc(x, y, radius, start, end, clockwise);
        return Promise.resolve(null);
    }

    private drawShapePath(pts: Value[]) {
        this.ctx.beginPath();
        for (const i of pts) {
            const pt = Asserts.assertLiosta(i);
            const x = Asserts.assertNumber(pt[0]);
            const y = Asserts.assertNumber(pt[1]);
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
    }
}
