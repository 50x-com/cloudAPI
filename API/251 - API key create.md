# 251. API key create

```text
POST https://api.50x.cloud/json.add_api_key
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit OTP/WOTP Code from Google Authenticator|

**Returned Values:**

`msg_id`: message code

`html`: html message

`values`: API publick and private (secret) keys in format: "['public', 'secret']"
