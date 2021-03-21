import wc from "/components/wc.js";
import Validator from "/classes/validator.js";

class wcTextInput extends wc {
    constructor() {
        super();
        this.validator = new Validator(this);
    }

    get wcTemplate() {
        return wc.html`
            <div>
                <label for="${this.id || " input-0"}">${this.label || "no label"}</label>
            
                <input ${this.hasAttribute('required') ? 'required' : ''} class="input" type="text"
                    placeholder="${this.getAttribute('placeholder')}" />
            
                <p class="alert"></p>
            </div>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>

            </style>
        `;
    }

    get wcBuiltIn() {
        return this.shadowRoot.querySelector("input");
    }

    get regExp() {
        let expr = this.getAttribute("reg-exp");
        return (expr ? new RegExp(expr) : "");
    }

    get value() {
        return this.wcBuiltIn.value;
    }

    get label() {
        return this.getAttribute("label") || "";
    }

    get alert() {
        return this.shadowRoot.querySelector(".alert");
    }

    get type() {
        return this.getAttribute("type") || "text";
    }

    updateAlert() {
        this.alert.textContent = this.validator.notification;
    }

    connectedCallback() {
        this.wcBuiltIn.addEventListener("blur", async () => {
            let isValid = await this.validator.validate();
            this.toggleAttribute("is-invalid", !isValid);
            this.updateAlert();
        });
    }
}

customElements.define("wc-text-input", wcTextInput);

export default wcTextInput;