import { TemplateResult, css, LitElement, html, property, customElement } from 'lit-element';
import '../editor/editor';
import '../console/console';
import { FYPEditor } from '../editor/editor';
import { FYPConsole } from '../console/console';
import * as G from '../engine/engine';

@customElement('fyp-app')
class FypApp extends LitElement {
    @property({type: String}) title = "Final Year Project";


    activeCancel : Function | null = null;

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
        <button @click="${this.stopCode}">Stop Code</button>
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
        const fac = 750;
        this.stage.height = fac;
        this.stage.width = Math.floor(fac * (cw/ch));
    }

    stopCode(e : Event){
        if(this.activeCancel)
            this.activeCancel();
    }

    async runCode(e : Event) : Promise<void> {
        this.fixCanvas();
        if(this.activeCancel)
            return;
        const ctx = this.stage.getContext('2d');
        if(ctx == null)
            throw "Canvas not supported";

        const c = this.editor.content;
        const display = new G.DisplayEngine(this.stage.width, this.stage.height);

        const ival = setInterval(() => display.draw(ctx), 10);

        const write = (msg : string) => this.console.writeOut(msg);
        const sleep = (time : number) => new Promise(resolve => setTimeout(resolve, time));
        const execution = new Promise(resolve => {
            let halt = false;
            const finish = ()=> { halt = true; resolve(true); };
            this.activeCancel = finish;
            const loop = async (times : number, gap : number, func : Function) => {
                for(let i = 0; i < times && !halt; i++){
                    await func();
                    await sleep(gap);
                }
            };
            const forever = async (gap : number, func : Function) => {
                while(!halt){
                    await func();
                    await sleep(gap);
                }
            };

            eval(c);
        });

        const res = await execution;
        console.log('finished');
        clearInterval(ival);
        display.draw(ctx);
        this.activeCancel = null;
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
