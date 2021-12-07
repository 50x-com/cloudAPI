### 970. TeleBot get PIN-code

Returns actual user PIN-code.

```
GET https://api.50x.cloud/json.telebot_pin/
```

**Parameters:**

|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|2fa|INT|`required`|2FA one-time code|

**Sample reply:**

```
{'ok': true, 'pin': 'pin-code'}
```

**Returned values**:

`pin`: Actual PIN-code for user

---

### 971. TeleBot update settings

Udate TeleBot message types settings. With types was sending to user.

```
GET https://api.50x.cloud/json.telebot_writesettings/
```

**Parameters:**

|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|login|BOOL[0,1]|optional|'1' for sending notification about login
|incomingtransaction|BOOL[0,1]|optional|'1' for sending notification about deposits
|withdrawaltransaction|BOOL[0,1]|optional|'1' for sending notification about confirmed withdrawals
|orderactions|BOOL[0,1]|optional|'1' for sending notification about new/close/change orders
|trades|BOOL[0,1]|optional|'1' for sending notification about partial order filling
|orderfulfilment|BOOL[0,1]|optional|'1' for sending notification about order fulfilment
|dailyreport|BOOL[0,1]|optional|'1' for sending daily summary report

**Sample reply:**

```
{'ok': true, 'values': array}
```

**Returned values**:

`values`: Array of active types, for example ["login", "withdraw"]

---

### 972. TeleBot disconect Telegram Chat ID

Remove connection TeleBot with Telegram Chat ID if it was connected before and generate new PIN-code after

```
GET https://api.50x.cloud/json.telebot_remove/
```

**Parameters (required one of):**

|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|chat_id|INT|optional|Remove connection TeleBot with chat_id
|remove_all|BOOL[0,1]|optional|Remove all connected chat_ids

**Sample reply:**

```
{'ok': true}
```
