# 105. Getting bid and ask for all pairs with selected coin

```Reqest
GET https://rates.50x.com/rates/
```

**Parameters:**
|Name|Type|Mandatory|Description|
|----|----|:-------:|-----------|
|base|String|optional|ticker of the base coin|

**Note:**
`base` default value is "BTC"

**Sample reply:**

```Reqest
{"DOGE": {"ask": 3.93e-06, "bid": 3.84e-06}, "LTC": {"ask": 0.00388, "bid": 0.00384401}, "BTC": {"ask": 1, "bid": 1}, "WAVES": {"ask": 0.000101, "bid": 9.9e-05}, "TUSD": {"ask": 4.366e-05, "bid": 4.208e-05}, "TON": {"ask": 0.0001373, "bid": 9.786e-05}}
```
