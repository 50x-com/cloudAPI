# 220. Blotter - cashflow

```test
POST https://api.50x.cloud/json.blotter/
```

Obtain all operations with the selected currency on the account 

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|sym|String|true|Currency symbol|

**Sample reply:**

```json
{
    "ok": true, 
    "blotter": [{"addr": "",
              "amount": 1.0,
              "at": 1536857914.0,
              "data_id": 151907,
              "o_bs": "b",
              "o_pair": "ETH/BTC",
              "o_rate": 0.03247101,
              "o_t": "m",
              "o_vol": 1.0,
              "sym": "ETH",
              "t": "tc",
              "tag": "",
              "txh": ""}],
}
```

**Reply common values:**

`at`:  Timestamp of the transaction

`t`:  transaction source: indicates which module initiated the transaction, possible states:

* `tc: Trading Core`
* `com: Commission`
* `wd: Withdrawal`
* `in: Incomming transaction (deposit)`
* `fix: Error correction`

`data_id`: transaction ID, or order ID for trades (if "t"="tc")

`amount`: Balance change for selected asset

`sym`: Asset Symbol

&nbsp;

**Reply deposit/withdrawal values:**

  `txh`:  TxHash for withdrawals

  `tag`:  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM

  `addr`:  External blockchain address for deposits and withdrawals

&nbsp;

**Reply trade/commission/fix values:**

  `o_bs`:  buy/sell for trades: `b: buy`, `s: sell`

  `o_t`:  Order Type for trades: `l: limit`, `m: market`

  `o_pair`:  Order Type for trades

  `o_vol`:  Order Volume for trades

  `o_rate`:  Order Rate for trades

&nbsp;

### **Typescript**

```js

interface IBlotterData {
    addr: string
    amount: number
    at: number
    data_id: number
    id: number
    o_bs: 'b' | 's'
    o_pair: string
    o_rate: number
    o_t: 'l' | 'm'
    o_vol: number
    sym: string
    t: string
    tag: string
    txh: string
    key: string
}
```
