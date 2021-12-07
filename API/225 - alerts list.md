# 225. List of existing alerts

===== DEPRICATED =====

```text
POST https://api.50x.cloud/json.alertslist/
```

**Parameters for mass-cancelation:**

|Name|Type|Required|Description|
|---|---|:----------:|--------|
|pair|String|false|Trading pair optional filter in `AAA/BBB` format|
|coin|String|false|Asset (sym1) optional filter|

**Returned values:**

* `alert_time`: alert event time for executed alerts
* `alertid`, `pair`, `bidmore`, `askless`, `expire_time`, `memo`

**Sample reply:**

```json
{"ok": true}
```
