import { FYPConsole } from "../console/console";
import { FYPEditor } from "../editor/editor";
import { TextMarker } from "codemirror";
import { ExecCtx } from "../engine/execCtx";
import { DisplayEngine } from "../engine/engine";
import { RuntimeError, StaticError } from "setanta/node_build/error";
import { LitElement } from "lit-element";

// RuntimeComponent is an abstract class that implements the core runtime
// logic regarding starting and stopping code execution. Inheriting classes
// need to implement getters for the stage, editor and console, as well as
// creating a running property.
// We inherit from LitElement mostly due to TypeScript only supporting single
// inheritance, and I don't want to mess around with mixins as they're not very
// well typed.
export abstract class RuntimeComponent extends LitElement {
    protected abstract stage: HTMLCanvasElement;
    protected abstract editor: FYPEditor;
    protected abstract console: FYPConsole;
    protected abstract running: boolean = false;

    protected activeCtx: ExecCtx | null = null;
    protected marks: TextMarker[] = [];

    protected consoleWrite(e: CustomEvent): void {
        const inp = e.detail.value;
        if (this.activeCtx) {
            this.activeCtx.write(inp);
        }
    }

    protected fixCanvas(): void {
        const cw = this.stage.clientWidth;
        const ch = this.stage.clientHeight;
        const fac = 750;
        this.stage.height = fac;
        this.stage.width = Math.floor(fac * (cw / ch));
    }

    protected clearMarks(): void {
        this.marks.forEach((mark) => mark.clear());
        this.marks = [];
    }

    protected async runCode(): Promise<void> {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        this.fixCanvas();
        this.clearMarks();
        const ctx = this.stage.getContext("2d");
        if (ctx === null) {
            throw new Error("Ní féidir linn an stáitse a thosnú, bain triail as brabhsálí eile");
        }
        ctx.lineWidth = 10;  // Start with line width 10

        const program = this.editor.content;

        const engine = new DisplayEngine(this.stage.width, this.stage.height, ctx);

        const write = (msg: string) => {
            this.console.writeOut(msg).then(() => this.console.scrollDown());
        };

        const exec = new ExecCtx(write, engine);

        this.activeCtx = exec;

        this.stage.focus();

        this.running = true;
        try {
            const errs = await exec.run(program);
            for(const err of errs) {
                const line = err.pos.line;
                const ch = err.pos.offset;
                if (this.editor.editor) {
                    const mrk = this.editor.editor.markText(
                        {line: line - 1, ch: ch - 1},
                        {line: line - 1, ch},
                        {className: "syntax-error"});
                    this.marks.push(mrk);
                }
                this.console.writeSyntaxErr(err);
            }
        } catch(e) {
            this.displayRuntimeError(e);
        } finally {
            this.running = false;
        }
    }

    protected displayRuntimeError(e: Error): void {
        if((e instanceof RuntimeError || e instanceof StaticError)
            && e.start && e.end && this.editor.editor){

            const mrk = this.editor.editor.markText(
                {
                    line: e.start.line - 1,
                    ch: e.start.offset,
                },
                {
                    line: e.end.line - 1,
                    ch: e.end.offset,
                },
                {className: "syntax-error"},
            );
            this.marks.push(mrk);
        }
        this.console.writeError(e);

        // TODO this shouldn't be here: doesn't belong
        if(this.activeCtx)
            this.activeCtx.stop();
    }

    protected handleKeyDown(e: KeyboardEvent): void {
        if (this.activeCtx) {
            this.activeCtx.handleKeyDown(e)
                .catch(err => this.displayRuntimeError(err));
            e.preventDefault();
        }
    }

    protected handleKeyUp(e: KeyboardEvent): void {
        if (this.activeCtx) {
            this.activeCtx.handleKeyUp(e)
                .catch(err => this.displayRuntimeError(err));
            e.preventDefault();
        }
    }

    protected handleMouseDown(e: MouseEvent): void {
        if (this.activeCtx) {
            // We pass in the *relative* positions to the height and width
            // of the stage
            const [x, y] = this.getCanvasRelativeCoords(e);
            this.activeCtx.handleMouseDown(x, y)
                .catch(err => this.displayRuntimeError(err));
            e.preventDefault();
        }
    }

    protected handleMouseUp(e: MouseEvent): void {
        if (this.activeCtx) {
            // We pass in the *relative* positions to the height and width
            // of the stage
            const [x, y] = this.getCanvasRelativeCoords(e);
            this.activeCtx.handleMouseUp(x, y)
                .catch(err => this.displayRuntimeError(err));
            e.preventDefault();
        }
    }

    protected handleMouseMove(e: MouseEvent): void {
        if (this.activeCtx) {
            // We pass in the *relative* positions to the height and width
            // of the stage
            const [x, y] = this.getCanvasRelativeCoords(e);
            this.activeCtx.handleMouseMove(x, y)
                .catch(err => this.displayRuntimeError(err));
            e.preventDefault();
        }
    }

    protected stopCode(): void {
        if (this.activeCtx) {
            this.activeCtx.stop();
        }
    }

    // Get the relative coordinates of the mouse click event on the canvas.
    private getCanvasRelativeCoords(e: MouseEvent): [number, number] {
        const boundRect = this.stage.getBoundingClientRect();
        const h = boundRect.bottom - boundRect.top;
        const w = boundRect.right - boundRect.left;
        const x = (e.clientX - boundRect.left) / w;
        const y = (e.clientY - boundRect.top) / h;
        return [x, y];
    }
}
