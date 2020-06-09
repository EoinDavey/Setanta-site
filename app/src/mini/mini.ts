import { css, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import "../editor/editor";
import "../console/console";
import "@polymer/paper-card/paper-card.js";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/paper-icon-button/paper-icon-button.js";

@customElement("mini-editor")
class MiniEditor extends LitElement {

    @property({type: Boolean}) public running = false;

    static get styles() {
        return css`
            #outer {
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: minmax(0,1fr) minmax(0, 1fr);
                grid-template-rows: 3rem minmax(0, 1fr);
                grid-template-areas:
                    'topbar topbar'
                    'editor other';
            }
            #editor {
                grid-area: editor;
            }
            #other {
                grid-area: other;
                border-left: 1px solid var(--theme-divider);
            }
            #top-bar {
                background-color: var(--theme-accent);
                grid-area: topbar;
                display: flex;
                flex-direction: row;
            }
            .bar-button {
                height: 100%;
                width: 3rem;
                color: white;
            }
        `;
    }

    public render(): TemplateResult {
        return html`
            <paper-card id="outer">
                <div id="top-bar">
                <paper-icon-button icon="${this.running ? "av:stop" : "av:play-arrow"}"
                id="run-button" class="bar-button">
                </paper-icon-button>
                </div>
                <fyp-editor startcontent="scríobh('Dia duit')" id="editor" hidebuttons>
                </fyp-editor>
                <div id="other">
                    <fyp-console id="console"></fyp-console>
                </div>
            </paper-card>
            `;
    }
}
