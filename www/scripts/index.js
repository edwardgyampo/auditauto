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
        return [...document.querySelectorAll("wc-checkbox")];
    }

    static get sampleDataManufacturers() {
        return App.sampleData.map((obj, i) => {
            return { id: i + 1, name: obj.name };
        });
    }

    static get sampleDataAutomobiles() {
        let data = App.sampleData.map((obj, i) => {
            return { id: i + 1, models: obj.models };
        });
        return data;
    }

    static init() {
        App.nextButton.addEventListener("click", () => App.onClickNextButton());

        App.initTextInputsFromData(App.userData.textInputs);
        App.initSelectsFromData(App.userData.selects);
        App.initCheckboxesFromData(App.userData.checkboxes);
    }

    static async initSelectsFromData(data = {}) {
        App.manufacturerSelect.repopulate(App.sampleDataManufacturers);

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

        App.manufacturerSelect.value = data.manufacturer && data.manufacturer.value || "";
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
        mainAlert.classList.remove("is-active");
        setTimeout(() => {
            mainAlert.classList.toggle("is-active", invalidForm);
        });

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
            if (e.checked) {
                buffer.checkboxes[e.name] = { label: e.label };
            }
        });

        localStorage.setItem("userData", JSON.stringify(buffer));

        window.location.href = '/html/preview.html';
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
        alert.classList.remove("is-active");
        setTimeout(() => {
            alert.classList.toggle("is-active", !areSomeSelected);
        });
        return areSomeSelected;
    }

    static validateSelects() {
        let bool = true;
        App.selects.forEach(e => {
            bool = bool && e.validate();
        });
        return bool;
    }

    // Returns all models for manufacturer while maintaining
    // unique ids even though arrays are used.
    // NB: Allows persisting data for reuse upon site revisit.
    // Eg. User should be able to see last-selected model, before they
    // decide to make changes.
    // So where there is a total of 50 models, ids should start from 1 to
    // 50 in-spite-of re-indexing (0 to 5) applied to 'models' arrays in App.sampleData
    static getModelByManufacturerId(id) {
        let modelCount = 0;

        let data = App.sampleDataAutomobiles.find(obj => {
            let isMatch = obj.id == id;
            if (!isMatch) modelCount += obj.models.length;
            return isMatch;
        });

        return data.models.map((model) => {
            return { id: ++modelCount, name: model };
        });
    }

    static async getModelByManufacturerIdDb(id) {
        return await postData("/automobiles/read/for-manufacturer", {
            manufacturerId: id
        });
    }

    static async getManufacturersDb() {
        return await postData("/manufacturers/read");
    }

    static async updateAutomobileSelect() {
        let isManufacturerSelected = App.manufacturerSelect.value;
        let select =  App.automobileSelect;
        if (!isManufacturerSelected) {
            select.repopulate([]);
            return;
        }
        let manufacturerId = App.manufacturerSelect.value;
        let models = App.getModelByManufacturerId(manufacturerId);
        select.repopulate(models);
    }

    static get sampleData() {
        return [
            {
                name: 'Volkswagen',
                models: [
                    'Atlas',
                    'Tiguan',
                    'Jetta',
                    'Passat',
                    'Golf',
                ]
            },
            {
                name: 'Nissan',
                models: [
                    'Versa',
                    'Sentra',
                    'Altima',
                    'Maxima',
                    'Pathfinder',
                ]
            },
            {
                name: 'BMW',
                models: [
                    '2 Series coupé',
                    '3 Series Sedan',
                    '3 Series Touring',
                    '4 Series Convertible',
                    'Z4',
                ]
            },
            {
                name: 'Tesla Inc.',
                models: [
                    'Model S',
                    'Model Y',
                    'Model 3',
                    'Model X',
                    'Cybertruck',
                ]
            },
            {
                name: 'Ford',
                models: [
                    'Fusion',
                    'Mustang',
                    'Bronco',
                    'Expedition',
                    'Ranger',
                ]
            },
            {
                name: 'Toyota',
                models: [
                    'Avalon',
                    'Camry',
                    'Corolla',
                    'Sienna',
                    'Yaris',
                ]
            },
            {
                name: 'Mercedes-Benz',
                models: [
                    'GLA SUV',
                    'GLB SUV',
                    'GLC SUV',
                    'GLC Coupe',
                    'GLS SUV',
                ]
            },
            {
                name: 'Honda',
                models: [
                    'Atlas',
                    'Tiguan',
                    'Jetta',
                    'Passat',
                    'Golf',
                ]
            },
            {
                name: 'Audi',
                models: [
                    'RS 7',
                    'TTS',
                    'e-tron GT',
                    'A4 allroad',
                    'A7 e',
                ]
            },
            {
                name: 'Kia',
                models: [
                    'Soul',
                    'Sportage',
                    'Seltos',
                    'Telluride',
                    'Carnival MPV',
                ]
            },
        ];
    }
}

App.init();