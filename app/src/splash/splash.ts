import { css, customElement, html, LitElement, TemplateResult } from "lit-element";

@customElement("setanta-splash")
class Splash extends LitElement {

    static get styles() {
        return css`
        .full-height {
            height: calc(100vh - 20px);
        }
        #top-page {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: var(--theme-primary);
            color: white;
            padding: 10px;
        }
        #bottom-page {
            background-color: red;
        }
        #heading {
            font-size: 4rem;
            outline: none;
            margin: 0px 0px 0px 10px;
        }
        #subtitle {
            font-size: 1.4rem;
            outline: none;
            font-family: Roboto Mono, monospace;
            text-align: center;
        }
        #header-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
        }
        #header-wrapper img {
            height: 4rem;
            width: 4rem;
        }
        .button {
            font-size: 1.2rem;
            padding: .5rem 1.1rem .4rem;
            border-radius: 1rem;
            text-decoration: none;
            color: inherit;
            display: flex;
            flex-direction: column;
            background: var(--theme-accent);
            -webkit-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.75);
            -moz-box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.75);
            box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.75);
        }
        .button span {
            text-align: center;
        }
        .button hr {
            height: 1px;
            width: 100%;
            border: 0;
            border-top: 1px solid #ccc;
            margin-bottom: 2px;
        }
        .bearla {
            font-style: italic;
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
        `
    }

    public render(): TemplateResult {
        return html`
        <div id="main">
            <div id="top-page" class="full-height">
                <div id="header-wrapper">
                    <img src="/assets/logo200x200.png"/><h1 id="heading" >Setanta</h1>
                </div>
                <h4 id="subtitle">An teanga ríomhchlárúcháin as Gaeilge</h4>
                <div id="buttons" class="horizontal-wrap">
                    <a class="button" href="https://docs.try-setanta.ie">
                        <span>Foghlaim Setanta</span>
                        <hr/>
                        <span class="bearla">Learn Setanta</span>
                    </a>
                    <a class="button" href="https://vey.ie">
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
