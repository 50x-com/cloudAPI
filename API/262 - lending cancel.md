# 262. Lending cancel

```text
POST https://api.50x.cloud/json.cancel_lending
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|oid|number|true|Order id|
|cancel_unused|number|false|Отменить неиспользуемую часть займа|

**Sample reply:**

```json
{"ok": true}
```

**Expected Errors:**
`10003`, `26201`, `35001`, `35015`, `37003`
