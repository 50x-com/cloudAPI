# 215. Withdraw

```test
POST https://api.50x.cloud/json.place_withdraw/
```

Creates a withdrawal order. 2FA must be activated to use this function.

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|String|true|Internal trading symbol of an asset to be transferred|
|amount|String|true|Amount to be transferred|
|fee|number|true|Current fee|
|to_addr|String|true|Destination address|
|public_key|String|false|Public key|
|to_tag|String|false|Tag for the assets that require tag as a part of address details (like XRP)|
|otp|String|true|6-digit 2FA Code from Google Authenticator|

**Sample reply upon success:**

```json
{"ok": true}
```

**Expected ERROR codes**

`21500`: External (blockchain) withdrawals are unavailable for your account type.
