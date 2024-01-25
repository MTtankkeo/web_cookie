# Web Cookie
Ideally Implemented simple web client-cookie source code, and using Typescript.<br>
`See also: Cookies are rarely controlled directly by the client.`

> The example doesn't work in the local environment.

## Usage

### Get instance of cookie object
The following describes how to get a instance of cookie object.

```ts
// Not Null-Safety
const version = Cookie.getObjectByKey<string>("version");
```

```ts
// Null-Safety
const version = Cookie.getObjectByKeyWithNullSafe<string>("version", "1.0.0");
```

```ts
const cookies: CookieObject<any>[] = Cookie.objects;
```

### Set value of cookie object
The following describes how to define a value of cookie object.

```ts
// Useing setter
version.value = "1.0.0";

// Useing function.
version.setValue("1.0.0");
```

## Listener
The following describes how to register a callback function that is called whenever the value of a cookie object updates.

### globally register listener
```ts
Cookie.addListener<string>({
      key: "version",
      listener(value: string) {
          console.log(`Update to ${value}`);
      },
})
```

### Register listener by instance
```ts
const version = Cookie.getObjectByKeyWithNullSafe("version", "1.0.0");

version.addListener(value => {
    console.log(`Update to ${value}`);
});
```
