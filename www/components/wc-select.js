import wc from "/components/wc.js";
import Validator from "/classes/validator.js";

class wcSelect extends wc {
    constructor() {
        super();
        this.validator = new Validator(this);
    }

    get wcTemplate() {
        return wc.html`
            <div>
                <div class="ui">
                    <div class="invisible-backdrop"></div>

                    <p class="ui__label">${this.label || "No Label"}</p>

                    <div class="head">
                        <p class="head__label"></p>

                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="25.323" viewBox="0 0 44 25.323">
                                <path id="Polygon_1" data-name="Polygon 1" d="M21.245.869a1,1,0,0,1,1.51,0l19.807,22.8a1,1,0,0,1-.755,1.656H2.193a1,1,0,0,1-.755-1.656Z" transform="translate(44 25.323) rotate(180)"/>
                            </svg>
                        </div>

                        <p class="alert"></p>
                    </div>

                    <div class="body-wrapper">
                        <div class="body">
                        
                        </div>
                    </div>
                </div>

                <div class="core">
                    <label for="${this.id || " select-0"}">${this.label || "no label"}</label>
            
                    <slot id="option-slot" style="display: none"></slot>
                
                    <select class="hidden" name="${this.name}" id="pet-select" class="input" placeholder="${this.getAttribute(" placeholder")}"></select>
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
                    display: inline-flex;
                }

                .core {
                    display: none;
                }

                .ui {
                    position: relative;
                    display: inline-flex;
                    flex-direction: column;
                    width: 280px;
                }

                .ui .alert {
                    display: none;
                    position: absolute;
                    bottom: 2px;
                    right: 5px;
                    font-size: 11px;
                    color: red;
                }

                :host([is-invalid]) .ui .alert {
                    display: inline-flex;
                    animation: shake 120ms ease-in-out 3;
                }

                .ui .head {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    height: 60px;
                    padding: 0 10px;
                    border-radius: 5px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    background-color: #fff;
                    border-bottom: 3px solid rgb(var(--color-primary-variant));
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    cursor: pointer;
                }

                .ui__label {
                    padding: 10px;
                    font-size: 14px;
                    color: rgb(var(--color-primary-variant));
                }

                .ui .head__label {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    height: 40px;
                    width: 224px;
                    font-size: 15px;
                    background-color: #fff;
                    /* box-shadow: inset 0 0 8px rgba(0, 0, 0, .1); */
                    border-radius: 5px;
                    margin-right: 10px;
                }

                .ui .icon {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 24px;
                    height: 24px;
                    background-color: #eee;
                    border-radius: 50%;
                    transition: all 200ms ease-in-out;
                }

                :host([is-open]) .ui .icon {
                    transform: rotateZ(180deg);
                }

                .ui .head svg {
                    height: 14px;
                    width: 14px;
                    fill: rgb(var(--color-primary-variant));
                    color: transparent;
                }

                .ui .body-wrapper {
                    position: relative;
                    display: inline-flex;
                    height: 0;
                    width: 100%;
                }

                .ui .body {
                    transform: scaleX(1) scaleY(0);
                    transform-origin: top center;
                    transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 200ms;
                }

                :host([is-open]) .ui .body {
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    left: 0;
                    display: inline-flex;
                    flex-direction: column;
                    width: 100%;
                    max-height: 320px;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 5px;
                    border-top-left-radius: 0;
                    border-top-right-radius: 0;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    transform: scaleX(1) scaleY(1);
                    overflow-y: scroll;
                }

                .ui .option {
                    display: none;
                }

                :host([is-open]) .ui .body .option {
                    display: inline-flex;
                    align-items: center;
                    flex-shrink: 0;
                    padding-left: 10px;
                    width: 100%;
                    height: 50px;
                    font-size: 15px;
                    border-radius: 5px;
                    background-color: #fafafa;
                    cursor: pointer;
                    transition: all ease-in-out 150ms;
                }
                
                :host([is-open]) .ui .option:not(:last-child) {
                    margin-bottom: 5px;
                }

                :host([is-open]) .ui .option:hover {
                    background-color: #eee;
                }
                
                .ui .invisible-backdrop.active {
                    position:fixed;
                    top: 0;
                    left:0;
                    z-index: 0;
                    width: 100vw;
                    height: 100vh;
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
        return this.shadowRoot.querySelector("select");
    }

    get value() {
        return this.wcBuiltIn.value;
    }

    set value(val) {
        this.wcBuiltIn.value = val;
        this.wcBuiltIn.dispatchEvent(new Event('change', { 'bubbles': true }));
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

    get alert() {
        return this.shadowRoot.querySelector(".alert");
    }

    get ui() {
        return this.shadowRoot.querySelector(".ui");
    }

    get uiHead() {
        return this.shadowRoot.querySelector(".ui .head")
    }

    get uiHeadLabel() {
        return this.shadowRoot.querySelector(".ui .head__label")
    }

    get uiBody() {
        return this.shadowRoot.querySelector(".ui .body");
    }

    get uiInvisibleBackdrop() {
        return this.shadowRoot.querySelector(".ui .invisible-backdrop");
    }

    static optionsFromData(data = []) {
        let newOptions =  data.map(obj => wc.html`<option value="${obj.id}">${obj.name}</option>`);
        return newOptions;
    }
    
    get isValid() {
        return this.validator.validate();
    }

    connectedCallback() {
        this.reset();
        this.updateUI();

        this.uiHead.addEventListener("click", () => {
            this.toggleAttribute("is-open");
            this.uiInvisibleBackdrop.classList.toggle("active");
        });
        
        this.uiInvisibleBackdrop.addEventListener("click", () => {
            this.removeAttribute("is-open");
            this.uiInvisibleBackdrop.classList.remove("active");
        });

        this.wcBuiltIn.addEventListener("change", () => {
            this.validate();
            this.updateUI();
            this.uiInvisibleBackdrop.classList.remove("active");
        });
    }

    get textValue() {
        let selected = this.wcBuiltIn.options[this.wcBuiltIn.selectedIndex];
        return selected ? selected.text : "";
    }

    updateUI() {
        this.uiHeadLabel.textContent = this.textValue;
        this.uiBody.innerHTML = "";
        [...this.wcBuiltIn.options].forEach(e => {
            // console.log(this.name, e.text);
            this.uiBody.innerHTML += `
                <div class="option" value="${e.value}">
                    ${e.text}
                </div>
            `;
        });

        [...this.uiBody.querySelectorAll(".option")].forEach(e => {
            e.addEventListener("click", () => {
                this.value = e.getAttribute("value");
                this.toggleAttribute("is-open");
            });
        });
    }

    updateAlert() {
        this.alert.textContent = this.validator.notification;
    }

    validate() {
        let bool = this.validator.validate();
        this.toggleAttribute("is-invalid", !bool);
        this.updateAlert();
        return bool;
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
        this.updateUI();
    }
}

customElements.define("wc-select", wcSelect);

export default wcSelect;