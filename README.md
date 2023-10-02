# Web Cookie
Ideally Implemented simple web client-cookie source code, and using Typescript.

## Usage

### Get instance of cookie object
```ts
// Not Null-Safety
const theme = Cookie.getObjectByKey<string>("theme");
```

```ts
// Null-Safety
const theme = Cookie.getObjectByKeyWithNullSafe<string>("theme", "device");
```

```ts
const cookies: CookieObject<any>[] = Cookie.objects;
```
