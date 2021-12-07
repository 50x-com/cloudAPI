# 104. Last trades

Getting the list of last trades

```text
POST https://rates.50x.com/last_trades/
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|pair|String|false|Pair's name (obtain last trades for a pair)|
|sym|String|false|Currency's name (obtain last trades for a currency)|

**Note**

* `a` parament means trade agregated from anothe exchanged


**Sample reply:**

```json
{
    "ok": true,
    "trades": [
     {

        "a": 1,
        "bs": "b",
        "pair": "ETH/BTC",
        "rate": 0.02993642,
        "ts": 1536678972.0,
        "vol1": 0.81505393,
        "vol2": 0.0243998},
    {
        "a": 1,
        "bs": "b",
        "pair": "ETH/BTC",
        "rate": 0.03,
        "ts": 1536677973.0,
        "vol1": 10.0,
        "vol2": 0.3},
        ...
    ]
}
```

### **Typescript**

```js
type TTradeItemInfo = {
    a: 0 | 1
    bs:	's' | 'b'
    ts: number
    rate: number
    vol1: number
    vol2: number
    pair: string
}

```
