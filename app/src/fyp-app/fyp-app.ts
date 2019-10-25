import { TemplateResult, LitElement, html, property, customElement } from 'lit-element';
import '../editor/editor';
import { FYPEditor } from '../editor/editor';
import '../console/console';

@customElement('fyp-app')
class FypApp extends LitElement {
    @property({type: String}) title = "Final Year Project";

    render () : TemplateResult {
        return html`
        <style>
            @import url(node_modules/codemirror/lib/codemirror.css);
            @import url(node_modules/codemirror/theme/solarized.css);
        </style>
        <h1>${this.title}</h1>
        <button @click="${this.runCode}">Run Code</button>
        <fyp-editor id="editor"></fyp-editor>
        <fyp-console></fyp-console>
    `;
    }

    runCode() : void {
        console.log('Clicked ' + eval(this.editor.content));
    }

    get editor() : FYPEditor {
        return this.shadowRoot!.getElementById('editor')! as FYPEditor;
    }
}
