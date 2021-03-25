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
            
                    <input name="${this.name}" autocomplete="${this.isAutocomplete ? 'on' : 'off'}" ${this.hasAttribute('required')
                       ? 'required' : '' } class="input" type="text" placeholder="${this.placeholder}" />
            
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
                    overflow: hidden;
                    box-shadow: 0 0 3px rgba(0, 0, 0, .2);
                    border-bottom: 3px solid rgb(var(--color-primary-variant));
                }
                
                :host([is-focus])>div {
                    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
                }

                :host([is-focus]) label {
                    letter-spacing: 2px;
                }

                label{
                    position: absolute;
                    z-index: 2;
                    font-size: 13px;
                    top: 5px;
                    left: 8px;
                    color: rgb(var(--color-primary-variant));
                    text-shadow: -2px -2px 3px rgba(0, 0, 0, .2);
                    transition: all 300ms ease-in-out;
                }

                input {
                    position: absolute;
                    z-index: 4;
                    display: inline-flex;
                    bottom: 3px;
                    left: 50%;
                    width: 100%;
                    height: calc(100% - 3px);
                    padding: 22px 10px 3px 10px;
                    transform: translate(-50%, 0);
                    border: none;
                    outline: none;
                    font-size: 15px;
                    background-color: transparent;
                }

                :host>div::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    background-color: rgba(0, 0, 0, .05);
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                }

                :host>div::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    z-index: 1;
                    border-radius: 50%;
                    width: 340px;
                    height: 340px;
                    pointer-events: none;
                    transition: all 300ms ease-in-out;
                }

                :host([is-focus])>div::after {
                    transform: translate(-50%, -50%) scale(1);
                    background-color: rgba(255, 255, 255, .98);
                }
            
                .alert {
                    position: absolute;
                    z-index: 2;
                    bottom: 3px;
                    right: 5px;
                    font-size: 11px;
                    color: rgb(var(--color-error));
                    text-shadow: -2px -2px 3px rgba(0, 0, 0, .2);
                }

                :host(:not([is-focus])) .alert {
                    animation: shake 120ms ease-in-out 3;
                }
                
                .ui {
                    position: relative;
                    display: inline-flex;
                    width: 280px;
                    height: 64px;
                    overflow: hidden;
                    border-radius: 5px 5px 0 0;
                }

                @keyframes shake {
                    from {
                        transform: translateX(-5%);
                    }
                    to {
                        transform: translateX(5%);
                    }
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
        let bool = this.validator.validate();
        this.toggleAttribute("is-invalid", !bool);
        this.updateAlert();
        this.toggleAttribute("is-valid", bool);
        return bool;
    }

    connectedCallback() {
        this.wcBuiltIn.addEventListener("blur", () => {
            this.removeAttribute("is-focus");
            this.validate();
        });
        this.wcBuiltIn.addEventListener("focus", () => {
            this.setAttribute("is-focus", "");
        });
    }
}

customElements.define("wc-text-input", wcTextInput);

export default wcTextInput;