
# 230. Orderlist

Getting the lists of Open or Closed orders

```text
POST https://api.50x.cloud/json.orderslist/
```

Returns the list of open orders.
If history=1 parameter is included, returns the list of closed orders.

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|history|string|false|if included, shows history, and not open orders|
|begin|number|false|Timestamp (seconds)|
|end|number|false|Timestamp (seconds)|
|pn|number|false|page number starting from 1 (one page = 50 orders)|
|pn|number|false|page size|
|pair|string|false|selection based on the indicated pair (for example, ETH/BTC, ETH/DASH, LTC/ETH)|
|sym1|string|false|selection based on the pair's first symbol (for example, for ETH/BTC, the first symbol is ETH)|
|sym2|string|false|selection based on the pair's second symbol (for example, for ETH/BTC, the second symbol is BTC)|
|ot|string|false|selection based on the order's type (l,m,c - see place_order description)|
|bs|string|false|selection based on BUY or SELL, b and s values respectively|
|state|number|false|selection based on the trading order's state|

**Returned values:**

NEW `po_id`: An ID of the Parent Order in case this is a stoploss/takeprofit or another child order

NEW DEPRECTED `is_inverted`: IF `true` or `1`, this order should be displayed and handled with inverted trading pair, direction and values on a front-end level.

Please see INVERTED ORDERS section for the explanation.

**Sample reply:**

```json
{"ok": true, "orders": [
    {"time_last_fill": 0, 
     "time_cancel": 0, 
     "filled_vol": 0.0, 
     "rate": 0.07598567,
     "commission": 0.2,
     "vol": 1.0,
     "time_create": 1525244149.0, 
     "oid": 101011, 
     "sym1": "ETH", 
     "time_complete": 0, 
     "condition_details": null, 
     "sym2": "BTC", 
     "state": 0, 
     "condition_type": null, 
     "bs": "b", 
     "pair": "ETH/BTC", 
     "memo": "Any string up to 255 characters long for your own referance",
     "type": "l"},
     ...
]}
```

### **Typescript**

```js
type TOrder = {
    bs: "s" | "b";
    commission: number;​
    copied_to: null​​​ | number;
    expire_time: number;​​​
    filled_amount: number;
    filled_vol: number;
    infinity: number;
    last_changes: number;
    memo: string;
    oid: number;
    pair: string;
    poid: number;
    rate: number;
    sl_r: null | number;
    sl_trigger: null | number;
    slippage_pr: null | number;
    sltp: number;
    state: number;
    sym1: string;
    sym2: string;
    time_cancel: number;
    time_complete: number;
    time_create: number;
    time_last_fill: number;
    tp_r: null | number;
    trailing_pr: null | number;
    ​​​type: "l" | "m";
    vol: number;
    was_changed: number;
}
```
