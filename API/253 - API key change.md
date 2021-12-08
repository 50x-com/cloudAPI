# 253. API key change

```text
POST https://api.50x.cloud/json.save_api_key
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit OTP/WOTP Code from Google Authenticator|
|apikey|String|true|API key to be deleted|
|trade_enabled|boolean|false|default: 0|
|withdraw_enabled|boolean|false|default: 0|
|ip_restriction_enabled|boolean|false|default: 0|
|ip_restriction_list|array|false|default: empty|

**Sample reply:**

```json
{"ok": true}
```
