import wcSelect from "./components/wc-select.js";

(async function () {
    let manufacturers = await postData("/manufacturers/read");
    let select = document.getElementById("manufacturer-select");
    select.repopulate(manufacturers);
    
    select.wcBuiltIn.addEventListener("change", () => {
        updateAutomobileSelect();
    });
})();

async function updateAutomobileSelect () {
    let manufacturerSelect = document.getElementById("manufacturer-select");
    let select = document.getElementById("automobile-select");
    let automobiles = await postData("/automobiles/read/for-manufacturer", {
        manufacturerId: manufacturerSelect.value
    });
    select.repopulate(automobiles);
}