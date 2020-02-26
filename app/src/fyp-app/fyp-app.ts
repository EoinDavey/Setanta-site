import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import { TextMarker } from "codemirror";
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
                display: flex;
                align-items: center;
            }
            #top-bar h1 {
                display: inline-block;
                margin-top: 0;
                margin-bottom: 0;
                margin-left: 10px;
            }
            #buttons-left {
                display: inline-block;
                border-left: 2px solid var(--theme-divider);
                margin-left: 10px;
            }
            #buttons-right {
                margin-left: auto;
            }
            #code-link {
                background-color: var(--theme-accent);
                float:right;
            }
            #top-bar a {
                color: white;
                text-decoration: none;
            }
            #cabhair paper-button {
                background-color: var(--theme-accent);
            }
            #container {
                display: grid;
                grid-template-columns: minmax(0,1fr) minmax(0,1fr);
                grid-template-rows: minmax(0,1fr) minmax(0,1fr);
                grid-column-gap: 2vh;
                grid-row-gap: 2vw;
                height: 80vh;
                margin-left: 10px;
            }
            #editor-card {
                grid-column-start: 2;
                grid-row-start: span 2;
            }
            #console {
                height: 100%;
            }
            #console-card {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 2;
            }
            #stage-card {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 1;
            }
            #stage {
                width: 100%;
                height: 100%;
            }
            .card-content {
                width: 100%;
                height: 100%;
                padding: 0px;
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
    @property({type: String}) public content = "";

    public activeCtx: ExecCtx | null = null;

    private marks: TextMarker[] = [];

    public render(): TemplateResult {
        return html`
        <div id='top-bar'>
            <img src="assets/logo50x50.png"/>
            <h1>${this.title}</h1>
            <div id="buttons-left">
                <paper-icon-button id="run-button" icon="av:play-circle-filled" @click="${this.runCode}">Run Code</paper-icon-button>
                <paper-icon-button id="stop-button" icon="av:stop" @click="${this.stopCode}">Stop Code</paper-icon-button>
                <paper-icon-button icon="icons:save" @click="${this.saveCode}" raised>
                Sábháil
                </paper-icon-button>
            </div>
            <div id="buttons-right">
                <a href="http://docs.try-setanta.ie" id="cabhair"><paper-button raised>
                <iron-icon icon="icons:help"></iron-icon>
                Cabhair
                </paper-button></a>
                <a href="https://github.com/EoinDavey/Setanta"><paper-button id="code-link" raised>
                <img src="assets/github.png">
                Féach ar an gcód
                </paper-button></a>
            </div>
        </div>
        <div id='container'>
            <paper-card id="stage-card">
                <div class="card-content">
                    <canvas id='stage' width="1000" height="750" tabindex="0" @keydown="${this.handleKeyDown}"></canvas>
                </div>
            </paper-card>
            <paper-card id="editor-card">
                <div class="card-content">
                    <fyp-editor startContent="${this.content}" id="editor" @fyp-run="${this.runCode}"></fyp-editor>
                </div>
            </paper-card>
            <paper-card id="console-card">
                <div class="card-content">
                    <fyp-console id="console" @setanta-console-enter="${this.consoleWrite}"></fyp-console>
                </div>
            </paper-card>
        </div>
    `;
    }

    public clearMarks() {
        this.marks.forEach((mark) => mark.clear());
        this.marks = [];
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

    public async runCode(e: Event) {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        this.fixCanvas();
        this.clearMarks();
        const ctx = this.stage.getContext("2d");
        if (ctx === null) {
            throw new Error("Canvas not supported"); // TODO → Gaeilge
        }

        const program = this.editor.content;

        const engine = new DisplayEngine(this.stage.width, this.stage.height, ctx);

        const write = (msg: string) => this.console.writeOut(msg);

        const exec = new ExecCtx(write, engine);

        this.activeCtx = exec;

        const err = await exec.run(program);
        if (err) {
            const line = err.pos.line;
            const ch = err.pos.offset;
            console.log(line, ch);
            if (this.editor.editor) {
                const mrk = this.editor.editor.markText({line: line - 1, ch: ch - 1}, {line: line - 1, ch}, {className: "syntax-error"});
                this.marks.push(mrk);
            }
            alert(`Eisceacht ar líne ${line}: Ag súil le: ${err.expmatches}`);
        }
    }

    public async saveCode(e: Event) {
        const program = this.editor.content;
        const data = {
            content: program,
        };
        const url = "/store";
        const resp = await fetch(url, {
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
        const text = await resp.text();
        if (resp.ok) {
            window.history.pushState({code: text}, text, "/" + text);
        } else {
            alert(text);
        }
    }

    private consoleWrite(e: CustomEvent) {
        const inp = e.detail.value;
        if (this.activeCtx) {
            this.activeCtx.write(inp);
        }
    }

    private fixCanvas(): void {
        const cw = this.stage.clientWidth;
        const ch = this.stage.clientHeight;
        const fac = 750;
        this.stage.height = fac;
        this.stage.width = Math.floor(fac * (cw / ch));
    }
}
