import wcSelect from "/components/wc-select.js";

// Adding a manufacturer.
(async function () {
    let btn = document.getElementById("add-button");

    btn.addEventListener("click", async () => {
        let url = "/manufacturers/create";
        let manufacturers = await postData(url, {
            name: document.getElementById("name-input").value,
        });
        console.log(manufacturers);
        updateManufaturerSelect();
    });
})();

// Fetching manufacturers for selection.
updateManufaturerSelect();

// Removing a manufacturer.
(async function () {
    let btn = document.getElementById("remove-button");

    btn.addEventListener("click", async () => {
        let url = "/manufacturers/delete";
        let result = await postData(url, {
            id: document.querySelector("#manufacturer-select-wrapper wc-select").value,
        });
        console.log(result);
        updateManufaturerSelect();
    });
})();

async function updateManufaturerSelect() {
    let manufacturers = await postData("/manufacturers/read");
    let wrapper = document.getElementById("manufacturer-select-wrapper");
    wrapper.innerHTML = "";
    wrapper.append(wcSelect.optionsFromData(manufacturers));
}