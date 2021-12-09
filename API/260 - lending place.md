# 260. Lending place

```text
POST https://api.50x.cloud/json.place_lending
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|true|Asset symbol|
|amount|number|true|Value to lend|
|perc|number|true|Annual percent|

**Sample reply:**

```json
{"ok": true}
```

**Expected Errors:**
`10003`, `23100`, `26001`, `26002`, `26003`, `26004`, `26053`, `26054`, `35001`, `35025`, `37034`, `37035`
