## Private methods, called from the PMA

---
### 920. PMA editing request
Changes settings of the existing PMA

POST https://api.50x.cloud/json.edit_pma/

Required Parameters:
|Name|Type|Mandatory|Description|Translation key|
|---|---|:----------:|--------|--------|
|pmaid|INT|`required`|Unique PMA ID|NONE|
|otp|INT|`required`|2FA one-time code|code2fa|

The following parameters are optional and can be changed only for the PMA with 0 subscribers: 

**cross and stoploss**: can only be changed to value: 1

**name, managersshare, maxdd, lockup, cycle, referral, maxspread, userlevel**

can be set as described in 912. PMA opening request
The following parameters are optional and can be changed for any PMA: 

**description, mindeposit, reward, guestlevel**

NOTES: 
Please refer to 912. PMA opening request for parameters details
If the LISTED PMA is changed, it will be temporary becomes UNLISTED and will be listed
Sample reply:
{"ok": true}