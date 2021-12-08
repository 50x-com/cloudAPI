# 250. `The list of API keys`

Returns an array with existing API keys for current user's account.

```text
POST https://api.50x.cloud/json.api_key_list/
```

**No Parameters**

**Sample Reply:**

```json
[
    { 
      "key": "===key===",
      "trade_enabled": true,
      "withdraw_enabled": false,
      "ip_restriction_enabled": false,
      "ip_restriction_list": null,
    }, 
    ...
  ]
```

**Returned Values:**

`key`: STRING, the API Key

`trade_enabled`: BOOLEAN; if TRUE, trade orders can be created, changed and deleted using this key

`withdraw_enabled`: BOOLEAN; if TRUE, withdrawal orders can be created using this key

`ip_restriction_enabled`: BOOLEAN; if TRUE, IP whitelest will be used to control access

`ip_restriction_list`: ARRAY of permitted IPs
