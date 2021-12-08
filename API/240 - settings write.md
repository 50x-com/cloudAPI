# 240. Settings write

Write user settings to the server

Stores JSON-encoded _string_ to be returned with API.240 method.
You can store user settings and states on the server side to provide cross-device syncronisations.
Total stored sting length could not exceed 15 kb.

```text
POST https://api.50x.cloud/json.writesettings/
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|settings|String|true|JSON-encoded string of an array|

`settings` **must include** `terminal_id` element, containing multidimentional array of parameters at developer's discretion. "terminal_id" is a unique front-end id, must be approved by 50x.com admins before usage.
To delete contents of such element completely, parameter `clear` with string value `terminal_id` should be sent instead of `settings`.

`settings` may include "common" element containing multidimentional array of parameters at developer's discretion.
Untransmitted elements will remain unchanged on the server.
1st level sub-elements of "common" and "terminal_id" elements will be replaced on the server, or deleted in case `{sub-element:""}` will be sent.

**Server-side recognised parameters**
You can put some values into the `common` element to make them available from all applications. Recommended set is:

`basesym`, `lastPair`, `lastOrderType`, `priceCopyShift`

There are also some values that will be recognised by the server and affect account settings.

`session_lifetime` is period of time in minutes after which session will become expired.

**Sample Query Parameters**

```js
{
    "settings": JSON.stringify({"mycloudfront1":{"lastpair":["A2A","HMT"]}})
}

{
    "settings" : JSON.stringify({"common": {
                    "session_lifetime": 60
                }})
}
```
