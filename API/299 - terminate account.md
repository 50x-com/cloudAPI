# 299. Terminate the account

Terminates the account, converts all balances to Ether with market orders and withdraws final Ether (ETH) balance to previously set emergency withdrawal wallet.

```text
POST https://api.50x.cloud/json.terminate_account/
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------|--------|
|masterkey|String|true|Master Key received from API.207 method. After 180 days of the account's inactivity (from last successful login) `login` of the account to be deleted can be sent in this parameter instead of Master Key.|
|ewa_set|object|true|Example: {"BTC": "===addreess===", "ETH": "===address==="}|

**Sample reply:**

```json
{"ok": true}
```

**Expected Errors:**

* `29901`: Wrong Master Key or login. No account found.
* `29902`: Account {login} is already in the process of the termination.
* `29903`: Account {login} is suspended and cannot be terminated right now. Please contact the support via email {domain.email} to solve this issue first.
* `29904`: Internal Error: account termination service is currently unavailable.
* `29905`: Master Key is currently required to terminate this account. If you have lost your Master Key, please wait 180 days from the last successful login to the system and try again without it.
* `29908`: No Emergency Withdrawal Addresses were set for your account. Unable to terminate the account.
* `29909`: Unexpected error during account termination. Your account will be terminated by the administrator manually.
* `29906`: 
  * Пример получения ошибки: {error_code: 29906, values: {blockchains: ["BTC", "ETH"]} }
  * Переменная `blockchains` список блокчейнов, для которых нужно передать адреса в переменной `ewa_set`.
