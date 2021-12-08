# 263. Loan get

```text
POST https://api.50x.cloud/json.get_loan
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|true|Asset Symbol|
|amount|number|true|Asset quantity to be borrowed|
|max_daily_percent|number|true|Maximum loan daily fee in percent|
|otp|number|true|6-digit 2FA Code from Google Authenticator|

**Sample reply:**

```json
{"ok": true}
```

**Expected Errors:**

`28100`: There are not enough own funds on your account to get a new loan.[own_funds_percent,new_loan_level]

`28101`: Post-loan marginal coverage is not enough to maintain the loan.[post_own_funds_percent,margincall_level]
