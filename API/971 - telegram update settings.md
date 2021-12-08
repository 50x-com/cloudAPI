# 971. Telegram update settings

Udate TeleBot message types settings. With types was sending to user.

```text
POST https://api.50x.cloud/json.telebot_writesettings/
```

**Parameters:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|login|number|false|`1` or `0` for sending notification about login
|incomingtransaction|number|false|`1` or `0` for sending notification about deposits
|withdrawaltransaction|number|false|`1` or `0` for sending notification about confirmed withdrawals
|orderactions|number|false|`1` or `0` for sending notification about new/close/change orders
|trades|number|false|`1` or `0` for sending notification about partial order filling
|orderfulfilment|number|false|`1` or `0` for sending notification about order fulfilment
|dailyreport|number|false|`1` or `0` for sending daily summary report

**Sample reply:**

```json
{"ok": true, "values": ["login", "withdraw"]}
```

**Returned values**:

`values`: Array of active types, for example ["login", "withdraw"]
