
# 103. Chart

Returns an array of an OHLCV values for creating a median rates chart of the specified traiding pair.

```text
GET https://rates.50x.com/chart/
GET https://rates.50x.com/chart_bidask/

```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------|--------|
|pair|String|true|Pair symbol|
|period|String|true|Period symbol|
|begin|number|false|Beginning of the requested period (timestamp in seconds)|
|end|number|false|End of the requested period (timestamp in seconds)|

**Available periods:** M1, M5, M15, M30, H1, H2, H4, D, W

**Sample query:**

```text
GET https://rates.50x.com/chart?pair=ETH/DASH&period=h1
```

**Sample reply:**
```json
[
    {
        "close": 1.28261031,
        "date": 1536256800,
        "high": 1.29277708,
        "low": 1.27164355,
        "open": 1.28232894,
        "vol": 0
    },
    {
        "close": 1.27752193,
        "date": 1536260400,
        "high": 1.30094927,
        "low": 1.2643695,
        "open": 1.28310266,
        "vol: 134.33
    },
  ...
]
```

### **Typescript**

```js
type TBACandle = {
    close: number
    date: number
    high: number
    low: number
    open: number
    vol: number
}
```

### **Typescript bid-ask**

```js
type TBACandle = {
    ca: number
    cb: number
    date: number
    ha: number
    hb: number
    la: number
    lb: number
    oa: number
    ob: number
    vol: number
}
```