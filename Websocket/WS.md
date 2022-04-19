# WS Connection

WS address: `wss://stream.50x.com:443/stream`

## Subscribes params

```js
{
        source: "webclient",
        sid: string, //x_session string
        subscribes: [
                {
                    type: "orderbook",
                    pair: string[] // example ["A2A/USDT"]
                },
                {
                    type: "market",
                    coin: string[] // example ["A2A", "USDT"]
                },
                {
                    type: "last_trades",
                    sym: string[] // example ["A2A", "USDT"]
                    pair: string[] // example ["A2A/USDT", "BTC/USDT"]
                },
        ] 
}
```

Params must be stringify before send to `WebSocket.send()`

## Ping-poing

Server is tracking is connecion alive. On each recieve `ping` message you need to send `pong`. Otherwise connection will be lost.

## Received data

Recived data can be `'ping'` or serialized `string`. After deserializing object can containg:

### Message data

```ts
public: {
    type: "last_trades" | "orderbook" | "market",
    params: string,
    data: (TradeInfo[] | IOrderbookRequest | MarketResponse )[]
},
private: {
    type: "oc" | "tc" | "bal" | "in" | "wd" | "lending" | "loan" | "ml" | "error" | "msgcode" | "msg",
    data: string // serialized => IOrder | IWSBalanceData | IIncomingItem | IWithdrawItem | ILendingItem | ILoanItem | IMarginData | IMessage | INotification |  IError
}
```

|Type|Description|Interface|
|---|:---|--------|
|`oc`|Order changed - receive when changing order param, open or close order|IOrder|
|`tc`|Trade changed - receive when order was filled or partially filled|IOrder|
|`bal`|Balance changed|IWSBalanceData|
|`in`|Incoming transaction|IIncomingItem|
|`wd`|Withdrawal transaction|IWithdrawItem|
|`lending`|Lending order changed|ILendingItem|
|`loan`|Loan order changed|ILoanItem|
|`ml`|Margin level changed|IMarginData|
|`error`|Error message|IError|
|`msgcode`|System notification|INotification|
|`msg`|Message|IMessage|

### Interfaces

```ts
type TmarketItem = {    
    change: number
    rate: number
    vol: number
}
type MarketResponse =  {[key: string]: TmarketItem}
type TradeInfo = {
    a:  0 | 1
    bs: 's' | 'b'
    ts: number
    rate: number
    vol1: number
    vol2: number
    pair: string
}
interface IOrderbookRequest{
    bid: TOrderbookItem[]
    ask: TOrderbookItem[]
    pair: string
    rate_ask: number
    rate_bid: number
    rate_med: number
}
interface IOrder {
    bs: "s" | "b"   
    commission: number 
    copied_to: null    | number
    expire_time: number   
    filled_amount: number
    filled_vol: number
    infinity: number
    last_changes: number
    memo: string
    oid: number
    pair: string
    poid: number
    rate: number
    sl_r: null | number
    sl_trigger: null | number
    slippage_pr: null | number
    sltp: number
    state: number
    sym1: string
    sym2: string
    time_cancel: number
    time_complete: number
    time_create: number
    time_last_fill: number
    tp_r: null | number
    trailing_pr: null | number
       type: "l" | "m"
    vol: number
    was_changed: number
}
interface IWSBalanceData {
    [key: string]: {
        b: number, // Total balance
        a: number, // Available
        l: number, // Loans
        o: number, // Own fund
        r: number, // Reserved
        w: number, // withdraw available
    }
}
interface IIncomingItem {
    addr: string
    amount: number
    confirmations: number
    id: number
    rec_time: number
    staking_base: null | number
    state: string
    symbol: string
    txh: string
    oid?: number
}
interface IWithdrawItem {
    amount: number
    memo: string
    oid: number
    id?: number
    out_txh: string
    state: string
    symbol: string
    time_confirm: number
    time_create: number
    time_payout: number
    time_payout_after: number
    to_addr: string
    to_tag: null | string
}
interface ILendingItem {
    amount: number
    expire_time: number
    fee_received: number
    last_changes: number
    oid: number
    percent: number
    state: number
    symbol: string
    time_create: number
    unused_amount: number
}
interface ILoanItem {
    amount: number
    fees: number
    last_changes: number
    lid: number
    max_percent: number
    pay_back_time: number
    percent: number
    state: number
    symbol: string
    time_create: number
}
interface IMarginData {ml: number, ll: number}
interface IMessage {
    message?: string
    text?: string
    title: string | 'telegramID'
}
interface IError {
    error?: string, 
    error_code?: number | string
    values?: TValues
}
interface INotification extends IError{
    ok?: boolean
    message_code?: number
    msg_id?: number
    id?: number
    date?: number
    dates?: Record<string, number>
    img?: string
    type?: TNoteType
    textKey?: string
    translations?: {[ket: string]: string}
}

type TValues = (string | number)[] | Record<string, string | number | boolean>
```

## Example ussage

```js

const ws = new WebSocket(`wss://stream.50x.com:443/stream`);

ws.onopen = () => {
    const params = {
        source: "webclient",
        sid: "[your x-session]",
        subscribes: [
            {
                type: "orderbook",
                pair: ["A2A/USDT"]
            },
            {
                type: "market",
                coin: ["A2A"]
            },
            {
                type: "last_trades",
                sym: ["A2A"],
                pair: ["A2A/USDT"]
            },
        ]
    }; 
    ws.send(JSON.stringify(params));
};
ws.onmessage = e => {
    if(e.data === "ping"){
        ws.send("pong");
    }
    const data = JSON.parse(e.data);
    if(data.public){
        console.log("public data", data.public);
    }
    if(data.private){
        console.log("private data", data.private);
    }
}
```
