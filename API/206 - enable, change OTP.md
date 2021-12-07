# 206. Enable 2FA OTP & WOTP

```text
POST https://api.50x.cloud/json.enable_2fa/
```

Enable 2FA OTP or WOTP on user's account in two steps.

&nbsp;

## **Enable OTP**

&nbsp;

### OTP Step 1

**Parameters: no**

**Sample reply upon success:**

```json
{"key": "KJHD93UDWYY", "ok": true}
```

&nbsp;

### OTP Step 2

**Parameters:**

|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|step|INT|`required`|value must be `2`|
|otp|String|`required`|6-digit 2FA Code from Google Authenticator|

&nbsp;

&nbsp;
* * *

&nbsp;

## **Enable WOTP**

&nbsp;

### WOTP Step 1

**Parameters:**

|Name|Type|required|Description|
|---|---|:----------:|--------|
|wotp|Boolean|true|Value must be `1`|

**Sample reply upon success:**

```json
{"key": "KJHD93UDWYY", "ok": true}
```

&nbsp;

### WOTP Step 2

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|step|INT|true|value must be `2`|
|otp|String|true|6-digit 2FA Code from Google Authenticator|
|wotp|Boolean|true|Value must be `1`|

&nbsp;

&nbsp;

* * *

&nbsp;

&nbsp;

## **Change OTP**

&nbsp;

### OTP change Step 1

**Parameters:**

|Name|Type|required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit 2FA Code from Google Authenticator|

&nbsp;

### OTP change Step 2

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|step|INT|true|value must be `2`|
|otp|String|true|6-digit 2FA Code from Google Authenticator|


&nbsp;

&nbsp;

* * *

&nbsp;

&nbsp;

## **Change WOTP**

&nbsp;

### WOTP change Step 1

**Parameters:**

|Name|Type|required|Description|
|---|---|:----------:|--------|
|otp|String|true|6-digit 2FA Code from Google Authenticator|
|wotp|Boolean|true|Value must be `1`|

&nbsp;

### WOTP change Step 2

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|step|INT|true|value must be `2`|
|otp|String|true|6-digit 2FA Code from Google Authenticator|
|wotp|Boolean|true|Value must be `1`|

