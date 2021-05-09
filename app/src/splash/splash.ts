import { LitElement, TemplateResult, css, customElement, html } from "lit-element";
import "../mini/mini";
import "@polymer/iron-icons/iron-icons";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/av-icons.js";

@customElement("setanta-splash")
// Disable no-unused-vars because eslint can't tell that it is used by
// the @custom-element decorator.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class Splash extends LitElement {

    static get styles() {
        return css`
        :host {
            --offwhite: #f5f5f5;
        }
        #main {
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: var(--offwhite);
            height: 200vh;
            width: 100%;
        }
        .wrapped {
            height: calc(100vh - 2 * 64px - 2px);
            border: 1px solid var(--theme-primary);
            border-radius: 1rem;
            margin: 64px;
            background-color: white;
        }
        #top-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
        }
        h4 {
            text-align: center;
        }
        #bottom-page {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: calc(2 * 64px) 64px 0px 64px;
        }
        #heading {
            font-size: 5rem;
            outline: none;
            margin: 0px 0px 0px 8px;
            color: var(--theme-primary-dark);
            grid-area: title;
        }
        #subtitle {
            font-size: 1rem;
            margin: 2px 0px 24px 8px;
            outline: none;
            font-family: Roboto Mono, monospace;
            text-align: center;
            color: var(--theme-accent);
            grid-area: subtitle;
        }
        #header-wrapper {
            display: grid;
            grid-template-columns: auto auto;
            grid-template-areas:
                "logo title"
                "logo subtitle"
        }
        .button {
            font-size: 1.2rem;
            padding: .5rem 1.1rem .4rem;
            border: 1px solid black;
            border-radius: 1rem;
            text-decoration: none;
            color: black;
            display: flex;
            flex-direction: column;
            transition: all 0.08s ease-out;
        }
        .button span {
            text-align: center;
        }
        .button hr {
            height: 1px;
            width: 100%;
            border: 0;
            border-top: 1px solid black;
            margin-bottom: 2px;
            transition: all 0.08s ease-out;
        }
        .button:hover {
            border: 1px solid var(--theme-accent);
            background-color: var(--offwhite);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .button:hover hr {
            border-top: 1px solid var(--theme-accent);
        }
        .bearla {
            font-style: italic;
        }
        .gaeilge {
            font-style: italic;
            color: var(--theme-accent-light);
        }
        .horizontal-wrap {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }
        .buttons a {
            margin-left: 10px;
        }
        .buttons a:first-child {
            margin-left: 0px;
        }
        #logo {
            height: 8rem;
            width: 8rem;
            grid-area: logo;
        }
        #editor-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        #aspect-wrapper {
            position: relative;
            width: 100%;
            height: 0px;
            padding-bottom: 50%;
            margin-bottom: 1rem;
        }
        .aspect {
            width: 50%;
            min-width: 35rem;
        }
        #bottom-page {
            position: relative;
        }
        #try-button {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 1rem;
        }
        #try-button:hover {
            cursor: pointer;
        }
        #down-arrow {
            height: 3rem;
            width: 3rem;
            color: var(--theme-accent);
        }
        .play-icon {
            border-radius: 100%;
            background-color: var(--theme-accent);
            color: white;
        }
        @media (max-width: 600px) {
            #main {
                height: 100vh;
            }
            #try-button {
                display: none;
            }
            #bottom-page {
                display: none;
            }
            #header-wrapper {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            #logo {
                width: 4rem;
                height: 4rem;
            }
            #heading {
                font-size: 3rem;
            }
            .buttons a {
                margin-left: 0px;
                margin-top: 10px;
            }
            .buttons a:first-child {
                margin-top: 0px;
            }
        }
        `;
    }

    private buttons(): TemplateResult {
        return html`<div class="buttons horizontal-wrap">
    <a class="button" href="/tut/en/intro.html">
        <span>Foghlaim Setanta</span>
        <hr/>
        <span class="bearla">Learn Setanta</span>
    </a>
    <a class="button" href="/editor">
        <span>Oscail an éagarthóir</span>
        <hr/>
        <span class="bearla">Open the editor</span>
    </a>
    <a class="button" href="https://docs.try-setanta.ie">
        <span>Léigh na doiciméid</span>
        <hr/>
        <span class="bearla">Read the docs</span>
    </a>
</div>`;
    }

    public render(): TemplateResult {
        return html`
        <div id="main">
            <div id="top-page" class="wrapped">
                <div id="header-wrapper">
                    <img src="/assets/logo.svg"/ id="logo"><h1 id="heading" >Setanta</h1>
                    <h4 id="subtitle">An teanga ríomhchlárúcháin <span class="gaeilge">as Gaeilge</span></h4>
                </div>
                ${this.buttons()}
                <div id="try-button" class="button" @click="${this.scrollDown}">
                    <iron-icon id="down-arrow" icon="icons:arrow-downward">
                    </iron-icon>
                    <div>
                        Trial gearr
                        <hr/>
                        <span class="bearla">Quick try</span>
                    </div>
                </div>
            </div>
            <div id="bottom-page" class="wrapped">
                <h4>Cliceáil ar <iron-icon class="play-icon" icon="av:play-arrow"></iron-icon> thíos chun an ríomhchlár a thosnú
                <hr/>
                <i>Click on <iron-icon class="play-icon" icon="av:play-arrow"></iron-icon> below to start the program</i></h4>
                <div class="aspect">
                    <div id="aspect-wrapper">
                        <div id="editor-wrapper">
                            <mini-editor id="mini"></mini-editor>
                        </div>
                    </div>
                </div>
                ${this.buttons()}
            </div>
        </div>`;
    }
    private scrollDown() {
        const sr = this.shadowRoot;
        if(sr === null)
            throw new Error("Theip air shadowRoot a fháil");
        const main = sr.getElementById("main");
        if(main === null)
            throw new Error("Theip air main a fháil");
        const ht = main.scrollHeight;
        window.scrollTo(0, ht);
    }
}
