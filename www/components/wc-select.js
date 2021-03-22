import wc from "/components/wc.js";
import Validator from "/classes/validator.js";

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
                <label for="${this.id || " select-0"}">${this.label || "no label"}</label>
            
                <slot id="option-slot" style="display: none"></slot>
            
                <select name="${this.name}" id="pet-select" class="input" placeholder="${this.getAttribute(" placeholder")}">
                </select>
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
        return this.shadowRoot.querySelector("select");
    }

    get value() {
        return this.wcBuiltIn.value;
    }

    set value(val) {
        this.wcBuiltIn.value = val;
    }

    get label() {
        return this.getAttribute("label") || "";
    }

    get name() {
        return this.getAttribute("name") || "";
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
        this.reset();
    }

    static optionsFromData(data = []) {
        return data.map(obj => wc.html`<option value="${obj.id}">${obj.name}</option>`);
    }

    reset() {
        this.wcBuiltIn.innerHTML = "";
        let clones = this.optionSlot.assignedElements().map(e => e.cloneNode(true));
        this.wcBuiltIn.append(...clones);
    }
    
    repopulate(data = []) {
        this.wcBuiltIn.innerHTML = "";
        let clones = this.optionSlot.assignedElements().map(e => e.cloneNode(true));
        this.wcBuiltIn.append(...clones, ...wcSelect.optionsFromData(data));
    }
}

customElements.define("wc-select", wcSelect);

export default wcSelect;