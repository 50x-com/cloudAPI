# 232. `Order info`

```test
POST https://api.50x.cloud/json.orderinfo/
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|oid|number|true|Unique order id|

**Sample reply:**

### **Typescript**

```js
type TOrderinfo = {
    bs: "s" | "b"
    expire_time: number
    filled_vol: number
    last_changes: number
    oid: number
    pair: string
    poid: null | number
    rate: number
    sltp: boolean
    state: number
    sym1: string
    sym2: string
    time_cancel: number
    time_complete: number
    time_create: number
    time_last_fill: number
    type: "l" | "m"
    vol: number
}
```
