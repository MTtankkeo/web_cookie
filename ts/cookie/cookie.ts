


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
    static split(text: string): string[] {
        if (text == "") {
            return [];
        }
        
        return text.split("; ");
    }

    // Convert the given referenceable cookie-objects into raw cookies data format
    // and permanently store them in your browser.
    //
    static update(objects: CookieObject<any>[]): void {
        document.cookie = objects.map(e => e.toString()).join('; ');
    }
    
    // Returns the referable object that matches the given key.
    static getObjectByKey<T>(key: string): CookieObject<T> {
        return this.objects.find((e) => e.key == key);
    }

    // Returns the referable object that matches the given key.
    // has a default value for the situation of no given key.
    //
    static getObjectByKeyWithNullSafe<T>(key: string, defaultValue: T): CookieObject<T> {
        const object = this.getObjectByKey<T>(key);
        
        return object ?? new CookieObject(key, defaultValue);
    }

    // Returns whether the given cookie-object exists.
    static contains(object: CookieObject<any>): boolean {
        return this.objects.some(e => e.key == object.key);
    }
    
    protected static addObject(object: CookieObject<any>) {
        this.update([...this.objects, object]);
    }

    static setObject(newObject: CookieObject<any>): void {
        const objects = this.objects;
        const existingObject = objects.find((e) => e.key == newObject.key);
        
        if (existingObject != null) {
            existingObject.value = newObject.value;
    
            this.update(objects);
        } else {
            this.addObject(newObject);
        }
    }
}

// A class is referenceable cookie object.
export class CookieObject<T> {
    constructor(key: string, value: T) {
        this.key = key;
        this.value = value;
    }

    // A unique identifier of cookie.
    key: string;

    // A value of cookie object.
    value: T;
    
    setValue(newValue: T): void {
        Cookie.setObject(new CookieObject(this.key, this.value = newValue));
    }

    toString(): string {
        return `${this.key}=${this.value}`;
    }

    // Returns the new instance that matches the given ancient cookie data format.
    static createInstanceByRaw(text: string): CookieObject<any> {
        const [key, value] = text.split('=');

        return new CookieObject(key, value);
    }
}