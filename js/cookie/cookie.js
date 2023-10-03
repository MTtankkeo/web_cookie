// A static class manage cookies in client web.
export class Cookie {
    // Returnes currently array of cookie objects.
    static get objects() {
        const cookies = this.split(document.cookie);
        return cookies.map(e => CookieObject.createInstanceByRaw(e));
    }
    // Converts the given raw cookies data format to a referenceable
    // cookie-object and returns it to an array.
    // 
    // Example:
    // "key=value; key=value" to [CookieObject, CookieObject]
    static split(text) {
        if (text == "") {
            return [];
        }
        return text.split("; ");
    }
    // Convert the given referenceable cookie-objects into raw cookies data format
    // and permanently store them in your browser.
    //
    static update(objects) {
        document.cookie = objects.map(e => e.toString()).join('; ');
    }
    // Returns the referable object that matches the given key.
    static getObjectByKey(key) {
        return this.objects.find((e) => e.key == key);
    }
    // Returns the referable object that matches the given key.
    // has a default value for the situation of no given key.
    //
    static getObjectByKeyWithNullSafe(key, defaultValue) {
        const object = this.getObjectByKey(key);
        return object !== null && object !== void 0 ? object : new CookieObject(key, defaultValue);
    }
    // Returns whether the given cookie-object exists.
    static contains(object) {
        return this.objects.some(e => e.key == object.key);
    }
    static setObject(object) {
        document.cookie = object.toString();
    }
}
// A class is referenceable cookie object.
export class CookieObject {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    setValue(newValue) {
        Cookie.setObject(new CookieObject(this.key, this.value = newValue));
    }
    toString() {
        return `${this.key}=${this.value}`;
    }
    // Returns the new instance that matches the given ancient cookie data format.
    static createInstanceByRaw(text) {
        const [key, value] = text.split('=');
        return new CookieObject(key, value);
    }
}
