import wc from "./wc.js";

class IInput {
    
}

class wcInput extends wc {
    get wcTemplate() {
        return wc.html`
            <input class="input" type="text" placeholder="${this.getAttribute("placeholder")}"/>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                }
            </style>
        `;
    }
}

customElements.define("wc-input", wcInput);

export default wcInput;