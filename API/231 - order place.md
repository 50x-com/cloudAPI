# 231. Placing an order

```text
POST https://api.50x.cloud/json.place_order/
```

Placing a trading order

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------|--------|
|pair|string|true|Trading pair (for example, ETH/BTC, ETH/DASH, LTC/ETH)|
|v|number|true|Volume|
|ot|string|true|Order type (l - limit, m - market)|
|r|number|true|Order execution rate|
|bs|string|true|'b' for BUY, 's' for SELL|
|lifetime|number|false|Number of seconds of order's lifetime from placement (optional)|
|expire_time|number|false|time when order is automatically cancelled (optional, lifetime has the priority)|
|memo|string|false|Any string up to 255 characters long for your own referance|
|tp_r|number|false|Takeprofit order rate|
|sl_trigger|number|false|Stoploss activation trigger rate|
|sl_r|number|false|Stoploss order rate|
|trailing_pr|number|false|Trailing Stop offset in percent, positive value|
|slippage_pr|number|false|Trailing Stop slippage in percent, positive value for worst price, negative for better price, default=0|
|copied_from_id|number|false|The ID of the parent "template" order|
|infinity|boolean|false|Infinity sltp order|

**Note:**

`copied_from_id`: You may store a reference to the child order in the parent order in case you have order/position duplication functionality. The ID of your new order will be returned as `copied_to` value in the parent order array. The ID of the parent order should be transmitted in `copied_from_id` parameter. If `copied_to` value in the parent order is not empty, it will be replaced with the new value each time you send a new order with the same `copied_from_id` parameter.

Takeprofit can be set without Stoploss, require `tp_r`.

If Stoploss is set, a Takeprofit is `required`.

Stoploss require `tp_r`+`trailing_pr`+`slippage_pr` OR `tp_r`+`sl_trigger`+`sl_r`.

Error will be returned if `trailing_pr` will be sent with `sl_trigger` or `sl_r`.

`slippage_pr` is the limit order price correction from the Trailing Stop activation price in percent. Positive value makes order's limit price higher than the activation price level in case of bid, and lower in case of ask. If not specified, an activation price will be used. Can be used only with Trailing Stop, otherwise error `22008` will be returned.

**Expected error codes:**

`22008`: Two or more parameters can't be used simultaneously: {Parameter}, {Parameter}.

**Sample reply:**

```json
{
    "ok": true,
    "order": {
        "bs": "b",
        "expire_time": 0,
        "filled_vol": 0,
        "oid": 151871,
        "pair": "ETH/BTC",
        "rate": 0.001,
        "state": 0,
        "sym1": "ETH",
        "sym2": "BTC",
        "time_cancel": 0,
        "time_complete": 0,
        "time_create": 1536856649.0,
        "time_last_fill": 0,
        "type": "l",
        "vol": 1.0,
        "memo": "Any string up to 255 characters long for your own referance",
    }
}
```
