# 214. (208) Deposit

```text
POST https://api.50x.cloud/json.deposit/
```

Returns address details for depositing given `sym`.

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|String|true|internal trading symbol of an asset to be deposited|

**Sample reply upon success:**

```json
{
    "ok": true, 
    "msg_id": 31002, 
    "sym": "TUSD", 
    "wallet": "0x9944hh4433gg22776622", 
    "html": "\n  To deposit TUSD, please send to this <strong>ETH address</strong>:<br><br><strong class=\"deposit-addr\">0x9944hh4433gg22776622</strong>\n  ", 
    "values": 
    ["TUSD", "ETH", "0x9944hh4433gg22776622",  "TrueUSD Stable Coin", null]
}
```

`ok` - TRUE on success

`sym` - internal trading symbol of an asset to be deposited

`wallet` - Address with tag in QR-code compatible format

`msg_id` - Message code to be used with the translations file

`html` - A default html-formatted message to be displayed in case of the translation failure

`values` - An array with all variables for the translation

`values[0]` - Same as 'sym', internal trading symbol of an asset to be deposited

`values[1]` - Parent blockchain or payment system name

`values[2]` - Address (without tag)

`values[3]` - Tag (optional, only for the assets that require TAG, like XRP)

`values[4]` - Asset name

**Expected ERROR codes**:
`21400`: External (blockchain) deposits are unavailable for your account type.

&nbsp;

### **Typescript**

```js
type TDepositData = {
    values: [string, string, string, string, string ];
    sym: string;
    wallet: string;
    html: string;
    msg_id: number
}
```
