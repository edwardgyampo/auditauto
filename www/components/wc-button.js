import wc from "/components/wc.js";

class wcButton extends wc {
    constructor() {
        super();
    }

    get wcTemplate() {
        return wc.html`
        <div>
            <button>${this.label}</button>    
        </div>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                }

                button {
                    cursor: pointer;
                }
            </style>
        `;
    }

    get label() {
        return this.getAttribute("label") || "no label";
    }

    get wcBuiltIn() {
        return this.shadowRoot.querySelector("button");
    }
}

customElements.define("wc-button", wcButton);

export default wcButton;