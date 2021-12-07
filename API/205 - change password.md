# 205. Change password

```text
POST https://api.50x.cloud/json.resetpwd/
```

Setting new password using password reset code from email

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|email|String|true|email|
|emailcode|String|true|code from email|
|password|String|true|new password|
|repassword|String|true|new password repeat|
|otp|String|false|2FA Code, `required` if 2FA is activated|
