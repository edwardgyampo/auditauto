class Preview {
    static init() {
        this.userData = JSON.parse(localStorage.getItem('userData'));

        let finalData = {
            name: Preview.name,
            conditions: Preview.conditions,
            email: Preview.email,
            refcode: Preview.refcode,
            make: Preview.make,
            model: Preview.model
        };

        let card = document.querySelector("wc-card");
        card.setAttribute("title", `Form Ready!`);
        
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
        return Object.keys(this.userData.checkboxes).join(", ");
    }
}

Preview.init();