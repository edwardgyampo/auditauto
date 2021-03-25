class Preview {
    static init() {
        this.userData = JSON.parse(localStorage.getItem('userData'));

        let finalData = {
            name: Preview.name,
            email: Preview.email,
            refcode: Preview.refcode,
            make: Preview.make,
            model: Preview.model,
            conditions: Preview.conditions
        };

        document.querySelector(".full-name").textContent = Preview.name;
        document.querySelector(".reference-code").textContent = Preview.refcode;
        document.querySelector(".email").textContent = Preview.email;
        document.querySelector(".manufacturer").textContent = Preview.make;
        document.querySelector(".automobile").textContent = Preview.model;
        document.querySelector(".conditions").textContent = Preview.conditions;
        
        Preview.submitButton.addEventListener("click", () => {
            console.log(finalData);
        });
    }

    static get submitButton() {
        return document.querySelector("wc-button.submit");
    }

    static get name() {
        const maxLength = 30;
        let text = this.userData.textInputs.fullName;
        if (text.length <= maxLength) return text;
        let newText = text.substring(0, maxLength);
        return newText + "...";
    }

    static get email () {
        return this.userData.textInputs.emailAddress;
    }

    static get refcode () {
        return this.userData.textInputs.referenceCode;
    }

    static get make () {
        return this.userData.selects.manufacturer.textValue;
    }

    static get model () {
        return this.userData.selects.automobile.textValue;
    }

    static get conditions() {
        let kvPairs = Object.entries(this.userData.checkboxes);
        let checkboxes = kvPairs.map(arr => arr[1]);
        let labels = checkboxes.map(obj => obj.label);
        return labels.join(", ");
    }
}

Preview.init();