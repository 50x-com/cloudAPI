# 267. Loans orderbook

```text
POST https://api.50x.cloud/json.loan_ob
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|false|Asset symbol|

**Expected No Errors:**

**Sample reply:**

```json
{"ok": true, "available_funds": []}
```

### **Typescript**

```js
// [VOLUME, DAILY_PERCENT]
type TLoanOrderbookItem = [number, number]
```
