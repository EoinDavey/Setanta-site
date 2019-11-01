import { TemplateResult, LitElement, html, property, customElement } from 'lit-element';

@customElement('fyp-editor')
export class FYPEditor extends LitElement {
    private editor: CodeMirror.Editor | undefined;

    get content(): string {
        if(this.editor)
            return this.editor.getValue();
        return "";
    }

    render () : TemplateResult {
        return html`
        <style>
            @import url(node_modules/codemirror/lib/codemirror.css);
            @import url(node_modules/codemirror/theme/solarized.css);
            .CodeMirror {
                height: 100%;
            }
        </style>
        <textarea id='editor'>
class GravAgent extends G.Agent {
    async fall() {
        await forever(30, () => {
            if(!this.stage.blocked(this.posX, this.posY+1))
                this.moveDown();
        });
    }
}

async function main() {
    const g = new G.GridStage();
    display.setStage(g);
    
    const szX = Math.floor(display.sizeX / g.agentSize);
    const szY = Math.floor(display.sizeY / g.agentSize);
    
    const midX = Math.floor(szX / 2);
    
    for(let i = 0; i < szX; i++)
    	g.attach(new G.Agent(i, szY - 1, "green"));
    
    const ag = new GravAgent(midX, 0, "red");
    g.attach(ag);
    ag.fall();
}
main();
</textarea>
    `;
    }

    firstUpdated(changedProperties: any){
        if(this.shadowRoot){
            const tx = this.shadowRoot.getElementById('editor') as HTMLTextAreaElement;
            this.editor = CodeMirror.fromTextArea(tx, {
                mode: "javascript",
                lineNumbers: true,
                indentUnit: 4,
            })
            this.editor.setOption("extraKeys", {
                "Ctrl-Enter": cm => {
                    console.log('fyp-run');
                    this.dispatchEvent(new CustomEvent('fyp-run', {
                        bubbles: true,
                        composed: true,
                    }));
                },
            });
        };
    }
}
