# 266. User's loan orders list

```text
POST https://api.50x.cloud/json.loans
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|false|Asset symbol|
|history|number|false|Send `1` to get history|

**Expected No Errors:**

### **Typescript** 

```js
type TLoanItem = {
    amount: number
    fees: number
    last_changes: number
    lid: number
    max_percent: number
    pay_back_time: number
    percent: number
    state: number
    symbol: string
    time_create: number
}
```
