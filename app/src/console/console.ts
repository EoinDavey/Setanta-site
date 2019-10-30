import { TemplateResult, LitElement, html, property, customElement } from 'lit-element';

@customElement('fyp-console')
export class FYPConsole extends LitElement {

    @property({type: Array})
    lines : string[] = [];

    render () : TemplateResult {
        return html`
        <div id='wrapper'>
        ${this.lines.map(ln => html`<p>${ln}</p>`)}
        </div>`;
    }

    public writeOut(msg : string) : void {
        this.lines.push(msg);
        this.requestUpdate();
    }
}