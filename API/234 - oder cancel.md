# 234. Order cancellation

```text
POST https://api.50x.cloud/json.cancel_order/
```

Cancels an open order

**Parameters:**
|Name|Type|required|Description|
|---|---|:----------|--------|
|oid|String|true|order's id|

**Sample reply:**

```json
{"oid": 151871, "ok": true}
```
