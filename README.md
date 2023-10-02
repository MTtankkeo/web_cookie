# web_cookie
Ideally Implemented simple web client-cookie source code, and using Typescript.

## Usage

### Not Null-Safety
```ts
// Returned value is nullable.
const theme = Cookie.getObjectByKey("theme");
```

### Null-Safety
```ts
// Returned value is not nullable.
const theme = Cookie.getObjectByKeyWithNullSafe("theme", "device");
```
