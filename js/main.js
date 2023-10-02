import { Cookie } from "./cookie/cookie.js";
addEventListener("DOMContentLoaded", () => {
    // const cookie = new CookieObject("theme", "light");
    const theme = Cookie.getObjectByKeyWithNullSafe("theme", "device");
    theme.setValue("light");
    console.log(Cookie.getObjectByKey("theme").value);
});
