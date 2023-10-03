


type CookieListener<T> = {
    key: string,
    listener: RawCookieListener<T>,
}

type RawCookieListener<T> = (value: T) => void



// A static class manage cookies in client web.
export class Cookie {

    static listeners: CookieListener<any>[] = [];

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
    
    static setObject(newObject: CookieObject<any>) {
        const oldObject = this.getObjectByKey(newObject.key);
        
        document.cookie = newObject.toString();

        if (oldObject != null && oldObject.value != newObject.value) {
            this.notifyListeners(newObject);
        }
    }

    static addListener<T>(listener: CookieListener<T>) {
        if (this.listeners.some((e) => e.listener == listener.listener)) {
            throw "This listener is already attached.";
        }

        this.listeners.push(listener);
    }

    static notifyListeners(object: CookieObject<any>) {
        for (const listener of this.listeners) {
            if (listener.key == object.key) listener.listener(object.value);
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

    addListener(listener: RawCookieListener<T>) {
        Cookie.addListener({ key: this.key, listener: listener });
    }

    // Returns the new instance that matches the given ancient cookie data format.
    static createInstanceByRaw(text: string): CookieObject<any> {
        const [key, value] = text.split('=');

        return new CookieObject(key, value);
    }
}