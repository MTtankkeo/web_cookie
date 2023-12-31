import { Cookie, CookieObject } from "./cookie/cookie.js";



class Theme {
    static get browser(): string {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return "dark";
        }

        return "light";
    }

    static get(text: string): string {
        return text == "device" ? Theme.browser : text;
    }
}



addEventListener("DOMContentLoaded", () => {
    const theme = Cookie.getObjectByKeyWithNullSafe("theme", "device");

    const [body] = document.getElementsByTagName("body");
    body.className = Theme.get(theme.value);

    Cookie.addListener<string>({
        key: "theme",
        listener(value: string) {
            console.log(`Update to ${value}`);
        },
    })

    theme.addListener(value => {
        body.className = Theme.get(value);
    });
});