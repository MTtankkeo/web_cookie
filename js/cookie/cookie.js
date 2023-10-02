// A static class manage cookies in client web.
export class Cookie {
    // Returnes currently array of cookie objects.
    static get objects() {
        const cookies = this.split(document.cookie);
        return cookies.map(e => CookieObject.toInstance(e));
    }
    // "key=value; key=value" to [CookieObject, CookieObject]
    static split(text) {
        if (text == "") {
            return [];
        }
        return text.split("; ");
    }
    static update(objects) {
        document.cookie = objects.map(e => e.toString()).join('; ');
    }
    static getObjectByKey(key) {
        return this.objects.find((e) => e.key == key);
    }
    static getObjectByKeyWithNullSafe(key, defaultValue) {
        const object = this.getObjectByKey(key);
        if (object == null) {
            return new CookieObject(key, defaultValue);
        }
        return object;
    }
    static contains(object) {
        return this.objects.some(e => e.key == object.key);
    }
    static addObject(object) {
        this.update([...this.objects, object]);
    }
    static setObject(newObject) {
        const objects = this.objects;
        const existingObject = objects.find((e) => e.key == newObject.key);
        if (existingObject != null) {
            existingObject.value = newObject.value;
            this.update(objects);
        }
        else {
            this.addObject(newObject);
        }
    }
}
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
    static toInstance(text) {
        const [key, value] = text.split('=');
        return new CookieObject(key, value);
    }
}
