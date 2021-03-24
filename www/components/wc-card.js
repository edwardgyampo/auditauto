import wc from "/components/wc.js";

class wcCard extends wc {
    constructor() {
        super();
    }

    get wcTemplate() {
        return wc.html`
        <div>
            <slot class="icon" name="icon"></slot>
        
            <h1 class="title">${this.title || "no title"}</h1>
            <p class="description">${this.description || "no description"}</p>
            <p class="conclusion">${this.conclusion || "no conclusion"}</p>

            <slot name="buttons">
                <wc-button class="edit" label="Make Changes"></wc-button>
            </slot>
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
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 296px;
                    height: 460px;
                    box-shadow: 0 0 8px rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    overflow: hidden;
                }
                
                .icon {
                    display: inline-flex;
                    width: 128px;
                    height: 128px;
                    margin-bottom: 24px;
                    border-radius: 5px;
                }

                .icon::slotted(*) {
                    height: 100%;
                }

                .title {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 8px;
                }
                
                .description {
                    margin-bottom: 14px;
                    text-align: center;
                }
                
                .conclusion {
                    font-size: 14px;
                    text-align: center;
                    margin-bottom: 18px;
                }

                wc-button {
                    margin-bottom: 14px;
                }

                wc-button.ok {
                    width: 100px;
                }

                wc-button.edit {
                    width: 140px;
                }
            </style>
        `;
    }

    get title() {
        return this.getAttribute("title");
    }

    get description() {
        return this.getAttribute("description");
    }

    get conclusion() {
        return this.getAttribute("conclusion");
    }

    get titleEl() {
        return this.shadowRoot.querySelector(".title");
    }
    
    get descriptionEl() {
        return this.shadowRoot.querySelector(".description");
    }

    get conclusionEl() {
        return this.shadowRoot.querySelector(".conclusion");
    }

    static get observedAttributes() {
        return ["title", "description", "conclusion"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "title":
                this.titleEl.textContent = newValue;
                break;
            case "description":
                this.descriptionEl.textContent = newValue;
                break;
            case "conclusion":
                this.conclusionEl.textContent = newValue;
                break;
        }
    }
}

customElements.define("wc-card", wcCard);

export default wcCard;