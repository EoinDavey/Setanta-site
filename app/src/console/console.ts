import "@polymer/paper-input/paper-input.js";
import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";

interface PaperInput extends HTMLElement {
    value: string;
}

@customElement("fyp-console")
export class FYPConsole extends LitElement {

    static get styles() {
        return css`
#input {
    height: 20%;
    border-top: 2px solid var(--theme-divider);
    margin-left: 2%;
    margin-right: 2%;
}
#list {
    height: 80%;
    overflow: auto;
}
#wrapper {
    height: 100%
}
#pref {
    color: var(--theme-accent);
    padding-right: 10px;
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
            <paper-input id='input' @keypress="${this.keyPress}">
            <div slot="prefix"><span id='pref'>᚛</span></div>
            </paper-input>
        </div>`;
    }

    public writeOut(msg: string): void {
        this.lines.push(msg);
        this.requestUpdate();
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
