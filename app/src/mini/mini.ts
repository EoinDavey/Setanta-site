import { css, customElement, html, property, TemplateResult } from "lit-element";
import { FYPEditor } from "../editor/editor";
import "../editor/editor";
import { FYPConsole } from "../console/console";
import "../console/console";
import "@polymer/paper-card/paper-card.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import { RuntimeComponent } from "../engine/runtimecomp";

// Declare type for the paper-tabs element
interface PaperTabs extends HTMLElement {
    selected: number;
}

@customElement("mini-editor")
class MiniEditor extends RuntimeComponent {

    @property({type: Boolean}) public running = false;
    @property({type: String}) public initial = `scríobh('Dia duit')
dath@stáitse('dearg')
ciorcal@stáitse(100, 100, 50)`;
    @property({type: Boolean}) public stageopen = false;

    static get styles() {
        return css`
            #outer {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: minmax(0,1fr) minmax(0, 1fr);
                grid-template-rows: 3rem minmax(0, 1fr);
                grid-template-areas:
                    'top-bar-left top-bar-right'
                    'editor other';
            }
            #editor {
                grid-area: editor;
            }
            #other {
                grid-area: other;
                border-left: 1px solid var(--theme-divider);
                position: relative;
            }
            .top-bar {
                background-color: var(--theme-accent);
                padding-left: 0.5rem;
                padding-right: 0.5rem;
                color: white;
            }
            #top-bar-left {
                grid-area: top-bar-left;
                display: flex;
                flex-direction: row;
            }
            #top-bar-right {
                grid-area: top-bar-right;
            }
            .bar-button {
                margin-top: 0.25rem;
                margin-bottom: 0.25rem;
                height: 2.5rem;
                width: 2.5rem;
                border-radius: 100%;
                border: 2px solid white;
            }
            #stage {
                width: 100%;
                height: 100%;
                position: absolute;
                visibility: hidden;
            }
            #console {
                height: 100%;
                width: 100%;
                position: absolute;
            }
            @media (max-width: 600px) {
                #outer {
                    grid-template-columns: minmax(0,1fr);
                    grid-template-rows: 3rem minmax(0, 1fr) 3rem minmax(0, 1fr);
                    grid-template-areas:
                        'top-bar-left'
                        'editor'
                        'top-bar-right'
                        'other';
                }
            }
        `;
    }

    public render(): TemplateResult {
        return html`
            <paper-card id="outer">
                <div id="top-bar-left" class="top-bar">
                    <paper-icon-button icon="${this.running ? "av:stop" : "av:play-arrow"}"
                    id="run-button" class="bar-button" @click="${this.toggleRun}">
                    </paper-icon-button>
                </div>
                <div id="top-bar-right" class="top-bar">
                    <paper-tabs id="tabs" selected="${this.stageopen ? "1" : "0"}" @iron-select="${this.tabSelect}">
                        <paper-tab><b>Consól / <i>Console</i></b></paper-tab>
                        <paper-tab><b>Stáitse / <i>Stage</i></b></paper-tab>
                    </paper-tabs>
                </div>
                <fyp-editor id="editor" hidebuttons
                    startcontent="${this.initial}"
                    @fyp-run="${this.runCode}">
                </fyp-editor>
                <div id="other">
                    <fyp-console id="console"
                    @setanta-console-enter="${this.consoleWrite}">
                    </fyp-console>
                    <canvas id="stage" width="1000" height="750"
                    tabindex="0" @keydown="${this.handleKeyDown}"
                    @mousedown="${this.handleMouseDown}"
                    @mouseup="${this.handleMouseUp}"
                    @mousemove="${this.handleMouseMove}"
                    ></canvas>
                </div>
            </paper-card>`;
    }

    get editor(): FYPEditor {
        return this.shadowRoot!.getElementById("editor")! as FYPEditor;
    }
    get console(): FYPConsole {
        return this.shadowRoot!.getElementById("console")! as FYPConsole;
    }
    get stage(): HTMLCanvasElement {
        return this.shadowRoot!.getElementById("stage")! as HTMLCanvasElement;
    }

    get tabs(): PaperTabs {
        return this.shadowRoot!.getElementById("tabs")! as PaperTabs;
    }

    public firstUpdated() {
        if(this.stageopen)
            this.showStage();
        else
            this.showConsole();
    }

    private toggleRun(e: Event) {
        if(this.running)
            this.stopCode(e);
        else
            this.runCode(e);
    }

    private showConsole() {
        // hide stage
        this.stage.style.visibility = "hidden";
        // show console
        this.console.style.visibility = "visible";
    }

    private showStage(){
        // hide console
        this.console.style.visibility = "hidden";
        // show stage
        this.stage.style.visibility = "visible";
    }

    // We use visibility css property with overlapping elements instead of
    // display = "none" because when the canvas has not yet been displayed, it's
    // not correctly initialised and doesn't draw correctly.
    private tabSelect(e: Event) {
        const sel = this.tabs.selected;
        if(sel === 1) // Selected stáitse
            this.showStage();
        else if (sel === 0)
            this.showConsole();
    }
}
