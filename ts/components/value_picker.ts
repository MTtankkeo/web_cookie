import { Cookie } from "../cookie/cookie.js";



class ValuePickerElement extends HTMLElement {
    constructor() { super(); }

    connectedCallback(): void {
        const key = this.getAttribute("key");

        const cookie = Cookie.getObjectByKeyWithNullSafe(key, 'undefined');
        
        this.innerHTML = `<label for="${key}">${key}</label>`;
        this.style.display = "inline-flex";
        this.style.alignItems = "center";

        const inputElement = document.createElement('input');
        inputElement.setAttribute("type", "range");
        inputElement.value = cookie.value ?? "0";
        inputElement.style.marginLeft = "5px";
        inputElement.onchange = () => {
            cookie.setValue(inputElement.value);
        }

        this.appendChild(inputElement);
    }
}
        
customElements.define("value-picker", ValuePickerElement);