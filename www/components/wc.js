let html = (strings, ...args) => {
    let str = strings.reduce((out, s, i) => `${out}${s}${args[i] || ""}`, ``);
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    let key = doc.head.hasChildNodes() ? "head" : "body";
    return doc[key].firstChild;
};

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

            input:focus, textarea:focus, select:focus
            textarea {
                outline: none;
                box-shadow: none;
                -webkit-box-shadow: none;
                -moz-box-shadow: none;
                -webkit-appearance: none;
                outline: none;
                background: none;
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
        return html` <style></style> `;
    }

    // Returns the built-in html element that this custom-element wraps.
    get wcBuiltIn() {
        return null;
    }

    connectedCallback() { }
}

wc.html = html;

window.wc = wc;

export default wc;