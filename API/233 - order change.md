
# 233. Changing order

```test
POST https://api.50x.cloud/json.change_order/
```

Changes an open order

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|oid|String|true|order's id|
|amount|Float|false|order's new volume (optional, if not included or = 0, then volume shall remain unchanged)|
|rate|Float|false|order's new rate (optional, if not included or = 0, then rate shall remain unchanged)|
|expire_time|Float|false|order's expiration time, unix timestamp (when it is automatically cancelled, optional, if not inlucded, shall remain unchanged)|
|memo|String|false|Any string up to 255 characters long for your own referance|
|tp_r|Float|false|Takeprofit order rate|
|sl_trigger|Float|false|Stoploss activation trigger rate|
|sl_r|Float|false|Stoploss order rate|
|trailing_pr|Float|false|Trailing Stop offset in percent, positive value|
|slippage_pr|Float|false|Trailing Stop slippage in percent, default:0|
|remove_sltp|String|false|Expected `sl` or `sltp`|
|from_history|number|false|Must be `1` if changing an order with `state:3`|
|close_as_filled|number|false|Makes order volume equal to filled_volume and closes the order as fully filled. Position will be created with SLTP was set in this order. Should come with `oid` only.|
|set_fulfilled|number|Set order as fullfiled.|

**Note:**

"Position" is an order in `state:5`, meaning a partially or fully filled and closed order with an open SLTP child order.

"Closed Position" is an order in `state:7`, meaning a closed partially or fully filled order with a closed partially or fully filled SLTP child order. Closed Position can not be changed.

Specified `trailing_pr` will delete `sl_trigger` and `sl_r` if they were set.
`remove_sltp:sl` removes Stoploss or Trailing Stop from an open order or position,
`remove_sltp:sltp` cancels SLTP settings in open order or closes position.
If `remove_sltp` comes with `tp_r` or `sl_trigger` or `sl_r` or `trailing_pr` error `22008` will be returned.

Before sending `remove_sltp` command for the position a user must receive a warning that child SLTP order will be canceled and parent order will be archived in HISTORY section without possibility of setting SLTP order for it again.

If order has `poid` parameter, no volume change is possible.

**Sample reply:**

```json
{"ok": true}
```

**Expected errors:**

`23309`: Error occurred while trying to change the order {oid}.

`23310`: Can not create position from the unfilled or fulfilled order, should be partially filled.
