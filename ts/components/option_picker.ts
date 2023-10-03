import { Cookie } from "../cookie/cookie.js";



class OptionPickerElement extends HTMLElement {
    constructor() { super(); }

    connectedCallback(): void {
        const key = this.getAttribute("key");
        const options = this.getAttribute("options").split(", ");

        const cookie = Cookie.getObjectByKeyWithNullSafe(key, 'undefined');
        
        this.innerHTML = `<label for="${key}">${key}</label>`;

        function createOptionElement(e: string): string {
            return `<option value="${e}" ${cookie.value == e ? "selected" : ""}>${e}</option>`;
        }

        const selectElement = document.createElement("select");
        selectElement.id = key;
        selectElement.style.marginLeft = "5px";
        selectElement.innerHTML = options.map(createOptionElement).join("");
        selectElement.onchange = () => {
            cookie.setValue(selectElement.value);
        }

        this.appendChild(selectElement);
    }
}
        
customElements.define("option-picker", OptionPickerElement);