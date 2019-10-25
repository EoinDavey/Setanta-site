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
        </style>
        <textarea id='editor'>console.log('Hello World!');</textarea>
    `;
    }

    firstUpdated(changedProperties: any){
        if(this.shadowRoot){
            const tx = this.shadowRoot.getElementById('editor') as HTMLTextAreaElement;
            this.editor = CodeMirror.fromTextArea(tx, {
                mode: "javascript",
                lineNumbers: true,
            })
        };
    }
}
