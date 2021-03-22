import wc from "/components/wc.js";
import Validator from "/classes/validator.js";

class wcCheckbox extends wc {
    constructor() {
        super();
        this.validator = new Validator(this);
    }

    get wcTemplate() {
        return wc.html`
            <div>
                <label for="input-0">${this.label || "no label"}</label>

                <input name="${this.name}" id="${this.id || 'input-0'}" ${this.isRequired ? "required" : ""} type="checkbox"></div>
            </div>
        `;
    }

    get wcStyle(){
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                }

                input {
                    cursor: pointer;
                }
            </style>
        `;
    }

    get isRequired() {
        return this.hasAttribute("required");
    }

    get isValid() {
        return this.validator.validate();
    }

    get wcBuiltIn() {
        return this.shadowRoot.querySelector("input");
    }

    get checked() {
        return this.wcBuiltIn.checked;
    }

    set checked(bool) {
        return this.wcBuiltIn.checked = bool;
    }

    get value() {
        return this.wcBuiltIn.checked;
    }

    set value(val) {
        this.wcBuiltIn.value = val;
    }

    get name() {
        return this.getAttribute("name") || "";
    }

    get label() {
        return this.getAttribute("label");
    }

    connectedCallback() {

    }
}

customElements.define("wc-checkbox", wcCheckbox);

export default wcCheckbox;