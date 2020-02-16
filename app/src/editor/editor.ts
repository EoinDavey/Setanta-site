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
        <link rel="stylesheet" href="node_modules/codemirror/lib/codemirror.css"/>
        <link rel="stylesheet" href="node_modules/codemirror/theme/solarized.css"/>
        <style>
            .CodeMirror {
                height: 100% !important;
            }
        </style>
        <textarea id='editor'>
>-- Fáilte go Setanta!

scríobh('Céad Míle Fáilte')

X := fadX@stáitse
Y := fadY@stáitse

x := 0
y := 0

dx := 1
dy := 1

ard := 50

dath@stáitse('dearg')

nuair-a fíor {
    má x + dx + ard > X | x + dx < 0
    	dx = -dx
    má y + dy + ard > Y | y + dy < 0
    	dy = -dy
    x = x + dx
    y = y + dy
    glan@stáitse()
    dron@stáitse(x, y, ard, ard)
  	coladh(1)
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
