# 218. Getting Emergency Withdrawal Аddress (EWA)

```test
POST https://api.50x.cloud/json.get_emergency_address/
```

Returns default emergency withdrawal address for the asset.

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|sym|String|true|Asset ticker symbol|

**Sample reply upon success:**

```json
{
    "ok": true, 
    "sym": "BTC", 
    "address": "0x5gfdjshb36fjshgjfjsdhbjhfbsjdh",
}
```

**Expected Error:**
`21801`: Emergency Withdrawal Аddress for {sym} was not set yet.
