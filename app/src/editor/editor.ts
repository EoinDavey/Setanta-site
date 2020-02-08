import { customElement, html, LitElement, property, TemplateResult } from "lit-element";

@customElement("fyp-editor")
export class FYPEditor extends LitElement {
    private editor: CodeMirror.Editor | undefined;

    get content(): string {
        if (this.editor) {
            return this.editor.getValue();
        }
        return "";
    }

    public render(): TemplateResult {
        return html`
        <style>
            @import url(node_modules/codemirror/lib/codemirror.css);
            @import url(node_modules/codemirror/theme/solarized.css);
            .CodeMirror {
                height: 100%;
            }
        </style>
        <textarea id='editor'>
>-- An uimhir phríomha é x?
gníomh príomha(x) {
    má x <= 2
        toradh x == 2
    le i idir(2, x) {
        má i*i > x
            bris
        má x % i == 0 >-- Níl uimhir phríomha é
            toradh breag
    }
    toradh fíor >-- Is uimhir phríomha é
}

scríobh('Seo na uimhreacha phríomha idir 0 agus 100')
le i idir (2, 100) {
    má príomha(i)
        scríobh(i)
}
</textarea>
    `;
    }

    public firstUpdated(changedProperties: any) {
        if (this.shadowRoot) {
            const tx = this.shadowRoot.getElementById("editor") as HTMLTextAreaElement;
            this.editor = CodeMirror.fromTextArea(tx, {
                indentUnit: 4,
                lineNumbers: true,
                mode: "setanta",
            });
            this.editor.setOption("extraKeys", {
                "Ctrl-Enter": (cm) => {
                    console.log("fyp-run");
                    this.dispatchEvent(new CustomEvent("fyp-run", {
                        bubbles: true,
                        composed: true,
                    }));
                },
            });
        }
    }
}
