import { LitElement, TemplateResult, css, customElement, html } from "lit-element";
import "@polymer/paper-icon-button/paper-icon-button";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-icon/iron-icon";
import "@polymer/iron-icons/av-icons.js";
import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import "./tooltip";
import "../mini/mini";

// Declare type for the paper-tabs element
interface PaperTabs extends HTMLElement {
    selected: number;
}

@customElement("tut-template")
// Disable no-unused-vars because eslint can't tell that it is used by
// the @custom-element decorator.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
#all-toc-slot {
    display: none;
}
#tabs {
    flex-shrink: 0;
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
                <slot id="all-toc-slot" name="all-toc">
                </slot>
            </div>
        </div>
        <div id="body-wrap">
            <slot name="body"></slot>
        </div>`;
    }

    private allPages() {
        return ['test'].map(x => html`<li><a>${x}</a></li>`);
    }

    private getShadowRoot() {
        if(this.shadowRoot)
            return this.shadowRoot;
        throw new Error("Níl aon shadowRoot lé fáil");
    }

    private get tabs(): PaperTabs {
        const tbs = this.getShadowRoot().getElementById("tabs");
        if(tbs)
            return tbs as PaperTabs;
        throw new Error("Theip air tabs a fháil");
    }

    private get tocslot() {
        const ts = this.getShadowRoot().getElementById("tocslot");
        if(ts)
            return ts;
        throw new Error("Theip air tocslot a fháil");
    }

    private get alltoc() {
        const ts = this.getShadowRoot().getElementById("all-toc-slot");
        if(ts)
            return ts;
        throw new Error("Theip air all-toc-slot a fháil");
    }

    private tabSelect() {
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
        const tocwrap = this.getShadowRoot().getElementById("toc-wrap");
        if(tocwrap === null)
            return;
        if(tocwrap.style.height === "0px")
            tocwrap.style.height = "initial";
        else
            tocwrap.style.height = "0px";
    }
}
