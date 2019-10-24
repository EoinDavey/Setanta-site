import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { customElement } from '@polymer/decorators';

@customElement('fyp-app')
class FypApp extends PolymerElement {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>[[prop1]]</h2>
    `;
    }
    static get properties() {
        return {
            prop1: {
                type: String,
                value: 'Final Year Project 2019',
            }
        };
    }
    ready(){
        super.ready();
        var cm = CodeMirror(document.body, {
            value: "function myScript(){return 100;}\n",
            mode: "javascript",
            lineNumbers: true,
            theme: "solarized",
        });
    }
}
