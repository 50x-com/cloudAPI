# 101. Market

```text
GET https://rates.50x.com/market/
```

Obtain current average quotes with the base in selected currency or 1/median quotes in selected currency

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|base|String|false|Base currency symbol|
|coin|String|false|Currency symbol|
|period|String|false|Period: "D", "H4", "H"|

Note:

* Your query should contain parameter `base` or `coin`

**Sample query:**

```text

GET https://rates.50x.com/market?base=BTC

```

**Sample reply:**

```json

[{
    "50X": 
    {
        "vol": 15463,
        "rate": 4.183e-05, 
        "change": 0.0
    }, 
    "BCH": 
    {
        "vol": 463,
        "rate": 0.079074, 
        "change": -0.16
    }, 
    ... 
}]
```

**vol** - volume in BASE units or in COIN units (depends on query)

**rate** - rate

**change** - changes in % over the last 24 hours

### **Typescript**

```js
type MarketResponse =  {[key: string]: TMarketItem}

type TMarketItem = {    
    change: number
    rate: number
    vol: number
}
```
