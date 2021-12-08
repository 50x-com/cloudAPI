# 241. Settings read

Read user settings from the server

Returns _string_ stored with API.240 method.

```text
POST https://api.50x.cloud/json.readsettings/
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|type|String|true|unique front-end id, must be approved by 50x.com authorities|

**Sample reply:**

```json
{"common": {"nonce": 0}, "mycloudfront1": {"attention_orderplace": "5", "estimate_currency": "ETH", "hidden_boxes": ["currencies-info", "settings", "actionslog"], "currencypair": ["A2A", "ETH"], "orderbook_summ_type": "sumSym1", "orderbookCopyShift": "0.00000001", "lasttradestype": "sym"}}
```

**NOTE:** All contents of `mycloudfront1` element including it's name are defined by the front-end developer. Please see API.240 for the refference.
