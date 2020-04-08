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
            #buttons-right paper-button:hover {
                background-color: var(--theme-primary-dark);
            }
            #top-bar a {
                color: white;
                text-decoration: none;
            }
            #container {
                display: grid;
                grid-template-columns: minmax(0,3fr) minmax(0,4fr);
                grid-template-rows: minmax(0,1fr) minmax(0, 1fr);
                grid-column-gap: 2vh;
                grid-row-gap: 1vw;
                height: 80vh;
                margin-left: 10px;
                grid-template-areas:
                    'stage editor'
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
                #top-bar {
                    flex-direction: column;
                }
                #container paper-card {
                    margin-bottom: 10px;
                }
                #editor-card {
                    order: 1;
                    height: 250px;
                    --fullscreen-button-display: block;
                }
                #stage-card { order: 2; }
                #console-card {
                    order: 3;
                    height: 250px;
                }
                #buttons-right {
                    justify-content: center;
                }
                #buttons-right a {
                    margin-top: 5px;
                }
                #container {
                    display: flex;
                    flex-direction: column;
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

    @property({type: Boolean, attribute: false})private running: boolean = false;

    public render(): TemplateResult {
        return html`
        <div id='top-bar'>
            <h1>
                <a href="/"> ${this.title} </a>
            </h1>
            <div id="buttons-right">
                <a href="https://docs.try-setanta.ie" id="cabhair"><paper-button>
                    <iron-icon icon="icons:help"></iron-icon>
                    Foghlaim
                </paper-button></a>
                <a href="https://docs.try-setanta.ie/samplaí"><paper-button>
                    <span style="height: 24px"></span>Samplaí
                </paper-button></a>
                <a href="https://github.com/EoinDavey/Setanta"><paper-button id="code-link">
                    <img src="/assets/github.png"/>
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
                    <fyp-editor startcontent="${this.content}" id="editor"
                    @fyp-stop="${this.stopCode}" @fyp-run="${this.runCode}"
                    @fyp-save="${this.saveCode}" ?running=${this.running}
                    @fyp-fullscreen-start="${this.startInFullscreen}"
                    </fyp-editor>
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

        this.running = true;
        const err = await exec.run(program);
        this.running = false;
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
            window.history.pushState({code: text}, text, "/editor/" + text);
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

    private async startInFullscreen(e: Event) {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        await this.shadowRoot!.getElementById("stage-card")!.requestFullscreen();
        await this.runCode(e);
    }
}
