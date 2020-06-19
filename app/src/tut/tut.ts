import { css, customElement, html, LitElement, TemplateResult } from "lit-element";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/av-icons.js";
import "./tooltip";
import "../mini/mini";

@customElement("tut-template")
class Tut extends LitElement {

    static get styles() {
        return css`
#body-wrap {
    margin-left: calc(var(--nav-width) + 8px);
    padding-left: 1rem;
}
#sidebar {
    z-index: 1;
    background-color: white;
    border-radius: 10px;
    height: calc(100% - 2 * 8px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    width: var(--nav-width);
    margin: 8px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s;
}
#heading-wrapper {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
}
#heading {
    font-size: 3rem;
    color: var(--theme-primary-dark);
    margin: 0 0 0 8px;
}
#logo {
    height: 3rem;
    width: 3rem;
}
#contents-hdr-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--theme-accent);
    border-top: 2px solid var(--theme-accent);
}
#contents-text {
    margin: 8px 0 0 16px;
    padding: 0 0 8px 0;
    color: var(--theme-text-primary);
    text-align: center;
    flex-grow: 1;
}
#menu-button {
    margin-left: auto;
    margin-right: 8px;
    flex-grow: 0;
    flex-basis: 1;
    display: none;
}
@media (max-width: 600px) {
    #sidebar {
        height: inherit;
        width: calc(100% - 2 * 8px);
        position: static;
    }
    #body-wrap {
        margin-left: 0;
        padding: 0 8px 0 8px;
    }
    #menu-button {
        display: inline-block;
    }
}
`;
    }

    public render(): TemplateResult {
        return html`
        <div id="sidebar">
            <a id="heading-wrapper" href="/">
                <img id="logo" src="/assets/logo.svg"></img>
                <h1 id="heading">Setanta</h1>
            </a>
            <div id="contents-hdr-wrap">
                <h2 id="contents-text">Contents</h2>
                <paper-icon-button id="menu-button" icon="icons:menu" @click="${this.toggleToc}">
                </paper-icon-button>
            </div>
            <div id="toc-wrap">
                <slot id="tocslot" name="toc">
            </div>
            </slot>
        </div>
        <div id="body-wrap">
            <slot name="body"></slot>
        </div>`;
    }

    private toggleToc() {
        const tocwrap = this.shadowRoot!.getElementById("toc-wrap");
        if(tocwrap === null)
            return;
        if(tocwrap.style.height === "0px")
            tocwrap.style.height = "initial";
        else
            tocwrap.style.height = "0px";
    }
}
