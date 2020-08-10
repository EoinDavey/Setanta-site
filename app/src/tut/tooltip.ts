import { LitElement, TemplateResult, css, customElement, html, property } from "lit-element";

@customElement("tut-tooltip")
// Disable no-unused-vars because eslint can't tell that it is used by
// the @custom-element decorator.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class Tooltip extends LitElement {

    @property({type: String}) public alt = "";
    private open = false;

    static get styles() {
        return css`
        #wrapper {
            display: inline;
            text-underline-position: under;
        }
        #wrapper:hover {
            cursor: pointer;
        }
        .closed {
            text-decoration: underline var(--theme-primary-dark) dashed;
        }
        .open {
            color: white;
            background-color: var(--theme-accent);
            border-radius: 2px;
            padding: 2px;
        }
        `;
    }

    public render(): TemplateResult {
        return html`<div id="wrapper"
        title="${this.alt}"
        @click="${this.onClick}"
        class="${this.open ? "open" : "closed"}"
        >${this.open ? this.alt : html`<slot></slot>`}</div>`;
    }

    private onClick() {
        this.open = !this.open;
        this.requestUpdate();
    }
}
