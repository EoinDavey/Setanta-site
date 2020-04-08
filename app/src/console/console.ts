import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-button/paper-button.js";

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
    height: calc(100% - 10px);
    margin-bottom: 8px;
    font-size: inherit;
}
#input-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-top: 1px solid var(--theme-divider);
    align-items: baseline;
    height: 20%;
}
#list {
    height: 80%;
    overflow: auto;
    margin-left: 2%;
}
#wrapper {
    height: 100%
}
#pref {
    padding-right: 8px;
    padding-left: 8px;
}
#clear-button {
    color: var(--theme-accent);
    height: 32px;
    width: 32px;
    padding: 0px;
}
        `;
    }

    @property({type: Array})
    public lines: string[] = [];

    public render(): TemplateResult {
        return html`
        <div id='wrapper'>
            <div id='list'>
                ${this.lines.map((ln) => html`<p>${ln}</p>`)}
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
        this.lines.push(msg);
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
