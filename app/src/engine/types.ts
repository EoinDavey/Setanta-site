export type CanvasCtx  = CanvasRenderingContext2D;
export type Pos = [number, number];
export interface Stage {
    draw(ctx: CanvasCtx): void;
}
