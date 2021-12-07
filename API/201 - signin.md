# 202. Sign UP

```text
POST https://api.50x.cloud/json.login/
```

Creating a new account

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|email|String|true|email|
|password|String|true|password|
|otp|String|false|2FA OTP, should be blanc if 2FA has not been activated|

Note: `The account will be created with given email as login`

**Sample reply upon success:**

```json
{"x_session_id": "frdifkahui2dc1fy59vr9fl2o08beb8u", "ok": true}
```
