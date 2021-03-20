import wcSelect from "./components/wc-select.js";

(async function () {
    let manufacturers = await postData("/manufacturers/read");
    let select = document.getElementById("manufacturer-select");
    select.append(wcSelect.optionsFromData(manufacturers));
})();