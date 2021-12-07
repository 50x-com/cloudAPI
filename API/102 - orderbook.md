
# 102. Orderbook

```text
GET https://rates.50x.com/orderbook
```

Obtain an orderbook data for the indicated pair
**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------|--------|
|pair|String|true|Pair symbol|

**Sample query:**

```text
GET https://rates.50x.com/orderbook?pair=BAEX/ETH
```

**Sample reply:**

```json
{
    "pair": "BAEX/USDT",
    "rate_med": 0.00108505, 
    "rate_bid": 0.00101011, 
    "rate_ask": 0.00115999, 
    "bid": [
        [0.00101011, 1085.55], 
        [0.0010101, 130.9999977], 
        ...
    ], 
    "ask": [
        [0.00115999, 676.24147622], 
        [0.00116, 1423.12] 
        ...
    ]
}
```

**rate_med** - average price between best bid and best ask= ( best bid + best ask ) / 2

**rate_bid** - best bid

**rate_ask** - best ask

**bid** - bids (buy orders) array in format [ price, volume, price2]

**ask** - asks (sell orders) array in format [ price, volume,  price2] where price & price2 are the range boundaries where volume was calculated. The separate orders prices are somewhere in between of this two values.

### **Typescript**

```js
type TOrderbookItem = [number, number, number];

interface IOrderbookRequest{
    bid: TOrderbookItem[]
    ask: TOrderbookItem[]
    pair: string
    rate_ask: number
    rate_bid: number
    rate_med: number
}
```