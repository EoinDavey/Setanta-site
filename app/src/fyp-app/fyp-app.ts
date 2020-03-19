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
            #top-bar {
                background-color: var(--theme-primary);
                color: white;
                top: 0;
                margin-bottom: 10px;
                padding: 10px;
                display: flex;
                align-items: center;
            }
            #top-bar h1 {
                display: inline-block;
                margin-top: 0;
                margin-bottom: 0;
                margin-left: 10px;
            }
            #buttons-right {
                display: flex;
                flex-wrap: wrap;
                margin-left: auto;
            }
            #buttons-right paper-button {
                background-color: var(--theme-accent);
            }
            #top-bar a {
                color: white;
                text-decoration: none;
            }
            #container {
                display: grid;
                grid-template-columns: minmax(0,3fr) minmax(0,4fr);
                grid-template-rows: minmax(0,4fr) minmax(0, 1fr) minmax(0, 4fr);
                grid-column-gap: 2vh;
                grid-row-gap: 1vw;
                height: 80vh;
                margin-left: 10px;
                grid-template-areas:
                    'stage editor'
                    'buttons editor'
                    'console editor';
            }
            #editor-card {
                grid-area: editor;
            }
            #console {
                height: 100%;
            }
            #console-card {
                grid-area: console;
            }
            #buttons-card {
                grid-area: buttons;
            }
            #buttons-card .card-content {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-evenly;
                height: 100%;
            }
            #buttons-card paper-icon-button {
                color: var(--theme-accent);
                height: 80%;
                width: 15%;
                padding: 0px;
            }
            #buttons-card paper-icon-button:hover {
                color: white;
                background-color: var(--theme-accent);
            }
            #stage-card {
                grid-area: stage;
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
            @media (max-width: 600px) {
                #container {
                    grid-template-areas:
                        'editor'
                        'buttons'
                        'stage'
                        'console';
                    grid-template-columns: minmax(0,1fr);
                    grid-template-rows: minmax(0, 2fr) minmax(0,1fr) minmax(0, 2fr) minmax(0, 2fr);
                    height: auto;
                }
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
            <h1>
                <a href="/"> ${this.title} </a>
            </h1>
            <div id="buttons-right">
                <a href="https://docs.try-setanta.ie" id="cabhair"><paper-button raised>
                    <iron-icon icon="icons:help"></iron-icon>
                    Foghlaim
                </paper-button></a>
                <a href="https://docs.try-setanta.ie/samplaí"><paper-button raised>
                    <span style="height: 24px"></span>Samplaí
                </paper-button></a>
                <a href="https://github.com/EoinDavey/Setanta"><paper-button id="code-link" raised>
                    <img src="assets/github.png"/>
                    Féach ar an gcód
                </paper-button></a>
            </div>
        </div>
        <div id='container'>
            <paper-card id="buttons-card">
                <div class="card-content">
                    <paper-icon-button icon="icons:link" @click="${this.saveCode}">
                    </paper-icon-button>
                    <paper-icon-button icon="av:stop" id="stop-button" @click="${this.stopCode}">
                    </paper-icon-button>
                    <paper-icon-button icon="av:play-circle-filled" id="run-button" @click="${this.runCode}">
                    </paper-icon-button>
                    <paper-icon-button icon="icons:fullscreen" @click="${this.startInFullscreen}">
                    </paper-icon-button>
                    <paper-icon-button icon="icons:clear" @click="${this.consoleClear}">
                    </paper-icon-button>
              </div>
            </paper-card>
            <paper-card id="stage-card">
                <div class="card-content">
                    <canvas id='stage' width="1000" height="750" tabindex="0" @keydown="${this.handleKeyDown}"></canvas>
                </div>
            </paper-card>
            <paper-card id="editor-card">
                <div class="card-content">
                    <fyp-editor startcontent="${this.content}" id="editor" @fyp-run="${this.runCode}"></fyp-editor>
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
        ctx.lineWidth = 10;  // Start with line width 10

        const program = this.editor.content;

        const engine = new DisplayEngine(this.stage.width, this.stage.height, ctx);

        const write = (msg: string) => {
            this.console.writeOut(msg).then(() => this.console.scrollDown());
        };

        const exec = new ExecCtx(write, engine);

        this.activeCtx = exec;

        this.stage.focus();

        const err = await exec.run(program);
        if (err) {
            const line = err.pos.line;
            const ch = err.pos.offset;
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

    private consoleClear(e: Event) {
        this.console.clearHistory();
        const ctx = this.stage.getContext("2d");
        if (ctx === null) {
            return;
        }
        ctx.clearRect(0, 0, this.stage.width, this.stage.height);
    }

    private fixCanvas(): void {
        const cw = this.stage.clientWidth;
        const ch = this.stage.clientHeight;
        const fac = 750;
        this.stage.height = fac;
        this.stage.width = Math.floor(fac * (cw / ch));
    }

    private async startInFullscreen(e: Event) {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        await this.shadowRoot!.getElementById("stage-card")!.requestFullscreen();
        await this.runCode(e);
    }
}
