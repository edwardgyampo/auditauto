import CookieAgreement from "/classes/cookieAgreement.js";

class App {
    static get userData() {
        return JSON.parse(localStorage.getItem("userData")) || {};
    }

    static get manufacturerSelect() {
        return document.querySelector("wc-select.manufacturer")
    }

    static get automobileSelect() {
        return document.querySelector("wc-select.automobile");
    }

    static get nextButton() {
        return document.querySelector(".button.next");
    }

    static get textInputs() {
        return [...document.querySelectorAll("wc-text-input")];
    }
    
    static get selects() {
        return [...document.querySelectorAll("wc-select")];
    }

    static get checkboxes() {
        return  [...document.querySelectorAll("wc-checkbox")];
    }

    static init() {
        App.nextButton.addEventListener("click", () => App.onClickNextButton());
        
        App.initTextInputsFromData(App.userData.textInputs);
        App.initSelectsFromData(App.userData.selects);
        App.initCheckboxesFromData(App.userData.checkboxes);

        new CookieAgreement();
    }

    static async initSelectsFromData(data = {}) {
        let manufacturers = await postData("/manufacturers/read");

        App.manufacturerSelect.repopulate(manufacturers);

        let isRecoveryChange = true;
        
        App.automobileSelect.addEventListener("selectautomobile", (e) => {
            if (isRecoveryChange) {
                let autoValue = data.automobile && data.automobile.value;
                App.automobileSelect.value = autoValue || "";
                isRecoveryChange = false;
            }
        });

        App.manufacturerSelect.addEventListener("selectmanufacturer", async (e) => {
            await App.updateAutomobileSelect();
            App.automobileSelect.dispatchEvent(new CustomEvent("selectautomobile", {
                detail: {
                    value: e.detail.value
                }
            }))
        });

        App.manufacturerSelect.wcBuiltIn.addEventListener("change", async () => {
            await App.updateAutomobileSelect();
        });

        App.manufacturerSelect.value =  data.manufacturer && data.manufacturer.value || "";
        App.manufacturerSelect.dispatchEvent(new CustomEvent("selectmanufacturer", {
            detail: {
                value: App.manufacturerSelect.value
            }
        }))
    }

    static initTextInputsFromData(data = {}) {
        App.textInputs.forEach(e => e.value = data[e.name] || e.value);
    }

    static initCheckboxesFromData(data = {}) {
        App.checkboxes.forEach(e => e.checked = data[e.name] || e.checked);
    }

    static onClickNextButton() {
        let validations = [App.validateTextInputs(), App.validateSelects(), App.validateCheckboxes()];
        let invalidForm = validations.some(passed => !passed);

        let mainAlert = document.querySelector(".alert.main");
        mainAlert.classList.toggle("hidden", !invalidForm);

        if (invalidForm) return;

        let buffer = { selects: {}, textInputs: {}, checkboxes: {} };        
        App.selects.forEach(select => {
            let e = select.wcBuiltIn;
            let key = buffer.selects[e.name] = {};
            key.textValue = e.options[e.selectedIndex].text;
            key.value = e.value;
        });

        App.textInputs.forEach(e => buffer.textInputs[e.name] = e.value);
        App.checkboxes.forEach(e => {
            if (e.checked) buffer.checkboxes[e.name] = e.checked
        });

        localStorage.setItem("userData", JSON.stringify(buffer));
        
        window.location.href = '/pages/preview.html';
    }

    static validateTextInputs() {
        let invalids = App.textInputs.filter(e => !e.isValid);
        invalids.forEach(e => e.validate());
        return invalids.length == 0;
    }

    static validateCheckboxes() {
        let fn = checkbox => checkbox.wcBuiltIn.checked;
        let areSomeSelected = App.checkboxes.some(fn);
        let alert = document.querySelector(".alert.checkbox");
        alert.classList.toggle("hidden", areSomeSelected);
        return areSomeSelected;
    }

    static validateSelects() {
        let bool = true;
        App.selects.forEach(e => {
            bool = bool && e.validate();
        });
        return bool;
    }

    static async updateAutomobileSelect() {
        if (!App.manufacturerSelect.value) return false;
        
        let automobiles = await postData("/automobiles/read/for-manufacturer", {
            manufacturerId: App.manufacturerSelect.value
        });
        
        App.automobileSelect.repopulate(automobiles);
    }
}

App.init();