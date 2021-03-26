
// "html" creates an html element from html string.
// NB:
//  1. The input string should have only one tag at root level.
//  2. Syntax highlighting is available for html strings inside
//     .js files via lit-html plugin. Tested in VS Code.
//
// eg: 
//  1. "<style>.book { background-color: brown; }</style>"
//  2.
//    `
//     <div>
//         <p></p>
//         <div></div>
//     </div>
//    `;

let html = (strings, ...args) => {
    let str = strings.reduce((out, s, i) => `${out}${s}${args[i] || ""}`, ``);
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    let key = doc.head.hasChildNodes() ? "head" : "body";
    return doc[key].firstChild;
};

// This is the base class for all custom web components.
// UI components such as text-input extend wc and provide
// their unique appearance and functionality via 'wcStyle'
// and 'wcTemplate' getters.
class wc extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(wc.html`
        <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        </style>
        `);
        
        this.shadowRoot.append(this.wcStyle);
        this.shadowRoot.append(this.wcTemplate);
    }

    get wcTemplate() {
        return html`<div></div>`;
    }

    get wcStyle() {
        return html`<style></style> `;
    }

    get wcBuiltIn() {
        return null;
    }

    connectedCallback() { }
}

wc.html = html;

window.wc = wc;

export default wc;