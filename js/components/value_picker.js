import { Cookie } from "../cookie/cookie.js";
class ValuePickerElement extends HTMLElement {
    constructor() { super(); }
    connectedCallback() {
        var _a;
        const key = this.getAttribute("key");
        const cookie = Cookie.getObjectByKeyWithNullSafe(key, 'undefined');
        this.innerHTML = `<label for="${key}">${key}</label>`;
        this.style.display = "inline-flex";
        this.style.alignItems = "center";
        const inputElement = document.createElement('input');
        inputElement.setAttribute("type", "range");
        inputElement.value = (_a = cookie.value) !== null && _a !== void 0 ? _a : "0";
        inputElement.style.marginLeft = "5px";
        inputElement.onchange = () => {
            cookie.setValue(inputElement.value);
        };
        this.appendChild(inputElement);
    }
}
customElements.define("value-picker", ValuePickerElement);
