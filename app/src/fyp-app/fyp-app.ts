import "@polymer/iron-icons/av-icons.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "../console/console";
import { FYPConsole } from "../console/console";
import "../editor/editor";
import { FYPEditor } from "../editor/editor";
import { DisplayEngine } from "../engine/engine";
import { ExecCtx } from "../engine/execCtx";

@customElement("fyp-app")
class FypApp extends LitElement {

    static get styles() {
        return css`
            #top-bar paper-icon-button {
                color: var(--theme-accent);
                height: 50pt;
                width: 50pt;
            }
            #top-bar {
                background-color: var(--theme-primary);
                color: white;
                top: 0;
                margin-bottom: 10px;
                padding: 20px;
            }
            #top-bar h1 {
                display: inline-block;
                margin-top: 0;
            }
            #container {
                display: grid;
                grid-template-columns: minmax(0,1fr) minmax(0,1fr);
                grid-template-rows: minmax(0,1fr) minmax(0,1fr);
                grid-column-gap: 2vh;
                grid-row-gap: 2vw;
                height: 80vh;
            }
            #editor {
                grid-column-start: 2;
                grid-row-start: span 2;
            }
            #console {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 2;
                overflow: auto;
                outline: 1px solid black;
            }
            #stage {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 1;
                width: 100%;
                height: 100%;
                outline: thin inset #aaaaaa;
            }
            #buttons {
                display: inline-block;
                border-left: 2px solid var(--theme-divider);
                margin-left: 10px;
            }
            #code-link {
                background-color: var(--theme-accent);
                float:right;
            }
            #top-bar a {
                color: white;
            }
        `;
    }

    get stage(): HTMLCanvasElement {
        return this.shadowRoot!.getElementById("stage")! as HTMLCanvasElement;
    }

    get editor(): FYPEditor {
        return this.shadowRoot!.getElementById("editor")! as FYPEditor;
    }

    get console(): FYPConsole {
        return this.shadowRoot!.getElementById("console")! as FYPConsole;
    }
    @property({type: String}) public title = "Setanta";

    public activeCtx: ExecCtx | null = null;

    public render(): TemplateResult {
        return html`
        <div id='top-bar'>
            <h1>${this.title}</h1>
            <div id="buttons">
                <paper-icon-button id="run-button" icon="av:play-circle-filled" @click="${this.runCode}">Run Code</paper-icon-button>
                <paper-icon-button id="stop-button" icon="av:stop" @click="${this.stopCode}">Stop Code</paper-icon-button>
            </div>
            <a href="https://github.com/EoinDavey/Setanta"> <paper-button id="code-link" raised>Féach ar an gcód</paper-button></a>
        </div>
        <div id='container'>
            <canvas id='stage' width="1000" height="750" tabindex="0" @keydown="${this.handleKeyDown}"></canvas>
            <fyp-editor id="editor" @fyp-run="${this.runCode}"></fyp-editor>
            <fyp-console id="console"></fyp-console>
        </div>
    `;
    }

    public stopCode(e: Event) {
        if (this.activeCtx) {
            this.activeCtx.stop();
        }
    }

    public handleKeyDown(e: KeyboardEvent) {
        if (this.activeCtx) {
            this.activeCtx.handleKeyDown(e);
        }
    }

    public runCode(e: Event) {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        this.fixCanvas();
        const ctx = this.stage.getContext("2d");
        if (ctx === null) {
            throw new Error("Canvas not supported"); // TODO → Gaeilge
        }

        const program = this.editor.content;

        const engine = new DisplayEngine(this.stage.width, this.stage.height, ctx);

        const write = (msg: string) => this.console.writeOut(msg);

        const exec = new ExecCtx(write, engine);

        this.activeCtx = exec;

        return exec.run(program);
    }

    private fixCanvas(): void {
        const cw = this.stage.clientWidth;
        const ch = this.stage.clientHeight;
        const fac = 750;
        this.stage.height = fac;
        this.stage.width = Math.floor(fac * (cw / ch));
    }
}
