updateManufaturerSelect();

// Adding a manufacturer.
(async function () {
    let btn = document.querySelector("wc-button.add-manufacturer");
    let input = document.querySelector("wc-input.manufacturer-name");

    btn.addEventListener("click", async () => {
        let url = "/manufacturers/create";
        let manufacturers = await postData(url, {
            name: input.value,
        });
        console.log(manufacturers);
        updateManufaturerSelect();
    });
})();

// Removing a manufacturer.
(async function () {
    let btn = document.querySelector("wc-button.remove-manufacturer");

    btn.addEventListener("click", async () => {
        let url = "/manufacturers/delete";
        let result = await postData(url, {
            id: document.querySelector("wc-select.manufacturer").value,
        });
        updateManufaturerSelect();
    });
})();

async function updateManufaturerSelect() {
    let manufacturers = await postData("/manufacturers/read");
    let select = document.querySelector("wc-select.manufacturer");
    select.repopulate(manufacturers);
}