# 223. Tradelog

User's trades log. Returns `trades` array of the trades executed under user's trade orders.

```text
POST https://api.50x.cloud/json.tradelog/
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|pair|String|optional|Trading pair filter in `AAA/BBB` format|
|sym|String|optional|Token filter in `AAA` format|
|sym1|String|optional|Asset filter in `AAA` format|
|sym2|String|optional|Currency filter in `AAA` format|
|ot|String|optional|Order type, can be one of this: "l" (limit), "m" (market), "c" (conditional)|
|bs|String|optional|Order direction (buy or sell), can be "b" or "s"|

**Sample reply:**

```json
{"trades": [{"ev_sym1": 0.0, "ev_sym2": 0.0, "oid": 322559, "sym2": "ETH", "sym1": "A2A", "at": 1552413972, "bs": "s", "pair": "A2A/ETH", "o_vol": 360.0, "o_filled": 0.0, "t": "c", "o_rate": 0.00024492, "ot": "l"}, {"ev_sym1": 443.36067391, "ev_sym2": -0.10147639, "oid": 319694, "sym2": "ETH", "sym1": "A2A", "at": 1551731105, "bs": "b", "pair": "A2A/ETH", "o_vol": 443.36067391, "o_filled": 443.36067391, "t": "t", "o_rate": 0.00022888, "ot": "l"}], "ok": true}
```

**Reply common values:**

* `at`:  Event's timestamp
* `t`:  transaction source: indicates which module initiated the transaction, possible states:
* `tc: Trading Core`, `com: Commission`, `wd: Withdrawal`, `in: Incomming transaction (deposit)`, `fix: Error correction`
* `data_id`: transaction ID, or order ID for trades (if "t"="tc")
* `amount`: Balance change for selected asset
"sym": Asset Symbol

&nbsp;

**Reply deposit/withdrawal values:**

* `txh`:  TxHash for withdrawals
* `tag`:  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM
* `addr`:  External blockchain address for deposits and withdrawals

&nbsp;

**Reply trade/commission/fix values:**

* `o_bs`: Trade Order's direction: `b: buy`, `s: sell`
* `o_t`:  Trade Order's Type: `l: limit`, `m: market`
* `o_pair`:  Trade Order's trading pair in "sym1/sym2" format
* `o_vol`:  Trade Order's Volume
* `o_rate`:  Trade Order's Rate

&nbsp;

**Current method's values**

* `oid`: Order unique ID
* `ot`: Trade Order's Type: `l: limit`, `m: market`
* `o_filled`: Trade Order's current filled volume
* `ev_sym1`: Asset (sym1) amount change (executed value)
* `ev_sym2`: Currency (sym2) amount change (executed value)
* `sym1`: Asset ticker
* `sym2`: Currency ticker
* `bs`: Trade direction, `b: buy`, `s: sell`
* `pair`: Trading pair in "sym1/sym2" format

&nbsp;

### **Typescript**

```js
type TTredelogItem = {
    at: number
    bs: 'b' | 's'
    ev_sym1: number
    ev_sym2: number
    o_filled: number
    o_rate: number
    o_vol: number
    oid: number
    ot: 'l' | 'm'
    pair: string
    sym1: string
    sym2: string
    t: string
    key: string
}
```
