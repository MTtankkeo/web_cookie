# web_cookie
Ideally Implemented simple web client-cookie source code, and using Typescript.

## Usage

### Get Cookie Object
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
