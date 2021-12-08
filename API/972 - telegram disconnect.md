# 972. Telegram disconect

Remove connection TeleBot with Telegram Chat ID if it was connected before and generate new PIN-code after

```test
POST https://api.50x.cloud/json.telebot_remove/
```

**Parameters (required one of):**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|chat_id|number|false|Remove connection TeleBot with chat_id
|remove_all|number|false|Remove all connected chat_ids

**Sample reply:**

```json
{"ok": true}
```
