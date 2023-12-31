# Web Cookie
Ideally Implemented simple web client-cookie source code, and using Typescript.

> The example doesn't work in the local environment.

## Usage

### Get instance of cookie object
The following describes how to get a instance of cookie object.

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

### Set value of cookie object
The following describes how to define a value of cookie object.

```ts
// Useing setter
theme.value = "device";

// Useing function.
theme.setValue("device");
```

## Listener
The following describes how to register a callback function that is called whenever the value of a cookie object updates.

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
