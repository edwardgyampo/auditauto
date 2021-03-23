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
                <div class="ui">
                    <div class="invisible-backdrop"></div>

                    <p class="ui__label">${this.label}</p>

                    <div class="head">
                        <p class="head__label"></p>

                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26.82" height="16.947" viewBox="0 0 26.82 16.947">
                                <path id="Path_2" data-name="Path 2" d="M1449.245,45.841l12,14,12-14" transform="translate(-1447.835 -44.431)" stroke="currentColor" stroke-linecap="round" stroke-width="2"/>
                            </svg>
                        </div>
                    </div>

                    <div class="body-wrapper">
                        <div class="body">
                        
                        </div>
                    </div>
                </div>

                <div class="core">
                    <label for="${this.id || " select-0"}">${this.label || "no label"}</label>
            
                    <slot id="option-slot" style="display: none"></slot>
                
                    <select class="hidden" name="${this.name}" id="pet-select" class="input" placeholder="${this.getAttribute(" placeholder")}">
                    </select>
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
                    display: inline-flex;
                    flex-direction: column;
                    width: 280px;
                }

                .ui .head {
                    position: relative;
                    z-index: 1;
                    display: inline-flex;
                    align-items: center;
                    height: 50px;
                    padding: 0 10px;
                    border-radius: 5px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    background-color: #fff;
                    cursor: pointer;
                }

                .ui__label {
                    padding: 10px;
                    font-size: 14px;
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

                .icon {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    width: 24px;
                    height: 24px;
                    background-color: #eee;
                    border-radius: 50%;
                }

                .ui .head svg {
                    height: 14px;
                    width: 14px;
                    fill: #333;
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

                .ui .body.visible {
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
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    transform: scaleX(1) scaleY(1);
                    overflow-y: scroll;
                }

                .ui .option {
                    display: none;
                }

                .ui .body.visible .option {
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
                
                .ui .body.visible .option:not(:last-child) {
                    margin-bottom: 5px;
                }

                .ui .body.visible .option:hover {
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

    connectedCallback() {
        this.reset();
        this.updateUI();

        this.wcBuiltIn.addEventListener("change", () => {
            this.updateUI();
        });

        this.uiHead.addEventListener("click", () => {
            this.uiBody.classList.toggle("visible");
            this.uiInvisibleBackdrop.classList.toggle("active");
        });
        
        this.uiInvisibleBackdrop.addEventListener("click", () => {
            this.uiBody.classList.remove("visible");
            this.uiInvisibleBackdrop.classList.remove("active");
        });
    }

    updateUI() {
        this.uiHeadLabel.textContent = this.wcBuiltIn.options[this.wcBuiltIn.selectedIndex].text;
        this.uiBody.innerHTML = "";
        [...this.wcBuiltIn.options].forEach(e => {
            this.uiBody.innerHTML += `
                <div class="option" value="${e.value}">
                    ${e.text}
                </div>
            `;
        });

        [...this.uiBody.querySelectorAll(".option")].forEach(e => {
            e.addEventListener("click", () => {
                this.value = e.getAttribute("value");
                this.uiBody.classList.toggle("visible");
            });
        });
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
        this.updateUI();
    }
}

customElements.define("wc-select", wcSelect);

export default wcSelect;