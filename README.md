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

## Set value of cookie object
The following describes how to define a json web cookie object.

```
// Useing setter
cookie.value = "value";

// Useing function.
cookie.setValue("value");
```

## Listener

### globally register listener
```ts
Cookie.addListener<string>({
      key: "theme",
      listener(value: string) {
          console.log(`Update to ${value}`);
      },
})
```

### Register listener by instance
```ts
const theme = Cookie.getObjectByKeyWithNullSafe("theme", "device");

theme.addListener(value => {
    console.log(`Update to ${value}`);
});
```
