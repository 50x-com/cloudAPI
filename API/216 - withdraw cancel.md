# 216. Withdrawal order cancelation

```test
POST https://api.50x.cloud/json.cancel_withdraw/
```

Cancels a withdrawal order that is scheduled for the delayed execution.

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|wd_oid|integer|true|ID of the order to be canceled|

**Sample reply upon success:**

```json
{"ok": true}
```
