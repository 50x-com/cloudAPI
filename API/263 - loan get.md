# 263. Loan get

> ll - считается как сумма, которую можно взять, чтоб Loan Level стал не более 300%
>
> mr - считается как сумма, которую можно взять, чтоб Margin Level был не менее 50%  (150% на самом деле)
>
> При этом система, в теории, дает взять максимальную из этих сумм, но есть вероятность что эта сумма будет очень близка к марджин коллу, поэтому тупому юзеру мы даем минимальный из этих лимитов
>
> margin_level 165.25% означает что Margin Ratio аккаунта сейчас 265.25%
> тоесть у пользователя в 2.6525 раза больше средств валют обеспечения чем необходимо для возврата займа
>
> Также введено ограничение на withdrow, вывести собственные средства можно только если margin_level будет больше 200% (margin_ratio > 300%)

```text
POST https://api.50x.cloud/json.get_loan
```

&nbsp;

&nbsp;

## Получение списка возможных займов

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|max_daily_percent|number|true|Maximum loan daily fee in percent|

### **Typescript**

```js
    Record<string, {mr: number, ll: number}>
```

&nbsp;

&nbsp;

## Получить займ

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|sym|string|true|Asset Symbol|
|amount|number|true|Asset quantity to be borrowed|
|max_daily_percent|number|true|Maximum loan daily fee in percent|
|otp|number|true|6-digit 2FA Code from Google Authenticator|

**Sample reply:**

```json
{"ok": true}
```

**Expected Errors:**

`28100`: There are not enough own funds on your account to get a new loan.[own_funds_percent,new_loan_level]

`28101`: Post-loan marginal coverage is not enough to maintain the loan.[post_own_funds_percent,margincall_level]
