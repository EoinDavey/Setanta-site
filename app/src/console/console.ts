import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";

interface PaperInput extends HTMLElement {
    value: string;
}

@customElement("fyp-console")
export class FYPConsole extends LitElement {

    static get styles() {
        return css`
#input {
    width: 80%;
    margin: 0;
    padding: 0;
    border: none;
    outline: 0;
    height: 100%;
    font-size: inherit;
}
#input-wrap {
    height: 18%;
    margin-left: 2%;
    margin-right: 2%;
    border-bottom: 2px solid var(--theme-accent);
    border-top: 2px solid var(--theme-divider);
}
#list {
    height: 78%;
    overflow: auto;
    margin-left: 2%;
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
            <div id="input-wrap">
                <span id="pref">᚛</span>
                <input id='input' @keypress="${this.keyPress}" autocomplete="off"></input>
                </input>
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
