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
gníomh triail(x, freagair) {
    má x <= 2 {
        freagair(x == 2)
    } nó {
        phríomha := fíor
        le i idir(2, x - 1) {
            má i*i > x
                bris
            má x % i == 0 {
                phríomha = breag
                bris
            }
        }
        freagair(phríomha)
    }
}

le i idir (2, 100) {
    phríomha := breag
    gníomh f(x) {
        phríomha = x
    }
    triail(i, f)
    má phríomha
        scríobh(i)
}
</textarea>
    `;
    }

    firstUpdated(changedProperties: any){
        if(this.shadowRoot){
            const tx = this.shadowRoot.getElementById('editor') as HTMLTextAreaElement;
            this.editor = CodeMirror.fromTextArea(tx, {
                mode: "setanta",
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
