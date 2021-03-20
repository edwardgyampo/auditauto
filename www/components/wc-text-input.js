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
                :host {
                    position: relative;
                    display: inline-flex;
                    width: 215px;
                    height: 45px;
                }
                
                :host>div {
                    display: inline-flex;
                    flex-direction: column;
                    margin-bottom: 10px;
                    width: 100%;
                    height: 100%;
                }

                input {
                    display: inline-flex;
                    width: 215px;
                    height: 50px;
                    border: 2px solid rgba(0, 0, 0, .1);
                }
                
                :host([is-invalid]) input {
                    border-color: red;
                }

                :host(:not([label])) label {
                    display: none;
                }

                .alert {
                    display: inline-flex;
                    padding: 10px;
                    color: red;
                }

                :host(:not([is-invalid])) .alert {
                    display: none;
                    overflow: hidden;
                }
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