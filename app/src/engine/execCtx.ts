import * as Asserts from "setanta/node_build/asserts";
import { RuntimeError } from "setanta/node_build/error";
import { Parser } from "setanta/node_build/gen_parser";
import { Interpreter, STOP } from "setanta/node_build/i10r";
import { callFunc, goLitreacha, ObjWrap, Value } from "setanta/node_build/values";
import { genBuiltins } from "./builtins";
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
        this.display.keyFn(e.key);
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
        const builtins = genBuiltins(this.display, this.writeFn,
            (fn) => { this.currentWriteWait = fn; });

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
        } finally {
            this.stop();
        }
    }
}
