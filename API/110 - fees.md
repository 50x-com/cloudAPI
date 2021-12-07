# 110. Fees

Returns the list of system fees

```text
POST https://api.50x.cloud/json.fees/
```

**No Parameters**

**Sample reply:**

```json
{"ok": true, "pma_open": {"id": 91200, "qty": 5000, "type": "A2A"}}
```

**Returned values:**

`fee_name`: (array) describes the fee to be taken:

`id`:  a unique fee ID

`qty`: value in tokens, if the fee is a constant (mandatory if `percent` is not returned)

`percent`: value in percent (mandatory if `qty` is not returned)

`type`: can be 'a2a' or 'sym' or 'percent'
_NOTE: if `qty` and `percent` are received in the same reply, it means that max(`qty`,`percent`) will be taken regardless the `type`._

### **Typescript**

```js
type TFeeItem = {
    id: number;
    fee_name: string;
    description: string;
    regular_qty: number;
    percent: number;
    qty: number;
    type: 'A2A' | 'percent' | 'sym';
    promo_deadline?: number;
}

interface IFees {
    advcash_usdt_withdraw?: TFeeItem 
    pma_close_deposit?: TFeeItem 
    pma_deposit?: TFeeItem 
    pma_open?: TFeeItem 
    telebot_message?: TFeeItem 
    new_deposit_address?: TFeeItem 
}
```
