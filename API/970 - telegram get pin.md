# 970. Telegram get PIN-code

Returns actual user PIN-code.

```text
POST https://api.50x.cloud/json.telebot_pin/
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|otp|INT|true|2FA one-time code|

**Sample reply:**

```json
{"ok": true, "pin": "pin-code"}
```

**Returned values**:

`pin`: Actual PIN-code for user
