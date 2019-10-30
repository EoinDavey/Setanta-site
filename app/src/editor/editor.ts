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
async function main() {
    const g = new G.GridStage();
    display.setStage(g);
    const ag = g.newAgent(0, 0, "red");
    await loop(10, 30, () => ag.moveRight());
}

// BOILERPLATE
(async ()=> {
    const minTime = new Promise(resolve => setTimeout(resolve, 100));
    await Promise.all([minTime, main()]);
    write('finished');
    finish();
})();
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
