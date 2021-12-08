# 235. Mass Order cancellation

```text
POST https://api.50x.cloud/json.cancel_orders/
```

Cancels all orders that match search conditions.

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|String|false|Asset Symbol|
|pair|String|false|Trading pair|
|bs|String|false|Trading direction (`b`:buy, `s`:sell) |
|buy_sym|Boolean|false|If `true`, `sym` is required with no additional parameters. Cancels all orders for buying `sym` regardless nominal order direction|
|sell_sym|Boolean|false|If `true`, `sym` is required with no additional parameters. Cancels all orders for selling `sym` regardless nominal order direction|

**Parameters usage:**

* `sym`: if specified, all open orders with sym will be cancelled in both SYM/* and */SYM trading pairs. Should not be used with "pair'.
* `pair`: if specified, all open orders with provided trading pair will be cancelled. Should not be used with "sym'.
* `bs`: Trading direction (buy/sell) of the order. Use bs='s' to cancel only SELL orders, use bs='b' to cancel only BUY orders. May come with `pair` or * `sym` as an additional filters.
* `buy_sym`: If `1`, `sym` is required with no additional parameters. Cancels all orders for buying `sym` regardless nominal order direction
* `sell_sym`: If `1`, `sym` is required with no additional parameters. Cancels all orders for selling `sym` regardless nominal order direction

> **Note:**
>
> Warning! This method cancels all orders fitting filter parameters including SLTP orders and closes all parent `positions`. Sending this request without parameters will result in cancelling all open orders and positions on the user's account.

**Sample reply:**

```json
{"ok": true}
```
