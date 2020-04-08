import { css, customElement, html, LitElement, TemplateResult } from "lit-element";

@customElement("setanta-splash")
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
            height: 100vh;
            width: 100vw;
        }
        #top-page {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 2 * 64px - 2px);
            align-items: center;
            justify-content: center;
            background-color: white;
            color: white;
            border: 1px solid var(--theme-primary);
            border-radius: 1rem;
            margin: 64px;
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
        #buttons a:last-child {
            margin-left: 10px;
        }
        #logo {
            height: 8rem;
            width: 8rem;
            grid-area: logo;
        }
        @media (max-width: 600px) {
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
            #buttons a:last-child {
                margin-left: 0px;
                margin-top: 10px;
            }
        }
        `
    }

    public render(): TemplateResult {
        return html`
        <div id="main">
            <div id="top-page">
                <div id="header-wrapper">
                    <img src="/assets/logo.svg"/ id="logo"><h1 id="heading" >Setanta</h1>
                    <h4 id="subtitle">An teanga ríomhchlárúcháin <span class="gaeilge">as Gaeilge</span></h4>
                </div>
                <div id="buttons" class="horizontal-wrap">
                    <a class="button" href="https://docs.try-setanta.ie">
                        <span>Foghlaim Setanta</span>
                        <hr/>
                        <span class="bearla">Learn Setanta</span>
                    </a>
                    <a class="button" href="/editor">
                        <span>Oscail an éagarthóir</span>
                        <hr/>
                        <span class="bearla">Open the editor</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    }
}
