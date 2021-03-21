(async function () {
    let manufacturers = await postData("/manufacturers/read");
    let select = document.getElementById("manufacturer-select");
    select.repopulate(manufacturers);

    select.wcBuiltIn.addEventListener("change", () => {
        updateAutomobileSelect();
    });
})();

async function updateAutomobileSelect() {
    let manufacturerSelect = document.getElementById("manufacturer-select");
    let select = document.getElementById("automobile-select");
    let automobiles = await postData("/automobiles/read/for-manufacturer", {
        manufacturerId: manufacturerSelect.value
    });
    select.repopulate(automobiles);
}

(function Next() {
    let nextButton = document.getElementById("next-button");
    let textInputsAlert = document.getElementById("text-inputs-alert");
    let conditionSelectionAlert = document.getElementById("condition-selection-alert");
    let automobileSelectionAlert = document.getElementById("automobile-selection-alert");

    let inputs = [...document.querySelectorAll("wc-text-input")];
    let conditionCheckboxes = [...document.querySelectorAll("wc-checkbox.automobile-condition")];
    let selects = [...document.querySelectorAll("wc-select")];

    let hasInvalidSelect = () => {
        return selects.some(select => {
            return !select.value;
        });
    };

    let validateSelects = () => {
        let alert = automobileSelectionAlert;
        alert.classList.toggle("hidden", !hasInvalidSelect());
    };

    selects.forEach(e => e.wcBuiltIn.addEventListener("change", () => validateSelects()));

    nextButton.addEventListener("click", () => {
        let isSelectedCondition = conditionCheckboxes.some(checkbox => checkbox.wcBuiltIn.checked);
        let hasInvalidInput = inputs.some(input => !input.isValid);
        
        validateSelects();
        conditionSelectionAlert.classList.toggle("hidden", isSelectedCondition);

        // To go to next page, no validation should be false.
        let validations = [
            !hasInvalidInput,
            !hasInvalidSelect(),
            isSelectedCondition
        ];

        if (validations.includes(false)) {
            let invalidInputs = inputs.filter(e => !e.isValid);
            invalidInputs.forEach(e => e.validate());
            textInputsAlert.classList.remove("hidden");
        }
        else {
            textInputsAlert.classList.add("hidden");
            window.location.href = '/pages/info/index.html';
        }
    });
})();

(function CookieAgreement() {
    let hasAllowedCookies = localStorage.getItem("has-allowed-cookies");

    let cookiesAgreementDialog = document.getElementById("cookies-agreement-dialog");
    let isFirstVisit = localStorage.getItem("is-first-visit") == null;

    if (isFirstVisit) {
        cookiesAgreementDialog.classList.remove("hidden");
    }

    let acceptButton = cookiesAgreementDialog.querySelector("#accept-button");
    let denyButton = cookiesAgreementDialog.querySelector("#deny-button");

    acceptButton.addEventListener("click", () => {
        localStorage.setItem("is-first-visit", false);
        localStorage.setItem("has-allowed-cookies", true);
        cookiesAgreementDialog.classList.add("hidden");
    });

    denyButton.addEventListener("click", () => {
        localStorage.setItem("is-first-visit", false);
        localStorage.setItem("has-allowed-cookies", false);
        cookiesAgreementDialog.classList.add("hidden");
    });
})();