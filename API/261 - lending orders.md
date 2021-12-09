# 261. Lending orders

```text
POST https://api.50x.cloud/json.lending_orders
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|false|Asset symbol|
|pn|number|false|page number|
|ps|number|false|page size|
|history|number|false|`0` or `1`|

**Sample reply:**

```json
{"ok": true}
```

### **Typescrypt**

```js
type ILendingItem = {
    amount: number
    expire_time: number
    fee_received: number
    last_changes: number
    oid: number
    percent: number
    state: number
    symbol: string
    time_create: number
    unused_amount: number
}
```

**No Errors Expected**
