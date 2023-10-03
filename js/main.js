import { Cookie } from "./cookie/cookie.js";
class Theme {
    static get browser() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }
        return "light";
    }
    static get(text) {
        return text == "device" ? Theme.browser : text;
    }
}
addEventListener("DOMContentLoaded", () => {
    const theme = Cookie.getObjectByKeyWithNullSafe("theme", "device");
    const [body] = document.getElementsByTagName("body");
    body.className = Theme.get(theme.value);
    theme.addListener(value => body.className = Theme.get(value));
});
