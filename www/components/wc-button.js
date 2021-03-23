import wc from "/components/wc.js";

class wcButton extends wc {
    constructor() {
        super();
    }

    get wcTemplate() {
        return wc.html`
        <div>
            <button>${this.label}</button>    
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
                    width: 280px;
                    height: 45px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    overflow: hidden;
                }
                
                button {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    color: rgb(var(--color-on-primary));
                    font-size: 15px;
                    text-transform: uppercase;
                    background-color: rgb(var(--color-primary));
                }
            </style>
        `;
    }

    get label() {
        return this.getAttribute("label") || "no label";
    }

    get wcBuiltIn() {
        return this.shadowRoot.querySelector("button");
    }
}

customElements.define("wc-button", wcButton);

export default wcButton;