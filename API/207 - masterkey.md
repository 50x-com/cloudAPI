# 207. Getting Account's Master Key

```text
POST https://api.50x.cloud/json.masterkey/
```

Setting Master Key for the user's account in two steps.

&nbsp;

## **Step 1:**

**Parameters:**

|Name|Type|required|Description|
|---|---|:----------|--------|
|otp|String|true|6-digit WOTP/OTP from Google Authenticator|

&nbsp;

**Sample reply upon success if Master Key has NOT been activated:**

```text
{'master_key':'KJKJHD93UDWYYHD93UDWYY', "ok": true}
```

&nbsp;

**Sample reply upon success if Master Key has been activated:**

```text
{'master_key':'KJKJHD93UDWYYHD93UDWYY', "ok": true, "activated": true}
```

&nbsp;

> `master_key` should be displayed to the user as a string with [copy] button or onClick functionality.
The [activate] button should remove `masterkey` from the device screen and from any cashe used (including memory buffer) completely and collect data from user for STEP 2:Activation on the new screen to ensure that `masterkey` was properly saved offline by the user. Paste option to `lastchars` input should be disabled.

&nbsp;

## **Step 2:**

**Parameters:**

|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|step|INT|`required`|value must be `2`|
|lastchars|char(5)|`required`|last 5 chars from `masterkey` shown in step 1|

**Sample reply upon success:**

```text
{"ok": true, "activated": true}
```

Upon success, 211. request will contain `masterkey:true` parameter

&nbsp;

**Expected errors:**

* Error `20701`: Master Key was already set for this account and cannot be changed.

* Error `20702`: Master Key cannot be set for this account (PMA). Please return to your main account to set the Master Key.

* Error `20705`: Provided characters are not matching current Master Key. Last {5} characters of the Master Key are required to activate it
