# 209. Disable 2FA WOTP

Main OTP cannot be disabled, only changed. Can be disabled only WOTP.

&nbsp;

```text
POST https://api.50x.cloud/json.disable_2fa/
```

&nbsp;

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit 2FA OTP (WOTP)|
|wotp|Boolean|true|Value must be `1`|

&nbsp;

**Sample reply upon success:**

```json
{"ok": true}
```
