import wc from "/components/wc.js";

class wcFooter extends wc {
    constructor() {
        super();
    }

    get wcTemplate() {
        return wc.html`
        <div>
        </div>
        `;
    }

    get wcStyle() {
        return wc.html`
            <style>
                :host {
                    display: inline-flex;
                    width: 100%;
                }
                
                :host>div {
                    display: inline-flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    width: 100%;
                    height: 260px;
                    padding: 24px;
                    background-color: rgba(var(--color-secondary-variant));
                    overflow: hidden;
                }
            </style>
        `;
    }
}

customElements.define("wc-footer", wcFooter);

export default wcFooter;