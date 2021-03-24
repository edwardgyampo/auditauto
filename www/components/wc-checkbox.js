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
                <input name="${this.name}" id="${this.id || 'input-0'}" ${this.isRequired ? "required" : ""} type="checkbox">
                <div class="ui">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="151.304" height="111.096" viewBox="0 0 151.304 111.096">
                            <rect id="Rectangle_6" data-name="Rectangle 6" width="20" height="68" rx="10" transform="translate(0 50.546) rotate(-30)"/>
                            <rect id="Rectangle_7" data-name="Rectangle 7" width="20" height="149" rx="10" transform="matrix(0.643, 0.766, -0.766, 0.643, 138.449, 0)"/>
                        </svg>
                    </div>
                </div>
                <label for="input-0">${this.label || "no label"}</label>
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
                    display: none;
                }

                label {
                    display: inline-flex;
                    height: 100%;
                    width: 100%;
                    align-items: center;
                    cursor: pointer;
                    padding: 10px;
                    color: rgb(var(--color-primary-variant));
                }

                :host>div {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    height: 60px;
                    width: 280px;
                    border-radius: 5px;
                    background-color: #fff;
                    border-radius: 5px;
                    overflow: hidden;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                }

                .ui {
                    pointer-events: none;
                    display: inline-flex;
                    position: absolute;
                    right: 14px;
                }

                .ui .icon {
                    width: 24px;
                    height: 24px;
                    background-color: #eee;
                    padding: 5px;
                    display: inline-flex;
                    border-radius: 5px;
                }

                .ui .icon svg {
                    opacity: 0;
                    width: 100%;
                    height: 100%;
                }

                input:checked ~ .ui .icon{
                    background-color: rgb(var(--color-primary-variant));
                }

                input:checked ~ .ui .icon svg{
                    opacity: 1;
                    fill: #fff;
                }

                input:checked ~ label{
                    font-weight: bolder;
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