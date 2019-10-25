import { TemplateResult, LitElement, html, property, customElement } from 'lit-element';

@customElement('fyp-console')
class FYPConsole extends LitElement {
    @property({type: String}) output = "";
    render () : TemplateResult {
        return html`
        <div id='out'>${this.output}</div>
        `;
    }
}
