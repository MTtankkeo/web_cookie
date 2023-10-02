


// A static class manage cookies in client web.
export class Cookie {

    // Returnes currently array of cookie objects.
    static get objects() {
        const cookies = this.split(document.cookie);
        
        return cookies.map(e => CookieObject.toInstance(e));
    }
    
    // "key=value; key=value" to [CookieObject, CookieObject]
    static split(text: string): string[] {
        if (text == "") {
            return [];
        }
        
        return text.split("; ");
    }

    static update(objects: CookieObject<any>[]): void {
        document.cookie = objects.map(e => e.toString()).join('; ');
    }
    
    static getObjectByKey<T>(key: string): CookieObject<T> {
        return this.objects.find((e) => e.key == key);
    }

    static getObjectByKeyWithNullSafe<T>(key: string, defaultValue: T): CookieObject<T> {
        const object = this.getObjectByKey<T>(key);
        
        return object ?? new CookieObject(key, defaultValue);
    }

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

export class CookieObject<T> {
    constructor(key: string, value: T) {
        this.key = key;
        this.value = value;
    }

    key: string;
    value: T;
    
    setValue(newValue: T): void {
        Cookie.setObject(new CookieObject(this.key, this.value = newValue));
    }

    toString(): string {
        return `${this.key}=${this.value}`;
    }

    static toInstance(text: string): CookieObject<any> {
        const [key, value] = text.split('=');

        return new CookieObject(key, value);
    }
}