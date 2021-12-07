# 212. Incoming transactions

Getting the lists of incoming transactions

```text
POST https://api.50x.cloud/json.incoming_transactions/
```

shows list of incoming transactions (deposits)

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|begin|number|false|Timestamp(seconds) |
|end|number|false|Timestamp(seconds) |
|pn|number|false|Page number starting from 1 |
|ps|number|false|Page size|
|sym|String|false|currency symbol (for example, ETH,BTC,LTC...)|
|state|String|false|"wait" or "ok" (to be deposited or already deposited)|

**Sample reply:**

```json
{
    "ok": true, 
    "orders": [
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99", 
         "rec_time": 1522572619.0, 
         "txh": "0x9a8bdc9677dd33580738e0d0b2cfce260d68dae93a12d401c05889cd731e2468", "
         symbol": "ETH", 
         "amount": 0.1, 
         "state": "ok", 
         "confirmations": 98}, 
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99",
         "rec_time": 1522146010.0, 
         "txh": "0x3fbf75c3e54ab072486c9c708a545fe6123dc76aa0418826e09dac0ce060f6b2", 
         "symbol": "ETH", 
         "amount": 0.002,
         "state": "ok",
         "confirmations": 5697}, 
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99", 
         "rec_time": 1522146010.0, 
         "txh": "0x300fb44b9782d1d977472148d306297de8f887662a2677364dabde84044e6230", 
         "symbol": "ETH",
         "amount": 0.0003, 
         "state": "ok", 
         "confirmations": 5765}
    ]
}

```

`"state"` can be “wait” (to be deposited) or “ok” (deposited)

&nbsp;

### **Typescript** 

```js
interface IIncomingItem {
    addr: string
    amount: number
    confirmations: number
    id: number
    rec_time: number
    staking_base: null | number
    state: string
    symbol: string
    txh: string
}
```
