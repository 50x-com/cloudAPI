# 203. Email confirmation

```text
POST https://api.50x.cloud/json.confirm_email/
```

**Parameters:**
|Name|Type|Required|Description|
|---|---|:----------:|--------|
|confirmation_code|String|true|Confirmation code from the email|

**Sample reply upon success:**

> **Note**
>
> Рекомендуется не использовать данный x_session_id для авторизации, так как возможно получение ошибок авторизации в приватных запросах. Вместо этого, для авторизации используйте: `201. Sign in`

```json
{"x_session_id": "frdifkahui2dc1fy59vr9fl2o08beb8u", "ok": true}
```
