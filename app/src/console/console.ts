import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-button/paper-button.js";
import { RuntimeError } from "setanta/node_build/error";

interface PaperInput extends HTMLElement {
    value: string;
}

@customElement("fyp-console")
export class FYPConsole extends LitElement {

    static get styles() {
        return css`
#input {
    margin: 0;
    padding: 0;
    border: none;
    border-bottom: 2px solid;
    outline: 0;
    flex-grow: 1;
    height: 1.5rem;
    font-size: inherit;
}
#input-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid var(--theme-divider);
    align-items: center;
    height: 3rem;
}
#list {
    overflow: auto;
    flex-grow: 1;
    margin-left: 8px;
    margin-right: 8px;
    padding-top: 8px;
}
#wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
#pref {
    padding-right: 8px;
    padding-left: 8px;
}
#clear-button {
    color: var(--theme-accent);
    height: 2rem;
    width: 2rem;
    padding: 0px;
}
.error {
    display: flex;
    align-items: center;
    background-color: #B00020;
    color: white;
    font-style: bold;
    padding: 1rem;
    font-family: Roboto-mono, monospace;
}
.error iron-icon {
    margin-right: 1rem;
}
.no-shrink {
    flex-shrink: 0;
}
        `;
    }

    @property({type: Array})
    public lines: TemplateResult[] = [];

    public render(): TemplateResult {
        return html`
        <div id='wrapper'>
            <div id='list'>
                ${this.lines}
            </div>
            <div id="input-wrap">
                <span id="pref">᚛</span>
                <input id='input' @keypress="${this.keyPress}" autocomplete="off"></input>
                </input>
                <paper-icon-button id="clear-button" icon="icons:clear" @click="${this.clearHistory}">
                </paper-icon-button>
            </div>
        </div>`;
    }

    public scrollDown() {
        const list = this.shadowRoot!.getElementById("list")!;
        list.scrollTop = list.scrollHeight;
    }

    public clearHistory() {
        this.lines = [];
    }

    public writeOut(msg: string) {
        this.lines.push(html`<p>${msg}</p>`);
        return this.requestUpdate();
    }

    public writeError(e: Error) {
        const rep: string = (e instanceof RuntimeError) ? e.msg : e.toString();
        this.lines.push(html`<div class="error"><iron-icon class="no-shrink" icon="icons:error-outline"></iron-icon>${rep}</div>`);
        return this.requestUpdate();
    }

    private keyPress(e: KeyboardEvent) {
        if (e.charCode === 13) {
            // 13 is charCode for Enter
            const elm = this.shadowRoot!.getElementById("input");
            if (elm) {
                const inp = elm as PaperInput;
                const val = inp.value;
                this.dispatchEvent(new CustomEvent("setanta-console-enter", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        value: val,
                    },
                }));
                inp.value = "";
            }
        }
    }
}
