# 221. Userinfo update

```test
POST https://api.50x.cloud/json.update_userinfo/
```

User may apdate some values that are returned in `API.211` method.

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------|--------|
|nickname|String|false|Nickname of an account|
|agreements|String|false|Аgreement name (signed by the user) must be transfered as a value|
|lang|String|false|ISO 639-1 Language Code should be transferred|
|remove_agreement|String|false|Agreement name to remove|
|last_message|number|false|ID of the last message seen by the user, should be sent upon closing the message window|
|otp|String|true|6-digit OTP Code from Google Authenticator|

**Note:**
`nickname` and/or `agreements` parameters requires `otp` to be sent.
Other parameters, like `last_message` can be sent without `otp`.

**Sample reply:**

```json
{"ok": true}
```
