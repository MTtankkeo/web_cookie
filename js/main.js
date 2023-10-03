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
    Cookie.addListener({
        key: "theme",
        listener(value) {
            console.log(`Update to ${value}`);
        },
    });
    theme.addListener(value => {
        body.className = Theme.get(value);
    });
});
