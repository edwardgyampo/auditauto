import wc from "./wc.js";
import Validator from "./../helpers/validator.js";

class wcSelect extends wc {
    constructor() {
        super();
        this.Validator = new Validator({
            value: this.value,
            RegExp: this
        });
    }

    get wcTemplate() {
        return wc.html`
            <div>
                <label for="${this.id || "select-0"}">${this.label || "no label"}</label>
    
                <slot id="option-slot">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="hamster">Hamster</option>
                    <option value="parrot">Parrot</option>
                    <option value="spider">Spider</option>
                    <option value="goldfish">Goldfish</option>
                </slot>

                <select name="pets" id="pet-select" class="input" placeholder="${this.getAttribute("placeholder")}">
                    <option value="">${this.placeholder || "select an option"}</option>
                </select>
            </div>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                }

                #option-slot {
                    display: none;
                }
            </style>
        `;
    }

    get value() {
        return this.getAttribute("value") || "";
    }

    get label() {
        return this.getAttribute("label") || "";
    }

    get placeholder() {
        return this.getAttribute("placeholder") || "";
    }

    get id() {
        return this.getAttribute("id") || "select";
    }

    get optionSlot() {
        return this.shadowRoot.querySelector("#option-slot");
    }

    connectedCallback() {
        let mainSelect = this.shadowRoot.querySelector("select");
        mainSelect.append(...this.optionSlot.assignedElements());
    }
}

customElements.define("wc-select", wcSelect);

export default wcSelect;