# 201. Sign UP


```text
POST https://api.50x.cloud/json.join/
```

Creating a new account

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|email|String|true|email|
|password|String|true|password|
|repassword|String|true|repeat password|
|promo|String|false|Promo code|

Note: `The account will be created with given email as login`

**Sample reply upon success:**

```json
{"ok": true}
```
