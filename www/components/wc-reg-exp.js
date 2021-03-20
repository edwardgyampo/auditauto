import wc from "/components/wc.js";

class wcRegExp extends wc {
    constructor() {
        super();
    }

    get value() {
        let expr = this.getAttribute("value");
        return ( expr ? new RegExp(expr) : /^.*$/);
    }

    get description() {
        return this.getAttribute("description");
    }
 }

customElements.define("wc-reg-exp", wcRegExp);