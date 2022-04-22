# 100. Currencies

```text
POST https://api.50x.cloud/json.currencies/
```

**No Parameters**

* * *

**Returned values:**
|Name|Type|Description|
|---|:---|--------|
|address_regex|string|Regex for address|
|allow_fiat_deposits|boolean|Available for depisit with partners (AdvCache)|
|allow_fiat_withdrawal|boolean|Available for withdrawal with partners (AdvCache)|
|block_explorer|string|URL to block explorer|
|contract_address|string|Smart contract address for non-root tokens|
|decimals_on_blockchain|number|Decimals on blockchain|
|deposit_enabled|boolean|If `false` depositing is currently turned off for this asset |
|descr|string|Description|
|ico_enabled|boolean|If `true` this asset is currently in the ICO mode|
|loan_security|boolean| ??? |
|min_trade_vol|number|Minimal trading volume for sale in asset units|
|multiplicator|number| ??? |
|ob_price_decimals|number|Orderbook price decimals|
|ob_vol_decimals|number|Orderbook volume decimals|
|show_tag|boolean|Asset transactions may have `tag` field in addition to the address|
|staking|boolean| ??? |
|sym|string|Unique asset's ticker in the system|
|tag_name|string|Tag name|
|title|string|Name to be displayed|
|trade_fee|number|Trading commision in percent**|
|new_addr_fee|boolean|Comission for creation new address for coin|
|wd_fee|number|Withdrawal fee in asset units|
|internal_transfer_fee|number|Fee for transfer between addresses inside exchange|
|trade_enabled|boolean|If `true` this asset is currently available for trading|
|trust_level|number|Internal rank defining available internal operations with this asset|
|txlink|string| ??? |
|url|string|Official or most common source of description of an asset|
|withdraw_enabled|boolean||

**\* Note:** If `show_tag`==true, additional `tag` field must be shown to the user with depositing address with special warning that `tag` is required to be used in transaction or tokens will be lost. Also, `tag` input must be presented in withdrawal dialog, but it is not required for withdrawal.

**\*\* Note:** In any trading pair trading commission is calculated as max(currencies.sym1.trade_com, currencies.sym2.trade_com);

### **Typescript**

```js

export interface ICurrencie{
    address_regex: string
    allow_fiat_deposits: boolean
    allow_fiat_withdrawal: boolean
    block_explorer: string
    blockchain: string
    contract_address: string
    decimals_on_blockchain: number
    deposit_enabled: boolean
    descr: string
    ico_enabled: boolean
    internal_transfer_fee: number
    loan_security: boolean
    min_trade_vol: number
    multiplicator: number
    need_confirmations: number
    need_publickey: boolean
    ob_price_decimals: number
    ob_vol_decimals: number
    show_tag: boolean
    staking: boolean
    sym: string
    tag_name: null | string
    title: string
    trade_com: number
    trade_enabled: boolean
    trust_level: number
    txlink: string
    url: string
    wd_com: number
    withdraw_enabled: boolean
}
```
