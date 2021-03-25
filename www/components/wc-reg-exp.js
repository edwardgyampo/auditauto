import wc from "/components/wc.js";

// The custom-defined reg-exp tag when used directly in an
// input (custom-tag) inside html, adds to the series of input
// checkings that are run by a validator (object) field of an
// input instance.
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