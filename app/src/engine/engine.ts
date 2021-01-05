import * as Asserts from "setanta/node_build/asserts";
import { Value, callFunc } from "setanta/node_build/values";
import { CanvasCtx } from "./types";
import { STOP } from "setanta/node_build/consts";

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

    public get sizeX(): number {
        return this.sizeXHidden;
    }

    public get sizeY(): number {
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

    public keyDownFn: (code: string) => Promise<Value> = () => Promise.resolve(null);
    public keyUpFn: (code: string) => Promise<Value> = () => Promise.resolve(null);
    public mouseUpFn: (x: number, y: number) => Promise<Value> = () => Promise.resolve(null);
    public mouseDownFn: (x: number, y: number) => Promise<Value> = () => Promise.resolve(null);
    public mouseMoveFn: (x: number, y: number) => Promise<Value> = () => Promise.resolve(null);

    // arity: 1; f: (string) => null;
    public registerKeyDownHandler([f]: Value[]): Promise<Value> {
        Asserts.assertCallable(f);
        const fn = (code: string) => {
            return callFunc(f, [code])
                .catch(err => err !== STOP
                    ? Promise.reject(err)
                    : Promise.resolve(null));
        };
        this.keyDownFn = fn;
        return Promise.resolve(null);
    }

    // arity: 1; f: (string) => null;
    public registerKeyUpHandler([f]: Value[]): Promise<Value> {
        Asserts.assertCallable(f);
        const fn = (code: string) => {
            return callFunc(f, [code])
                .catch(err => err !== STOP
                    ? Promise.reject(err)
                    : Promise.resolve(null));
        };
        this.keyUpFn = fn;
        return Promise.resolve(null);
    }

    // arity: 1; f: (number, number) => null;
    public registerMouseDownHandler([f]: Value[]): Promise<null> {
        Asserts.assertCallable(f);
        const fn = (x: number, y: number) => {
            return callFunc(f, [x, y])
                .catch(err => err !== STOP
                    ? Promise.reject(err)
                    : Promise.resolve(null));
        };
        this.mouseDownFn = fn;
        return Promise.resolve(null);
    }

    // arity: 1; f: (number, number) => null;
    public registerMouseUpHandler([f]: Value[]): Promise<null> {
        Asserts.assertCallable(f);
        const fn = (x: number, y: number) => {
            return callFunc(f, [x, y])
                .catch(err => err !== STOP
                    ? Promise.reject(err)
                    : Promise.resolve(null));
        };
        this.mouseUpFn = fn;
        return Promise.resolve(null);
    }

    // arity: 1; f: (number, number) => null;
    public registerMouseMoveHandler([f]: Value[]): Promise<null> {
        Asserts.assertCallable(f);
        const fn = (x: number, y: number) => {
            return callFunc(f, [x, y])
                .catch(err => err !== STOP
                    ? Promise.reject(err)
                    : Promise.resolve(null));
        };
        this.mouseMoveFn = fn;
        return Promise.resolve(null);
    }

    // arity: 1; s: string
    // changes fill stye colour
    public changeColour([s]: Value[]): Promise<Value> {
        Asserts.assertTéacs(s);
        const col = colourMap.get(s) || s;
        this.ctx.fillStyle = col;
        this.ctx.strokeStyle = col;
        return Promise.resolve(null);
    }

    // arity: 1; wth: number
    // change line width to wth
    public changeWidth([wth]: Value[]): Promise<Value> {
        Asserts.assertNumber(wth);
        this.ctx.lineWidth = wth;
        return Promise.resolve(null);
    }

    // arity: 4; x1: number, y1: number, x2: number, y2: number
    // draws rectangle at position (x1, y1) with width x2 and height y2
    public drawRect([x1, y1, x2, y2]: Value[]): Promise<Value> {
        Asserts.assertNumber(x1);
        Asserts.assertNumber(y1);
        Asserts.assertNumber(x2);
        Asserts.assertNumber(y2);
        this.ctx.strokeRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }

    // arity: 4; x1: number, y1: number, x2: number, y2: number
    // draws rectangle at position (x1, y1) with width x2 and height y2
    public drawFullRect([x1, y1, x2, y2]: Value[]): Promise<Value> {
        Asserts.assertNumber(x1);
        Asserts.assertNumber(y1);
        Asserts.assertNumber(x2);
        Asserts.assertNumber(y2);
        this.ctx.fillRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }

    // arity: 4; x1: number, y1: number, x2: number, y2: number
    // draws a line segment from (x1, y1) to (x2, y2)
    public drawLineSeg([x1, y1, x2, y2]: Value[]): Promise<Value> {
        Asserts.assertNumber(x1);
        Asserts.assertNumber(y1);
        Asserts.assertNumber(x2);
        Asserts.assertNumber(y2);
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: ; x: number, y: number, r: number
    public drawFullCirc([x, y, r]: Value[]): Promise<Value> {
        Asserts.assertNumber(x);
        Asserts.assertNumber(y);
        Asserts.assertNumber(r);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 3; x: number, y: number, r: number
    public drawCirc([x, y, r]: Value[]): Promise<Value> {
        Asserts.assertNumber(x);
        Asserts.assertNumber(y);
        Asserts.assertNumber(r);
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 1, pts: list
    // Draws the shape given by the points in order in the list.
    public drawShape([pts]: Value[]): Promise<Value> {
        Asserts.assertLiosta(pts);
        this.drawShapePath(pts);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 1, pts: list
    // Draws the shape given by the points in order in the list.
    // Fills in internal area
    public drawShapeFull([pts]: Value[]): Promise<Value> {
        Asserts.assertLiosta(pts);
        this.drawShapePath(pts);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 6; x, y, rad, startAngle, endAngle, clockwise: number
    // Draws a filled in arc
    public drawArcFull(args: Value[]): Promise<Value> {
        this.ctx.beginPath();
        this.arcPath(args);
        this.ctx.fill();
        return Promise.resolve(null);
    }

    // arity: 6; x, y, rad, startAngle, endAngle, clockwise: number
    // Draws an arc
    public drawArc(args: Value[]): Promise<Value> {
        this.ctx.beginPath();
        this.arcPath(args);
        this.ctx.stroke();
        return Promise.resolve(null);
    }

    // arity: 4; x1: number, y1: number, x2: number, y2: number
    // clears rectangle at position (x1, y1) with width x2 and height y2
    public clearRect([x1, y1, x2, y2]: Value[]): Promise<Value> {
        Asserts.assertNumber(x1);
        Asserts.assertNumber(y1);
        Asserts.assertNumber(x2);
        Asserts.assertNumber(y2);
        this.ctx.clearRect(x1, y1, x2, y2);
        return Promise.resolve(null);
    }

    // arity: 0;
    // clears the display
    public clear(): Promise<Value> {
        this.ctx.clearRect(0, 0, this.sizeXHidden, this.sizeYHidden);
        return Promise.resolve(null);
    }

    private arcPath([x, y, radius, start, end, clockwise]: Value[]): Promise<Value> {
        Asserts.assertNumber(x);
        Asserts.assertNumber(y);
        Asserts.assertNumber(radius);
        Asserts.assertNumber(start);
        Asserts.assertNumber(end);
        Asserts.assertBool(clockwise);
        this.ctx.arc(x, y, radius, start, end, clockwise);
        return Promise.resolve(null);
    }

    private drawShapePath(pts: Value[]) {
        this.ctx.beginPath();
        for (const pt of pts) {
            Asserts.assertLiosta(pt);
            const [x, y] = pt;
            Asserts.assertNumber(x);
            Asserts.assertNumber(y);
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
    }
}
