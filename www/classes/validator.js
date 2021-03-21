class Validator {
    constructor(obj) {
        this.obj = obj;
        this.unmatchedRegExps = [];
        this.notification = "";
    }

    // Regular Expressions which determine the validity
    // of the object (obj) to which they are assigned.
    get regExps() {
        return this.obj.querySelectorAll("wc-reg-exp");
    }

    get isValueRequired()
    {
        return this.obj.hasAttribute("required");
    }

    resetHistory() {
        this.unmatchedRegExps = [];
        this.notification = "";
    }

    // Test if all regular expressions were matched.
    validate() {
        this.resetHistory();

        if (this.isValueRequired && !this.obj.value) {
            this.notification = "Input required!";
            return false;
        }

        this.regExps.forEach(async (expr) => {
            let match = expr.value.test(this.obj.value);
            if (!match) this.unmatchedRegExps.push(expr);
        });

        let descs = this.unmatchedRegExps.map(regExp => regExp.description);
        this.notification = descs.pop() || "";

        return this.unmatchedRegExps.length == 0;
    }

    get regExp() {
        return this.obj.regExp || /^.*$/;
    }
}

export default Validator;