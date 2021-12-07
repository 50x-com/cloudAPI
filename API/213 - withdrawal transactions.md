
# 213. Getting the list of withdrawal orders

```text
POST https://api.50x.cloud/json.withdraw_orders/
```

List of withdrawal orders

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
        {"symbol": "DOGE", 
         "state": "done", 
         "time_payout": 1522220735.0, 
         "time_confirm": 1522220553.0, 
         "to_tag": null, 
         "time_create": 1522195200.0, 
         "out_txh": "4c024b9a56da913194850b3339f5c4ae03d7b0cfc3d8d7c86d70f2f97ee4f99b", 
         "to_addr": "DKJ4uJWKtP5oZtTbfuyzNTPfuVC444eSZr", 
         "amount": 98.0
         "memo": "Any string up to 255 characters long for your own referance"}, 
        {"symbol": "DASH", 
         "state": "done", 
         "time_payout": 1522218636.0,
         "time_confirm": 1522218603.0,
         "to_tag": null, 
         "time_create": 1522195200.0, 
         "out_txh": "acb3582a3238ee3722e83a900988de6f994dfa982fd628eb6bdb1b64f147f718",
         "to_addr": "XnJ44u6EAyc3ePTZcxkcW1dFrVFvfc4ggh",
         "amount": 0.00797,
         "memo": "Any string up to 255 characters long for your own referance"}
    ]
}
```

`time_payout_after` if withdrawal delay was set by the user, shows the timestamp of the end of the delay.

`"state"` value during normal execution cycle can be one of the following:

* `new`: unconfirmed withdrawal request

* `confirmed`: confirmed, to be executed

* `suspended`: waiting to be processed

* `wait`: waiting to be transmitted

* `done`: transmitted to the blockchain network
For the unsuccessful transaction (means that reserved tokens were returned to the user's available balance) 

* `error_invalid_address`: provided destination adderess is invalid

* `error_wd_disabled`: withdrawals are disabled for this account

* `error_wd_to_contract_forbidden`: provided destination address belongs to the smart-contract. Withdrawals to the smart-contracts are forbiden.

* `error_user_blocked`:  account is currently blocked by the admin

* `error`: any other error

&nbsp;

### **Typescript**

```js
export interface IWithdrawItem {
    amount: number
    memo: string
    oid: number

    out_txh: string
    state: string
    symbol: string
    time_confirm: number
    time_create: number
    time_payout: number
    time_payout_after: number
    to_addr: string
    to_tag: null | string
}
```
