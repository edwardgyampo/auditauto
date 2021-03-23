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
                <div class="ui">
                    <div class="placeholder"></div>
                </div>


                <div class="core">
                    <label for="${this.id || " input-0"}">${this.label || "no label"}</label>
                
                    <input name="${this.name}" autocomplete="${this.isAutocomplete ? 'on' : 'off'}" ${this.hasAttribute('required') ? 'required' : '' }
                        class="input" type="text" placeholder="${this.placeholder}" />
                
                    <p class="alert"></p>
                </div>
            </div>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                }

                :host>div {
                    position: relative;
                    display: inline-flex;
                    flex-direction: column;
                }

                .core label{
                    position: absolute;
                    font-size: 14px;
                    top: 3px;
                    left: 5px;
                    color: purple;
                }

                .core input {
                    position: absolute;
                    display: inline-flex;
                    bottom: 10px;
                    left: 50%;
                    width: 90%;
                    transform: translate(-50%, -50%);
                    border: none;
                    outline: none;
                    font-size: 15px;
                }
                
                .core .alert {
                    position: absolute;
                    bottom: 3px;
                    right: 5px;
                    font-size: 11px;
                    color: red;
                }
                
                .ui {
                    position: relative;
                    display: inline-flex;
                    width: 280px;
                    height: 64px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    overflow: hidden;
                    border-bottom: 3px solid purple;
                    border-radius: 5px 5px 0 0;
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

    set value(val) {
        this.wcBuiltIn.value = val;
    }

    get name() {
        return this.getAttribute("name") || "";
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

    get placeholder() {
        return this.getAttribute('placeholder');
    }

    get isValid() {
        // console.log(this.placeholder, "is", this.validator.validate());
        return this.validator.validate();
    }

    get isAutocomplete() {
        return this.hasAttribute("autocomplete");
    }

    get uiText() {
        return this.shadowRoot.querySelector(".ui .text");
    }

    updateAlert() {
        this.alert.textContent = this.validator.notification;
    }

    validate() {
        let isValid = this.validator.validate();
        this.toggleAttribute("is-invalid", !isValid);
        this.updateAlert();
    }

    connectedCallback() {
        this.wcBuiltIn.addEventListener("blur", () => this.validate());
    }
}

customElements.define("wc-text-input", wcTextInput);

export default wcTextInput;