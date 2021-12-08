# 252. API key delete

```text
POST https://api.50x.cloud/json.delete_api_key
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit OTP/WOTP Code from Google Authenticator|
|apikey|String|true|API key to be deleted|

**Sample reply:**

```json
{"ok": true}
```
