import { TemplateResult, css, LitElement, html, property, customElement } from 'lit-element';
import '../editor/editor';
import { FYPEditor } from '../editor/editor';
import '../console/console';
import { FYPConsole } from '../console/console';

@customElement('fyp-app')
class FypApp extends LitElement {
    @property({type: String}) title = "Final Year Project";

    static get styles() {
        return css`
            #container {
                display: grid;
                grid-template-columns: minmax(0,1fr) minmax(0,1fr);
                grid-template-rows: minmax(0,1fr) minmax(0,1fr);
                grid-column-gap: 2vh;
                grid-row-gap: 2vw;
                height: 80vh;
            }
            #editor {
                grid-column-start: 2;
                grid-row-start: span 2;
            }
            #console {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 2;
                overflow: auto;
                outline: 1px solid black;
            }
            #stage {
                grid-column-start: 1;
                grid-column-end: 2;
                grid-row-start: 1;
                width: 100%;
                height: 100%;
                outline: thin inset #aaaaaa;
            }
        `;
    }

    render () : TemplateResult {
        return html`
        <style>
            @import url(node_modules/codemirror/lib/codemirror.css);
            @import url(node_modules/codemirror/theme/solarized.css);
        </style>
        <h1>${this.title}</h1>
        <button @click="${this.runCode}">Run Code</button>
        <div id='container'>
            <canvas id='stage' width="1000" height="750"></canvas>
            <fyp-editor id="editor" @fyp-run="${this.runCode}"></fyp-editor>
            <fyp-console id="console"></fyp-console>
        </div>
    `;
    }

    private fixCanvas() : void {
        const cw = this.stage.clientWidth;
        const ch = this.stage.clientHeight;
        this.stage.width = 1000;
        this.stage.height = 1000 * (ch/cw);
    }

    async runCode(e : Event) : Promise<boolean> {
        this.fixCanvas();
        const finalise = ";finish();"
        const c = this.editor.content + finalise;
        return new Promise(resolve => {
            const write = (msg : string) => this.console.writeOut(msg);
            const finish = ()=> resolve(true);
            const ctx = this.stage.getContext('2d');
            eval(c);
        });
    }

    get stage() : HTMLCanvasElement {
        return this.shadowRoot!.getElementById('stage')! as HTMLCanvasElement;
    }

    get editor() : FYPEditor {
        return this.shadowRoot!.getElementById('editor')! as FYPEditor;
    }

    get console() : FYPConsole {
        return this.shadowRoot!.getElementById('console')! as FYPConsole;
    }
}
