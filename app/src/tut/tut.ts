import { css, customElement, html, LitElement, TemplateResult } from "lit-element";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/av-icons.js";
import "./tooltip";
import "../mini/mini";

// Declare type for the paper-tabs element
interface PaperTabs extends HTMLElement {
    selected: number;
}

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
    display: flex;
    flex-direction: column;
}
#heading-wrapper {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    flex: none;
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
    flex: none;
}
#toc-wrap {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
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
paper-tabs {
    --paper-tabs-selection-bar-color: var(--theme-accent);
}
paper-tab {
    --paper-tab-ink: var(--theme-accent);
}
#all-toc {
    display: none;
    list-style-type: none;
}
#all-toc li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
#all-toc li:before { /* the custom styled bullets */
  color: var(--theme-primary-dark);
  content: "᚛";
  font-weight: 900;
  display: inline-block;
  margin-right: 0.5rem;
  flex-shrink: 0;
}
#all-toc a {
    font-size: 1.25rem;
    max-width: calc(0.7 * var(--nav-width));
    text-decoration: none;
    padding: 2px 8px 2px 8px;
    border-radius: 10px;
    border: 1px solid transparent;
    color: var(--theme-text-primary);
    display: inline-block;
}
#all-toc a:hover {
    border: 1px solid var(--theme-accent);
    background-color: var(--offwhite);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
            <paper-tabs id="tabs" selected="0" @iron-select="${this.tabSelect}">
                <paper-tab><b>This Page</b></paper-tab>
                <paper-tab><b>All</b></paper-tab>
            </paper-tabs>
            <div id="toc-wrap">
                <slot id="tocslot" name="toc">
                </slot>
                <ul id="all-toc">
                    ${this.allPages()}
                </ul>
            </div>
        </div>
        <div id="body-wrap">
            <slot name="body"></slot>
        </div>`;
    }

    private allPages() {
        return ['test'].map(x => html`<li><a>${x}</a></li>`);
    }

    private get tabs(): PaperTabs {
        return this.shadowRoot!.getElementById("tabs")! as PaperTabs;
    }

    private get tocslot() {
        return this.shadowRoot!.getElementById("tocslot")!
    }

    private get alltoc() {
        return this.shadowRoot!.getElementById("all-toc")!
    }

    private tabSelect(e: Event) {
        const sel = this.tabs.selected;
        if(sel === 1) { // Selected all
            this.tocslot.style.display = "none";
            this.alltoc.style.display = "block";
        } else if (sel === 0) {
            this.tocslot.style.display = "block";
            this.alltoc.style.display = "none";
        }
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
