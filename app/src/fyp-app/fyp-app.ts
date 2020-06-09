import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "../console/console";
import { FYPConsole } from "../console/console";
import "../editor/editor";
import { FYPEditor } from "../editor/editor";
import { RuntimeComponent } from "../engine/runtimecomp";

// Add possible vendor prefix fullscreen functions to HTMLElement
declare global {
    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}

@customElement("fyp-app")
class FypApp extends RuntimeComponent {

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
                    min-height: 300px;
                    /* hack for min-height */
                    display: flex;
                    flex-direction: column;
                    --fullscreen-button-display: block;
                }
                #editor-card .card-content {
                    flex-grow: 1;
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
    @property({type: Boolean, attribute: false})public running: boolean = false;

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

    public handleKeyDown(e: KeyboardEvent) {
        if (this.activeCtx) {
            this.activeCtx.handleKeyDown(e);
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

    private async startInFullscreen(e: Event) {
        if (this.activeCtx && this.activeCtx.running()) {
            return;
        }
        const target = this.shadowRoot!.getElementById("stage-card")!;
        if(target.requestFullscreen) {
            await target.requestFullscreen();
        } else if(target.webkitRequestFullscreen) {
            await target.webkitRequestFullscreen();
        } else if(target.mozRequestFullscreen) {
            await target.mozRequestFullscreen();
        } else if(target.msRequestFullscreen) {
            await target.msRequestFullscreen();
        } else {
            alert("Ní féidir leat an cód a thosaigh i lán-scáileán sa bhrabhsálaí seo");
            return;
        }
        await this.runCode(e);
    }
}
