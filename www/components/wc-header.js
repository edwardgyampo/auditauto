import wc from "/components/wc.js";

class wcHeader extends wc {
    constructor() {
        super();
    }

    get wcTemplate() {
        return wc.html`
        <div>
            <div class="text">
                <a class="brand" href="/index.html">AuditAuto</a>
                <h1 class="title">Guiding automobile businesses into growth.</h1>
                <p class="description">
                    State your current situation after using an automobile and we'll provide thorough
                    assessment of your data to manufacturers to satisfy your demands.
                </p>
            </div>
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
                    padding: 24px;
                    overflow: hidden;
                }

                .text {
                    max-width: 560px;
                }

                .brand {
                    display: inline-flex;
                    font-size: 17px;
                    margin-bottom:13px;
                    color: rgb(var(--color-primary));
                }

                .title {
                    margin-bottom: 14px;
                    color: rgba(var(--color-on-background), .75);
                    font-size: 36px;
                    text-transform: uppercase;
                }

                .description {
                    font-size: 24px;
                    color: rgba(var(--color-on-background), .6);
                }
            </style>
        `;
    }
}

customElements.define("wc-header", wcHeader);

export default wcHeader;