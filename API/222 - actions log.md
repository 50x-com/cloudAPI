# 222. `User's actions log`

Returns a list of user's autorised orders incliding log in and change account settings events.

```text
https://api.50x.cloud/json.actionslog/
```

**No parameters**

**Sample reply:**

```json
{"ok": true, "actions": [{"ip": "50.100.200.11", "oid": 322559, "sym2": "ETH", "sym1": "A2A", "bs": "s", "pair": "A2A/ETH", "action_time": 1552413972, "descr": "LIMIT SELL 360.00000000 A2A/ETH at 0.00024492", "n_rate": 0, "rate": 0.00024492, "n_amount": 0, "amount": 360.0, "type": "cancel order"}, {"ip": "50.100.200.11", "oid": 123456, "sym2": "ETH", "sym1": "A2A", "bs": "s", "pair": "A2A/ETH", "action_time": 1552413951, "descr": "LIMIT SELL 360.00000000 A2A/ETH at 0.00023964 -> SELL 360.00000000 A2A/ETH at 0.00024492", "n_rate": 0.00024492, "rate": 0.00023964, "n_amount": 360.0, "amount": 360.0, "type": "change order"}, {"ip": "50.100.200.11", "oid": 12345, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552216980, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "confirm withdraw"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552216843, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "wd_2fa_fail"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552215428, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "cancel many order"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552144311, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "login"}}]}
```

**Reply common values:**

* `at`:  Timestamp of the transaction

* `t`:  transaction source: indicates which module initiated the transaction, possible states:
  * `tc: Trading Core`
  * `com: Commission`
  * `wd: Withdrawal`
  * `in: Incomming transaction (deposit)`
  * `fix: Error correction`

* `data_id`: transaction ID, or order ID for trades (if "t"="tc")

* `amount`: Balance change for selected asset

* `sym`: Asset Symbol

**Reply deposit/withdrawal values:**

  `txh`:  TxHash for withdrawals

  `tag`:  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM

  `addr`:  External blockchain address for deposits and withdrawals

**Reply trade/commission/fix values:**

  `o_bs`:  buy/sell for trades: `b: buy`, `s: sell`

  `o_t`:  Order Type for trades: `l: limit`, `m: market`

  `o_pair`:  Order Type for trades

  `o_vol`:  Order Volume for trades

  `o_rate`:  Order Rate for trades

  "type" TODO

&nbsp;

### **Typescript**

```js
type TAction = {
    index: number
    action_time: number
    amount: number
    bs: 'b' | 's'
    descr: string | null
    ip: string
    n_amount: number
    n_rate: number
    oid: number | null
    pair: string
    rate: number
    sym1: string
    sym2: string
    type: string
}
```
