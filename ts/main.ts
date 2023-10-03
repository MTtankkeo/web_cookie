import { Cookie, CookieObject } from "./cookie/cookie.js";



addEventListener("DOMContentLoaded", () => {
    // const cookie = new CookieObject("theme", "light");

    const theme = Cookie.getObjectByKeyWithNullSafe<string>("theme", "device");
    theme.setValue("light");

    console.log(Cookie.getObjectByKey("theme").value);
});