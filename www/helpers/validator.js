class Validator {
    constructor() {
        this.value = "";
        this.regExp = "";
    }

    validate() {
        return this.regExp.test(this.value);
    }
}

export default Validator;