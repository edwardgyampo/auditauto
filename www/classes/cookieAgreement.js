class CookieAgreement {
    constructor() {
        this.isAllowedCookies = localStorage.getItem("isAllowedCookies") ?? false;

        this.isFirstVisit = JSON.parse(localStorage.getItem("isFirstVisit")) ?? true;
                
        if (this.isFirstVisit) CookieAgreement.dialog.classList.remove("hidden");

        CookieAgreement.acceptButton.addEventListener("click", () => CookieAgreement.onClickAcceptButton());

        CookieAgreement.denyButton.addEventListener("click", () => CookieAgreement.onClickDenyButton());
    }

    static get acceptButton() {
        return CookieAgreement.dialog.querySelector(".button.accept");
    }

    static get denyButton() {
        return CookieAgreement.dialog.querySelector(".button.deny");
    }

    static get dialog() {
        return document.querySelector(".cookies-agreement");
    }

    static onClickAcceptButton() {
        localStorage.setItem("isFirstVisit", false);
        localStorage.setItem("isAllowedCookies", true);
        CookieAgreement.dialog.classList.add("hidden");
    }

    static onClickDenyButton() {
        localStorage.setItem("isFirstVisit", false);
        localStorage.setItem("isAllowedCookies", false);
        CookieAgreement.dialog.classList.add("hidden");
    }
}

export default CookieAgreement;