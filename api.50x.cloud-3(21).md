![Make Your Own Crypto-Exchange](https://m.50x.com/media/terminal-logo.svg)
## Make Your Own Crypto-Exchange!
# api.50х.cloud
## Cloud API methods 
_Revision: 3(20). Last update 07.07.2021_
### Table of contents
* Description
* Status Codes
* Response Messages and Error Codes
* JS sample code
##### Public methods:
* 001. Daily snapshot 
* 100. Available tokens' info 
* 101. Current average quotes
* 102. Orderbook
* 103. Chart
* 104. Getting the list of last trades
* 110. Fees
##### Private methods:
* 201. SIGN UP
* 202. SIGN IN
* 203. Email confirmation
* 204. Password reset code request
* 205. Change password
* 206. CHANGED `Enable/Change 2FA`
* 207. DEPRECATED `Disable 2FA`
* 207. NEW `Getting MASTER KEY`
* 208. Set Emergency Withdrawal Addresses (EWA)
* 209. NEW `Enable/Change withdraw OTP`

* 211. User information
* 212. Getting the list of incoming transactions
* 213. Getting the list of withdrawal orders
* 214. <-208. Deposit
* 215. <-209. Withdraw
* 216. Withdrawal order cancelation
* 219. Get Emergency Withdrawal Addresses (EWA)

* 220. Blotter - cashflow
* 221. Userinfo update
* 222. User's actions log
* 223. User's trades log
* 225. `List of existing alerts`
* 226. `Setting a new alert`
* 227. `Changing/canceling the alerts`

* 230. <-218. Getting the lists of Open or Closed orders
* 231. <-214. Placing an order
* 232. <-219. Order info
* 233. <-217. Changing order
* 234. <-215. Order cancellation
* 235. <-216. Mass Order cancellation

* 240. `Write user's settings to the server` https://api.50x.cloud/json.readsettings/
* 241. `Read user's settings from the server` https://api.50x.cloud/json.writesettings/
* 242. `Reset user's settings on the server` https://api.50x.cloud/json.resetsettings - сделать на клауд

* 250. `Existing API keys list` https://api.50x.cloud/json.api_key_list/
* 251. `Creating new API key` https://api.50x.cloud/json.add_api_key
* 252. `Deleting API key` https://api.50x.cloud/json.delete_api_key
* 253. `???` https://api.50x.cloud/json.save_api_key
 

* 280. /json.transfer_ste
* 281. `Getting a new loan` https://api.50x.cloud/json.get_loan

* 290. Logout
* 291. Logout From all devices
* 299. Terminate the account

---
**Status Codes:**
#### Order position status:
`null`: undefined
`1`: SLTP order can be set
`2`: SLTP order was set, unfilled 
`3`: SLTP order was set, partially filled
`5`: SLTP order was filled
`9`: position was closed, no SLTP order can be set

#### Possible states of the trading orders:
`0`: Waiting
`1`: Placed
`2`: Partial filled
`3`: Fully filled
`5`: SLTP child order exists
`7`: SLTP child order was filled or closed after partial fill
`50`: Wait for cancel
`51`: Cancelling
`52`: Cancelled

#### Possible states of the account termination subroutine:
`termination_state`
`0`: the termination procedure has not been activated yet
`1`: Master Key was used and account is in the process of the termination
`2`: All tokens have been changed to emergency withdrawal tokens
`3`: All tokens have been sent to EWAs
`5`: Account Termination was requested without Master Key and the delay period is not over yet.

---
Cloud API is designed to be used by 3rd party applications and has full support for account management functions, from sign up to deposits and withdrawals. For trading robots you should use ordinary API at <https://api.50x.com> ("Public methods" and "Private methods" sections). 
`Please note that accounts created via Cloud API can be accessed only from the same 3rd party app in which they were created. Also, the app can be used to access the accounts created from this app only.`
This literally means that each app uses separate user DB so it is impossible to login to the account created in another 3-rd party app.

To access api.50x.cloud, any  HTTP query should contain  `X-PARTNER` header with the partner identification. For development purposes you can use the 'other' test identification. After the app has been developed, you can send an email to support@50x.com and obtain your permanent partner identification.  

Likewise, all authorized queries should contain the  `X-SESSION` header field, which could be obtained by calling `/json.login/` authorization method or `/json.confirm_email/` email confirmation method.

---
For more details, refer to this JS example ("for dummies" code style) of using 50x.cloud  API:
```
<!doctype html><html lang="en"><head><title>50x.cloud - Lightweight JS API Example</title><meta http-equiv="content-type" content="text/html; charset=utf-8" />
<script type="text/javascript">
document.x_session = '';
function _e( elid ) {return document.getElementById(elid);} function _v( elid ) {return document.getElementById(elid).value;} function _l( msg ) {_e('id_log').innerHTML = _e('id_log').innerHTML + '<hr>' + msg;}
	
function _api(method, params, callback, errorcallback) {
	var params_array = new Array();
	for (var key in params) {
		params_array.push(key + '=' + encodeURIComponent(params[key]));
	}
	var url = 'https://api.50x.cloud/' + method + '/';
	var xmlhttp;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState != 4) return;
		if (xmlhttp.status == 200) {
			if ( callback ) {
				callback(xmlhttp.responseText);
			} else {
				_l(xmlhttp.responseText);
			}
		} else {
			if ( errorcallback ) {
				errorcallback(xmlhttp.statusText);
			} else {
				_l('API CALL ERROR:' + xmlhttp.statusText);
			}
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("X-PARTNER", "other");
	if ( document.x_session ) {
		xmlhttp.setRequestHeader("X-SESSION", document.x_session);
	}
	xmlhttp.send(params_array.join('&'));
}

function b_login() {
	_api( 'json.login', {'email':_v('id_login'),'password':_v('id_pwd'),'key':_v('id_2fa')}, function ( res ) {
		_l( res );
		if ( ! res.error ) { document.x_session = JSON.parse( res ).x_session_id; }
	});
}

function b_userinfo() {
	_api( 'json.userinfo', {} );
}

function b_join() {
	_api( 'json.join', {'email':_v('id_email_reg'),'password':_v('id_pwd_reg'),'repassword':_v('id_repwd_reg')} );
}

function b_init_resetpwd() {
	_api( 'json.init_resetpwd', {'email':_v('id_email_reset')} );
}

function b_confirm_email() {
	_api( 'json.confirm_email', {'confirmation_code':_v('id_email_code')}, function ( res ) {
		_l( res );
		if ( ! res.error ) {
			document.x_session = JSON.parse( res ).x_session_id;
		}
	});
}

function b_logout() {
	_api( 'json.logout', {} );
}

function b_enable_2fa_1() {
	_api( 'json.enable_2fa', {'step':'1'} );
}

function b_enable_2fa_2() {
	_api( 'json.enable_2fa', {'step':'2','key':_v('id_2fa_code')} );
}

function b_disable_2fa_1() {
	_api( 'json.disable_2fa', {'key':_v('id_2fa_code')} );
}

function b_disable_2fa_2() {
	_api( 'json.disable_2fa', {'email':_v('id_login'),'password':_v('id_pwd'),'key':_v('id_2fa_code')} );
}
</script>
</head>

<body>
	<input type="text" placeholder="E-Mail" id="id_email_reg"/>
	<input type="text" placeholder="Password" id="id_pwd_reg"/>
	<input type="text" placeholder="Repeat password" id="id_repwd_reg"/>
	<input type="button" onclick="b_join();" value="Join"/>
	<hr>
	<input type="text" placeholder="E-Mail confirmation code" id="id_email_code"/>
	<input type="button" onclick="b_confirm_email();" value="Confirm Email"/>
	<hr>
	<input type="text" placeholder="E-Mail for reset" id="id_email_reset"/>
	<input type="button" onclick="b_init_resetpwd();" value="Reset password"/>
	<hr>
	<input type="text" placeholder="Login" id="id_login"/>
	<input type="text" placeholder="Password" id="id_pwd"/>
	<input type="text" placeholder="2FA" id="id_2fa"/>
	<input type="button" onclick="b_login();" value="Login"/>	
	<input type="button" onclick="b_userinfo();" value="User Info"/>
	<input type="button" onclick="b_logout();" value="Logout"/>
	<hr>
	<input type="button" onclick="b_enable_2fa_1();" value="Enable 2FA (step1)"/>
	<input type="text" placeholder="2FA Code" id="id_2fa_code"/>
	<input type="button" onclick="b_enable_2fa_2();" value="Enable 2FA (step2)"/>
	<input type="button" onclick="b_disable_2fa_1();" value="Disable 2FA (after login)"/>
	<input type="button" onclick="b_disable_2fa_2();" value="Disable 2FA (without login)"/>
	<hr>
	<div id="id_log"></div>
</body>

</html>
```
## Response Messages and Error Codes
All requests, should no additional info be displayed to the user, return JSON with `{"ok": true}` element upon success. 
Any request to the API may result in JSON encoded response containing `"error_code"` or `"msg_id"` element. For both cases this response should be decoded using `"code"` section of the translations file which contains both message and error codes. These responses may contain `"values"` array with necessary values to be included in the translation, replacing corresponding `${n}` tag, where `n` represents an index in the `"values"` array.

**Sample replies:**
```
{"message": "Please check your email for activation link", "msg_id": 31001, "ok": true}
```
```
{"error_code": 37017, "error": "Auth fail"}
```
```
{"error_code": 33027, "error": "Not enough available balance for withdraw", "values": ["BTC", 1.2345, 0.987654321]}
```
The last example should be displayed to the user using this `translation` element:
```
"code": {
    "33027": {
        "en": "Not enough available ${0} balance for withdraw, need ${1}, your available balance is ${2} ${0}", 
        "ru": "Недостаточно свободного баланса ${0} для вывода, требуется ${1}, в наличии свободно ${2} ${0}"
    }
}
```
resulting in the folowing string to be displayed:
`Not enough available BTC balance for withdraw, need 1.2345, your available balance is 0.987654321 BTC`

---
---
## Public methods:
Returns an array with supported tokens with technical info and permissions.

---
### 001. Market Snapshot
```
GET https://rates.50x.com/dailysnapshot/
```
Returns daily trading activities snapshot of the exchange.
**No Parameters**
**Sample reply:**
```
{"WAVES/BTC": {"change_percent": -60.14, "volume_24": 1128.75540067, "last_price": 6.77e-05}, "TUSD/BTC": {"change_percent": 0.18, "volume_24": 0.0, "last_price": 8.844e-05}, "ETC/BTC": {"change_percent": 1.19, "volume_24": 96.65079531, "last_price": 0.000511}}
```

---
### 100. `Available Tokens' info`
 ```
https://api.50x.cloud/json.currencies/
```
*No Parameters**
**Returned values:**
|Name|Type|Description|Sample value|
|---|:---:|--------|---|
|contract_address|string|Smart contract address for non-root tokens|"0xffe04344f48e7ca2ee5e25bf557ac88b1b769cb3"|
|deposit_enabled|boolean|If `false` depositing is currently turned off for this asset |false|
|descr|string|Description|"Trade subaccount for STE Tokens"|
|ico_enabled|boolean|If `true` this asset is currently in the ICO mode|false|
|min_trade_vol|float|Minimal trading volume for sale in asset units|130|
|ob_price_decimals|INT|Orderbook price decimals|8|
|ob_vol_decimals|INT|Orderbook volume decimals|8|
|show_fast_button|boolean|DELETED|true|
|show_tag|boolean|Asset transactions may have `tag` field in addition to the address|false|
|sym|string|Unique asset's ticker in the system|STE|
|title|string|Name to be displayed|STE token|
|trade_com|float|Trading commision in percent**|0.2|
|trade_enabled|boolean|If `true` this asset is currently available for trading|true|
|trust_level|INT|Internal rank defining available internal operations with this asset|100|
|url|string|Official or most common source of description of an asset|https://50x.com/|
|wd_com|float|Withdrawal fee in asset units|5|
|withdraw_enabled|boolean||true|
DEPRECATED `wd_com` NEW `wd_fee`
NEW `wd_com` - If specified, constant fee per withdrawal in token units.
DELETE `show_fast_button`

**\* Note:** If `show_tag`==true, additional `tag` field must be shown to the user with depositing address with special warning that `tag` is required to be used in transaction or tokens will be lost. Also, `tag` input must be presented in withdrawal dialog, but it is not mandatory for withdrawal.
**\*\* Note:** In any trading pair trading commission is calculated as max(currencies.sym1.trade_com, currencies.sym2.trade_com);

---
### 101. Current average quotes
```
GET https://rates.50x.com/market/
```
Obtain current average quotes with the base in selected currency or 1/median quotes in selected currency
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|base|String|optional|Base currency symbol|
|coin|String|optional|Currency symbol|
Note:
* Your query should contain parameter `base` or `coin`

**Sample query:**
```
GET https://rates.50x.com/market?base=BTC
```
**Sample reply:**
```
[{
    "STE": 
    {
        "vol": 15463,
        "rate": 4.183e-05, 
        "change": 0.0
    }, 
    "BCH": 
    {
        "vol": 463,
        "rate": 0.079074, 
        "change": -0.16
    }, 
    ... 
}]
```
**vol** - volume in BASE units or in COIN units (depends on query)
**rate** - rate
**change** - changes in % over the last 24 hours

---
### 102. Orderbook
```
GET https://rates.50x.com/orderbook/
```
Obtain an orderbook data for the indicated pair
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|`required`|Pair symbol|
**Sample query:**
```
GET https://rates.50x.com/orderbook?pair=STE/ETH
```
**Sample reply:**
```
{
    pair: "BAEX/USDT"
    "rate_med": 0.00108505, 
    "rate_bid": 0.00101011, 
    "rate_ask": 0.00115999, 
    "bid": [
        [0.00101011, 1085.55], 
        [0.0010101, 130.9999977], 
        ...
    ], 
    "ask": [
        [0.00115999, 676.24147622], 
        [0.00116, 1423.12] 
        ...
    ]
}
```
**rate_med** - average price between best bid and best ask= ( best bid + best ask ) / 2
**rate_bid** - best bid
**rate_ask** - best ask
**bid** - bids (buy orders) array in format [ price, volume, price2]
**ask** - asks (sell orders) array in format [ price, volume,  price2] where price & price2 are the range boundaries where volume was calculated. The separate orders prices are somewhere in between of this two values.

---
### 103. Chart
Returns an array of an OHLCV values for creating a median rates chart of the specified traiding pair.
```
GET https://rates.50x.com/chart/
```

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|`required`|Pair symbol|
|period|String|`required`|Period symbol|
|begin|Timestamp|optional|Beginning of the requested period|
|end|Timestamp|optional|End of the requested period|
**Available periods:** M1, M5, M15, M30, H1, H2, H4, D, W
**Sample query:**
```
GET https://rates.50x.com/chart?pair=ETH/DASH&period=h1
```
**Sample reply:**
```
[{"close": 1.28261031,
  "date": 1536256800,
  "high": 1.29277708,
  "low": 1.27164355,
  "open": 1.28232894,
  "vol: 0
},
 {"close": 1.27752193,
  "date": 1536260400,
  "high": 1.30094927,
  "low": 1.2643695,
  "open": 1.28310266,
  "vol: 134.33
 },
 {"close": 1.27696195,
  "date": 1536264000,
  "high": 1.28768982,
  "low": 1.27360386,
  "open": 1.27763158,
  "vol: 0
 },
  ...
]
```

---
### 104. Getting the list of last trades 
```
POST https://rates.50x.com/last_trades/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|optional|Pair's name (obtain last trades for a pair)|
|sym|String|optional|Currency's name (obtain last trades for a currency)|
**Sample reply:**
```
{"ok": true,
 "trades": [{"bs": "b",
             "pair": "ETH/BTC",
             "rate": 0.02993642,
             "ts": 1536678972.0,
             "vol1": 0.81505393,
             "vol2": 0.0243998},
            {"bs": "b",
             "pair": "ETH/BTC",
             "rate": 0.03,
             "ts": 1536677973.0,
             "vol1": 10.0,
             "vol2": 0.3},
             ...]
}
```

---
### 110. Fees
Returns the list of system fees
```
POST https://api.50x.cloud/json.fees/
```
**No Parameters**
**Sample reply:**
```
{"ok": true, 
 "fees":{
  "pma_open":{id": 91200, "qty": 5000, "type": "A2A"}
 }
}
```
**Returned values in fees[fee_name] array:**
`fee_name`: (array) describes the fee to be taken:
`id`:  a unique fee ID
`qty`: current required value in tokens, if the fee is a constant (mandatory if `percent` is not returned)
`regular_qty`: value in tokens without discount, if there is any discount (optional)
`promo_deadline`: timestamp of the deadline for PROMO PRICE shown in `qty` (optional)
`percent`: value in percent (mandatory if `qty` is not returned)
`type`: can be 'a2a' or 'sym' or 'percent'
_NOTE: if `qty` and `percent` and `type:sym` are received in the same reply, it means that max(`qty`,`percent`) will be taken._

**Expected ERROR codes**:
???
---
---
## Private methods
All methods are called upon by POST queries to <https://api.50x.cloud> 
Please look to HTML example code on top of this page. 

All methods return JSON. 
In case of success, JSON will NOT contain error field.
In case of an error, method will return JSON with `{error:"error description"}`
If method is designed to be called upon by an authorized user, but is called without authorization, JSON will contain `{error:"Login required"}`
---

### 201. SIGN UP 
```
POST https://api.50x.cloud/json.join/
```
Creating a new account
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|email|String|`required`|email|
|password|String|`required`|password|
|repassword|String|`required`|repeat password|
Note: `The account will be created with given email as login`
**Sample reply:**
```
{"ok": true}
```

---
### 202. SIGN IN
```
POST https://api.50x.cloud/json.login/
```
Login using POST request to get session ID
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|email|String|`required`|email|
|password|String|`required`|password|
|key|String|`required`|2FA OTP, should be blanc if 2FA has not been activated|
|key2|String|DELETED|next 2FA OTP, required if ERROR 37040-37041 received|
|key3|String|DELETED|next 2FA OTP, required if ERROR 37040-37041 received|
**Note:**
If ERROR 37040 or 37041 received, key parameter MUST contain 3 different OTP generated one by one, separated with commas. User should use separate fields to enter OTPs with proper explanation in the interface how to collect them.
**Sample reply upon success:**
```
{"x_session_id": "frdifkahui2dc1fy59vr9fl2o08beb8u", "ok": true}
```

**Sample reply upon an error:**
```
{"error_code": 37017, "error": "Auth fail"}
```
If 2FA was activated for the current account and a `key` parameter is missing or empty, you will get an ERROR `37012` in reply, and should ask the user to fill "2FA OTP" input to be transferred as a value in `key` parameter.
IF Wrong 2FA OTP was entered 3 times in a row for this account, you will get an ERROR `37040` in reply. A user will need to enter 3 different OTP generated one by one to log in. 2 additional fields (`key2` and `key3`) must be shown to the user in this case with required 6-digit password.

---
### 203. Email confirmation
```
POST https://api.50x.cloud/json.confirm_email/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|confirmation_code|String|`required`|Confirmation code from the email|
**Sample reply upon success:**
```
{"x_session_id": "frdifkahui2dc1fy59vr9fl2o08beb8u", "ok": true}
```

---
### 204. Password reset code request
```
POST https://api.50x.cloud/json.init_resetpwd/
```
A e-mail with the password reset code will be sent to the user's email.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|email|String|`required`|email|

---
### 205. Change password
```
POST https://api.50x.cloud/json.resetpwd/
```
 Setting new password using password reset code from email

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|email|String|`required`|email|
|emailcode|String|`required`|code from email|
|password|String|`required`|new password|
|repassword|String|`required`|new password repeat|
|key|String|optional|2FA Code, `required` if 2FA is activated|

---
### 206. Enable/Disable 2FA OTP & WOTP 
```
POST https://api.50x.cloud/json.enable_2fa/
```
Enable 2FA on user's account in two steps.
**Step 1:** 
request without parameters to get first OTP SEED private key
request with `otp` parameter if 2FA was already set and you want to change OTP SEED private key
request with `wotp:1` and `otp` parameter to get new Withdrawal OTP SEED private key

**Sample reply upon success:**
```
{'key':'KJHD93UDWYY', "ok": true}
```
`key` should be displayed to the user as a string and a QR-code for the Google Authenticator app
**Step 2:** request with parameters:
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|step|INT|`required`|value must be `2`|
|otp|String|`required`|6-digit 2FA Code from Google Authenticator|
|wotp|Boolean|optional|If `1` sets new Withdrawal OTP|
**Note:**

**Sample reply upon success:**
```
{"ok": true}
```

### 207. Getting Account's Master Key
```
POST https://api.50x.cloud/json.masterkey/
```
Setting Master Key for the user's account in two steps.
**Step 1:** request with parameters:
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit WOTP/OTP from Google Authenticator|
**Sample reply upon success if Master Key has NOT been activated:**
```
{'master_key':'KJKJHD93UDWYYHD93UDWYY', "ok": true}
```
**Sample reply upon success if Master Key has been activated:**
```
{'master_key':'KJKJHD93UDWYYHD93UDWYY', "ok": true, "activated": true}
```
`master_key` should be displayed to the user as a string with [copy] button or onClick functionality.
The [activate] button should remove `masterkey` from the device screen and from any cashe used (including memory buffer) completely and collect data from user for STEP 2:Activation on the new screen to ensure that `masterkey` was properly saved offline by the user. Paste option to `lastchars` input should be disabled.
**Step 2:** request with parameters:
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|step|INT|`required`|value must be `2`|
|lastchars|char(5)|`required`|last 5 chars from `masterkey` shown in step 1|
**Sample reply upon success:**
```
{"ok": true, "activated": true}
```
Upon success, 211. request will contain `masterkey:true` parameter.
**Expected errors:**
Error `20701`: Master Key was already set for this account and cannot be changed.
Error `20702`: Master Key cannot be set for this account (PMA). Please return to your main account to set the Master Key.
Error `20705`: Provided characters are not matching current Master Key. Last {5} characters of the Master Key are required to activate it.

---
### 208. Setting Emergency withdrawal address (EWA)
```
POST https://api.50x.cloud/json.set_emergency_address/
```
Stores new default emergency withdrawal wallet address for the asset.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|Asset symbol|
|address|String|`required`|Wallet address for the `sym`|
|tag|String|optional|Wallet TAG if necessary|
|otp|INT|`required`|6-digit 2FA OTP from Google Authenticator|
**Sample reply upon success:**
```
{"ok": true, "sym": "BTC", "address": "0x5gfdjshb36fjshgjfjsdhbjhfbsjdh",}
```
**Note:**
In case API.209 : Withdrawal OTP (WOTP) is enabled for the account, the WOTP code must be sent in the `otp` parameter instead of regular OTP.
**Expected ERRORS:**
`20801`: Wrong Emergency Withdrawal Address (EWA) format.

---
### 209. Disable 2FA OTP
```
POST https://api.50x.cloud/json.disable_2fa/
```
Disables withdraw OPT for the user's account. Main OTP cannot be disabled, only changed.
TODO
**Step 2:** request with parameters:
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit 2FA OTP (WOTP)|
|wotp_delete|Boolean|optional|If `1` : Disables Additional Withdrawal OTP|
**Sample reply upon success:**
```
{"ok": true}
```
**Expected ERRORS:**
`20900`: Main 2FA OTP cannot be disabled. You may change the SEED Private key for your 2FA OTP.
---
### 211. User information
```
POST https://api.50x.cloud/json.userinfo/
```
After authorization, user information and balances are shown 
**Parameters:** No
**Sample reply** (subsequently, additional fields may appear):
```
{
    "email_confirmed": true, 
    "last_auth_ip": "10.1.0.254", 
    "lang": "en", 
    "first_name": "Nick", 
    "ip_restriction_list": "", 
    "blocked": 0, 
    "prev_auth_ip": "10.1.0.254", 
    "email": "nick3@mail.com", 
    "username": "nick3@mail.com", 
    "ip_restriction_enabled": false, 
    "fa2_auth_enabled": true, 
    "last_name": "", 
    "actions": "", 
    "balances": [
        ["A2A(B)", 0.074999889323, 0.0],
        ["A2A", 0.0, 0.0], 
        ["BTC", 0.8909556407, 0.28180805], 
        ["ETH", 13.08039, 7.614], 
        ["LTC", 0.11994, 0.0], 
        ["PCT", 0.0, 0.0],
        ["DASH", 0.0, 0.0],
        ["USDT", 0.0, 0.0], 
        ["BTG", 0.0, 0.0], 
        ["BCH", 0.0, 0.0], 
        ["TRX", 1839.7, 100.2], 
        ["GSXC", 0.0, 0.0]
    ], 
    "agreements": [
        "terms":0,
        "riscs":0,
        "privacy":0,
        "pma":0,
        "margin":0,
        "shorts":0
    ]
}
``` 
`balances` ARRAY, format: ["COIN-SYMBOL", TOTAL_BALANCE, RESERVED_BALANCE]
`agreements` shows if the user confirmed Terms in full and each critical aspect separatelly:
1. `terms` - Terms of services
1. `pma` - Professional Master Account rules
1. `risks` - Risks disclosure
1. `privacy` - Privacy policy
1. `margin` - Margin trading rules
1. `loans` - Loan rules

`type_id` - '1' for the ordinary account, '3' for PMA
`blocked`: BOOL, "1" shows that account is suspended by the admin and user need to get in touch with the support
`nickname` - public changeable nickname of the account (visible in the terminal all the time, should not contain e-mail or any private info)
`own_pma_list`: ARRAY with user's managed PMA IDs
`deposited_pma_list`: ARRAY with user's deposited PMA IDs
`username`: STRING, login 
`email`: STRING, user's email registered in the system 
`email_confirmed`: BOOL, shows is user provided confirmation code sent to his email 
`last_auth_ip`: IP of the last successful authorisation  
`prev_auth_ip`: IP of the previos successful authorisation  
`lang`: STRING, last selected language for the interface
`ip_restriction_list`: ARRAY with allowed IPs
`ip_restriction_enabled`: BOOL, if TRUE: only IP from the `ip_restriction_list` can access the account
`fa2_auth_enabled`: true, 
`actions`: DEPRECATED ARRAY of system commands to the client app
`first_name`: DEPRECATED 
`last_name`: DEPRECATED
LAST CHANGES:
`masterkey`: BOOL, 'true' means masterkey is enabled
`wotp`: BOOL, 'true' means separate OTP for withdrawal is enabled
`termination_state`: if > 0 means the termination procedure has began
`termination_time`: shows when the termination procedure will actually start
`loan_level` - borrowed funds to own trusted funds in percent
`margin_level` - loan coverage funds to own trusted funds in percent (loan coverage is an amount of the assets to be sold to buy back missing part of the borrowed funds)
`margin_call` if TRUE, account is in the process of the liquidation of the loans by changing own funds to the loan assets.
`withdrawal_delay` Withdrawal orders and changes of the EWA will be executed with the given delay in seconds.
`new_withdrawal_delay` New (future) value of the `withdrawal_delay`
`new_withdrawal_delay_from` UTC timestamp when the `new_withdrawal_delay` will be set as a `withdrawal_delay`.
`vip` INT, account's VIP level from min=0 max=100, some functionality are available for the accounts with required VIP level or more.

---
### 212. Getting the lists of incoming transactions
```
POST https://api.50x.cloud/json.incoming_transactions/
```
shows list of incoming transactions (deposits) 
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pn|String|optional|Page number starting from 1 (one page = 30 items)|
|sym|String|optional|currency symbol (for example, ETH,BTC,LTC...)|
|state|String|optional|"wait" or "ok" (to be deposited or already deposited)|
**Sample reply:**
```
{
    "ok": true, 
    "orders": [
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99", 
         "rec_time": 1522572619.0, 
         "txh": "0x9a8bdc9677dd33580738e0d0b2cfce260d68dae93a12d401c05889cd731e2468", "
         symbol": "ETH", 
         "amount": 0.1, 
         "state": "ok", 
         "confirmations": 98}, 
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99",
         "rec_time": 1522146010.0, 
         "txh": "0x3fbf75c3e54ab072486c9c708a545fe6123dc76aa0418826e09dac0ce060f6b2", 
         "symbol": "ETH", 
         "amount": 0.002,
         "state": "ok",
         "confirmations": 5697}, 
        {"addr": "0x4687d453980f7da22ce8d2960c55045480edcf99", 
         "rec_time": 1522146010.0, 
         "txh": "0x300fb44b9782d1d977472148d306297de8f887662a2677364dabde84044e6230", 
         "symbol": "ETH",
         "amount": 0.0003, 
         "state": "ok", 
         "confirmations": 5765}
    ]
}
```
`"state"` can be “wait” (to be deposited) or “ok” (deposited)

---
### 213. Getting the list of withdrawal orders  
```
POST https://api.50x.cloud/json.withdraw_orders/
```
List of withdrawal orders
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pn|String|optional|page number starting form 1 (one page = 30 items)|
|sym|String|optional|Currency symbol (for example, ETH,BTC,LTC...)|
|state|String|optional|"new", "confirmed", "done" (new, confirmed, completed)|
**Sample reply:**
```
{
    "ok": true, 
    "orders": [
        {"symbol": "DOGE", 
         "state": "done", 
         "time_payout": 1522220735.0, 
         "time_confirm": 1522220553.0, 
         "to_tag": null, 
         "time_create": 1522195200.0, 
         "out_txh": "4c024b9a56da913194850b3339f5c4ae03d7b0cfc3d8d7c86d70f2f97ee4f99b", 
         "to_addr": "DKJ4uJWKtP5oZtTbfuyzNTPfuVC444eSZr", 
         "amount": 98.0
         "memo": "Any string up to 255 characters long for your own referance"}, 
        {"symbol": "DASH", 
         "state": "done", 
         "time_payout": 1522218636.0,
         "time_confirm": 1522218603.0,
         "to_tag": null, 
         "time_create": 1522195200.0, 
         "out_txh": "acb3582a3238ee3722e83a900988de6f994dfa982fd628eb6bdb1b64f147f718",
         "to_addr": "XnJ44u6EAyc3ePTZcxkcW1dFrVFvfc4ggh",
         "amount": 0.00797,
         "memo": "Any string up to 255 characters long for your own referance"}
    ]
}
```
`time_payout_after` if withdrawal delay was set by the user, shows the timestamp of the end of the delay. 
`"state"` value during normal execution cycle can be one of the following:
`new`: unconfirmed withdrawal request
`confirmed`: confirmed, to be executed
`suspended`: waiting to be processed
`wait`: waiting to be transmitted
`done`: transmitted to the blockchain network
For the unsuccessful transaction (means that reserved tokens were returned to the user's available balance) `"state"` can be one of the following:
`error_invalid_address`: provided destination adderess is invalid
`error_wd_disabled`: withdrawals are disabled for this account
`error_wd_to_contract_forbidden`: provided destination address belongs to the smart-contract. Withdrawals to the smart-contracts are forbiden.
`error_user_blocked`:  account is currently blocked by the admin
`error`: any other error


---
### 214. (208) Deposit
```
POST https://api.50x.cloud/json.deposit/
```
Returns address details for depositing given `sym`.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|internal trading symbol of an asset to be deposited|

**Sample reply upon success:**
```
{"ok": true, "msg_id": 31002, "sym": "TUSD", "wallet": "0x9944hh4433gg22776622", "html": "\n  To deposit TUSD, please send to this <strong>ETH address</strong>:<br><br><strong class=\"deposit-addr\">0x9944hh4433gg22776622</strong>\n  ", "values": ["TUSD", "ETH", "0x9944hh4433gg22776622",  "TrueUSD Stable Coin", null]}
```
`ok` - TRUE on success
`sym` - internal trading symbol of an asset to be deposited
`wallet` - Address with tag in QR-code compatible format 
`msg_id` - Message code to be used with the translations file
`html` - A default html-formatted message to be displayed in case of the translation failure
`values` - An array with all variables for the translation 
`values[0]` - Same as 'sym', internal trading symbol of an asset to be deposited
`values[1]` - Parent blockchain or payment system name
`values[2]` - Address (without tag)
`values[3]` - Tag (optional, only for the assets that require TAG, like XRP)
`values[4]` - Asset name

**Expected ERROR codes**:
`21400`: External (blockchain) deposits are unavailable for your account type.
---
### 215. (209) Withdraw
```
POST https://api.50x.cloud/json.place_withdraw/
```
Creates a withdrawal order. 2FA must be activated to use this function.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|Internal trading symbol of an asset to be transferred|
|amount|String|`required`|Amount to be transferred|
|to_addr|String|`required`|Destination address|
|to_tag|String|optional|Tag for the assets that require tag as a part of address details (like XRP)|
|key|String|`required`|6-digit 2FA Code from Google Authenticator|
**Sample reply upon success:**
```
{"ok": true}
```
**Expected ERROR codes**:
`21500`: External (blockchain) withdrawals are unavailable for your account type.

---
### 216. Withdrawal order cancelation
```
POST https://api.50x.cloud/json.cancel_withdrawal/
```
Cancels a withdrawal order that is scheduled for the delayed execution.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|wd_oid|integer|`required`|ID of the order to be canceled|
|otp|String|`required`|6-digit 2FA OTP|
**Sample reply upon success:**
```
{"ok": true}
```
---
### 217. Getting saved withdrawal addresses
```
POST https://api.50x.cloud/json.wd_addresses/
```

**No Parameters:**

**Sample reply upon success:**
```
{"ok": true, "addresses": [["0xc781087b13af3491ab5e80bc5af7b4c1d5b53e5c", "ETH", "Second account"]]}
```

---
### 218. Saving withdrawal address
```
POST https://api.50x.cloud/json.update_wd_address/
```
Saves a new withdrawal address.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|addr|string|`required`|Address to be stored|
|otp|integer|`required`|6-digit 2FA OTP/WOTP|
|blockchain|String|`required`|Internal code of the Blockchain|
|memo|Char[256]|`optional`|A note|

**Sample reply upon success:**
```
{"blockchain": "ETH", "memo": "Second account", "ok": true, "addr": "0xc781087b13af3491ab5e80bc5af7b4c1d5b53e5c"}
```


---
### 219. Getting Emergency Withdrawal Аddress (EWA)
```
POST https://api.50x.cloud/json.get_emergency_address/
```
Returns default emergency withdrawal address for the asset.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|Asset ticker symbol|
**Sample reply upon success:**
```
{"ok": true, "sym": "BTC", "address": "0x5gfdjshb36fjshgjfjsdhbjhfbsjdh",}
```
**Expected Error:**
`21901`: Emergency Withdrawal Аddress for {sym} has not been set yet.

---
### 220. Blotter - cashflow
```
POST https://api.50x.cloud/json.blotter/
```
Obtain all operations with the selected currency on the account 
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|Currency symbol|
**Sample reply:**
```
{"ok": true, 
 "blotter": [{"addr": "",
              "amount": 1.0,
              "at": 1536857914.0,
              "data_id": 151907,
              "o_bs": "b",
              "o_pair": "ETH/BTC",
              "o_rate": 0.03247101,
              "o_t": "m",
              "o_vol": 1.0,
              "sym": "ETH",
              "t": "tc",
              "tag": "",
              "txh": ""}],
}
```
**Reply common values:**
"at":  Timestamp of the transaction
"t":  transaction source: indicates which module initiated the transaction, possible states:
`tc: Trading Core`, `com: Commission`, `wd: Withdrawal`, `in: Incomming transaction (deposit)`, `fix: Error correction`
"data_id": transaction ID, or order ID for trades (if "t"="tc")
"amount": Balance change for selected asset 
"sym": Asset Symbol
**Reply deposit/withdrawal values:**
  "txh":  TxHash for withdrawals
  "tag":  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM
  "addr":  External blockchain address for deposits and withdrawals
**Reply trade/commission/fix values:**
  "o_bs":  buy/sell for trades: `b: buy`, `s: sell`
  "o_t":  Order Type for trades: `l: limit`, `m: market`
  "o_pair":  Order Type for trades
  "o_vol":  Order Volume for trades
  "o_rate":  Order Rate for trades

---
### 221. Userinfo update
```
POST https://api.50x.cloud/json.update_userinfo/
```
User may apdate some values that are returned in `API.211` method.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit OTP Code from Google Authenticator|
|nickname|String|optional|Nickname of an account|
|agreements|String|optional|Аgreement name (signed by the user) must be transfered as a value|
|lang|String|optional|ISO 639-1 Language Code should be transferred|
|last_message|INT|optional|ID of the last message seen by the user, should be sent upon closing the message window|
**Note:**
`nickname` and/or `agreements` parameters requires `otp` to be sent.
Other parameters, like `last_message` can be sent without `otp`.
**Sample reply:**
```
{"ok": true}
```

### 222. `User's actions log` 
Returns a list of user's autorised orders incliding log in and change account settings events.
```
https://api.50x.cloud/json.actionslog/
```
**No parameters**
**Sample reply:**
```
{"ok": true, "actions": [{"ip": "50.100.200.11", "oid": 322559, "sym2": "ETH", "sym1": "A2A", "bs": "s", "pair": "A2A/ETH", "action_time": 1552413972, "descr": "LIMIT SELL 360.00000000 A2A/ETH at 0.00024492", "n_rate": 0, "rate": 0.00024492, "n_amount": 0, "amount": 360.0, "type": "cancel order"}, {"ip": "50.100.200.11", "oid": 123456, "sym2": "ETH", "sym1": "A2A", "bs": "s", "pair": "A2A/ETH", "action_time": 1552413951, "descr": "LIMIT SELL 360.00000000 A2A/ETH at 0.00023964 -> SELL 360.00000000 A2A/ETH at 0.00024492", "n_rate": 0.00024492, "rate": 0.00023964, "n_amount": 360.0, "amount": 360.0, "type": "change order"}, {"ip": "50.100.200.11", "oid": 12345, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552216980, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "confirm withdraw"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552216843, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "wd_2fa_fail"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552215428, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "cancel many order"}, {"ip": "50.100.200.11", "oid": null, "sym2": "", "sym1": "", "bs": "", "pair": "", "action_time": 1552144311, "descr": null, "n_rate": 0, "rate": "", "n_amount": 0, "amount": "", "type": "login"}}]}
```
**Reply common values:**
"at":  Timestamp of the transaction
"t":  transaction source: indicates which module initiated the transaction, possible states:
`tc: Trading Core`, `com: Commission`, `wd: Withdrawal`, `in: Incomming transaction (deposit)`, `fix: Error correction`
"data_id": transaction ID, or order ID for trades (if "t"="tc")
"amount": Balance change for selected asset 
"sym": Asset Symbol
**Reply deposit/withdrawal values:**
  "txh":  TxHash for withdrawals
  "tag":  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM
  "addr":  External blockchain address for deposits and withdrawals
**Reply trade/commission/fix values:**
  "o_bs":  buy/sell for trades: `b: buy`, `s: sell`
  "o_t":  Order Type for trades: `l: limit`, `m: market`
  "o_pair":  Order Type for trades
  "o_vol":  Order Volume for trades
  "o_rate":  Order Rate for trades
"type" TODO


### 223. `User's trades log`
Returns `trades` array of the trades executed under user's trade orders.
```
https://api.50x.cloud/json.tradelog/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|optional|Trading pair filter in `AAA/BBB` format|
|sym|String|optional|Token filter in `AAA` format|
|sym1|String|optional|Asset filter in `AAA` format|
|sym2|String|optional|Currency filter in `AAA` format|
|ot|String|optional|Order type, can be one of this: "l" (limit), "m" (market), "c" (conditional)|
|bs|String|optional|Order direction (buy or sell), can be "b" or "s"|
DEPRECATED: `ot` NEW: `o_t`
DEPRECATED: `bs` NEW: `o_bs`
**Sample reply:**
```
{"trades": [{"ev_sym1": 0.0, "ev_sym2": 0.0, "oid": 322559, "sym2": "ETH", "sym1": "A2A", "at": 1552413972, "bs": "s", "pair": "A2A/ETH", "o_vol": 360.0, "o_filled": 0.0, "t": "c", "o_rate": 0.00024492, "ot": "l"}, {"ev_sym1": 443.36067391, "ev_sym2": -0.10147639, "oid": 319694, "sym2": "ETH", "sym1": "A2A", "at": 1551731105, "bs": "b", "pair": "A2A/ETH", "o_vol": 443.36067391, "o_filled": 443.36067391, "t": "t", "o_rate": 0.00022888, "ot": "l"}], "ok": true}
```

**Reply common values:**
"at":  Event's timestamp
"t":  transaction source: indicates which module initiated the transaction, possible states:
`tc: Trading Core`, `com: Commission`, `wd: Withdrawal`, `in: Incomming transaction (deposit)`, `fix: Error correction`
"data_id": transaction ID, or order ID for trades (if "t"="tc")
"amount": Balance change for selected asset 
"sym": Asset Symbol
**Reply deposit/withdrawal values:**
  "txh":  TxHash for withdrawals
  "tag":  Transaction tag for withdrawals for thecoins requiring tags like  XRP, IOTA, XLM
  "addr":  External blockchain address for deposits and withdrawals
**Reply trade/commission/fix values:**
"o_bs": Trade Order's direction: `b: buy`, `s: sell`
"o_t":  Trade Order's Type: `l: limit`, `m: market`
"o_pair":  Trade Order's trading pair in "sym1/sym2" format
"o_vol":  Trade Order's Volume
"o_rate":  Trade Order's Rate
**Current method's values**
Не по стандарту "oid": Order unique ID
Дубль "ot": Trade Order's Type: `l: limit`, `m: market`
"o_filled": Trade Order's current filled volume
"ev_sym1": Asset (sym1) amount change (executed value)
"ev_sym2": Currency (sym2) amount change (executed value)
"sym1": Asset ticker
"sym2": Currency ticker
"bs": Trade direction, `b: buy`, `s: sell`
"pair": Trading pair in "sym1/sym2" format
Пересечение имени "t": Event's Type, `t: trade`, `p: placed`, `c: closed`
TODO REQUESTED CHANGES:
DEPRECATED: `ot` NEW: `o_type`
DEPRECATED: `bs` NEW: `o_bs`
DEPRECATED: `oid` NEW: `o_id`
DEPRECATED: `t`(transaction source) NEW: `ts` or `source`
DEPRECATED: `t`(Event's Type) NEW: `et` or `event`
TODO кроме того, во всех случаях где мы отдаем информацию об ордере, исключить отдачу вариантов "bs" и "pair" а отдавать варианты "o_bs" и "o_pair", т.к. не может не совпадать направление сделки и ордера,  а понятия направления на уровне сделки нет, есть +/- изменения баланса.

---
### 225. List of existing alerts
```
POST https://api.50x.cloud/json.alertslist/
```
**Parameters for mass-cancelation:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|optional|Trading pair optional filter in `AAA/BBB` format|
|coin|String|optional|Asset (sym1) optional filter|
**Returned values:**
`alert_time`: alert event time for executed alerts
`alertid`, `pair`, `bidmore`, `askless`, `expire_time`, `memo`
**Sample reply:**
```
{"ok": true, TODO}
```

---
### 226. Placing an alert
```
POST https://api.50x.cloud/json.place_alert/
```
Placing a price alert
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|`required`|Trading pair in `AAA/BBB` format|
|bidmore|Float|`optional`|Alert rate for bid|
|askless|Float|`optional`|Alert rate for ask|
|expire_time|INT|optional|Alert's auto-cancelation time, unix timestamp (when it is automatically cancelled, optional, if not inlucded, shall remain unchanged)|
|memo|String|optional|Any string up to 255 characters long for your own referance|

**Note:**
`bidmore` or `askless` should be sent, otherwise ERROR 22501 or 225502 will be returned:
`22501`: Alert rate has not been specified.
`22502`: Paramaters "bidmore" and "askless" should not be transmitted at the same time.
A user is limited to the maximum number of the alerts based on it's rank, starting from 10 alerts.
**Sample reply:**
```
{"ok": true,
 "alert": {
  "aid": "36752354",
  "pair": "ETH/BTC",
  "bidmore": 1.001,
  "memo": "I am probably dreaming. Vitalik is the new Satoshi now!"
}
```

---
### 227. Changing/deleting the alerts
```
POST https://api.50x.cloud/json.change_order/
```
Changes or deletes an alert or all alerts.

**Parameters for mass-cancelation:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|delete_all|boolean|`required`|`1`:Delete all alerts|
|pair|String|optional|Trading pair optional filter|
|coin|String|optional|Asset (sym1) optional filter|
**Parameters for single alert management:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|alertid|String|`required`|alert's id|
|delete|boolean|optional|`1`:Delete alert|
|bidmore|Float|optional|Alert rate for bid|
|askless|Float|optional|Alert rate for ask|
|expire_time|INT|optional|Alert's auto-cancelation time, unix timestamp (when it is automatically cancelled, optional, if not inlucded, shall remain unchanged)|
|memo|String|optional|Any string up to 255 characters long for your own referance|
**Sample reply:**
```
{"ok": true, TODO}
```

---
### 230. Getting the lists of Open or Closed orders 
```
POST https://api.50x.cloud/json.orderslist/
```
Returns the list of open orders.
If history=1 parameter is included, returns the list of closed orders.

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|history|String|optional|if included, shows history, and not open orders|
|pn|Float|optional|page number starting from 1 (one page = 50 orders)|
|pair|String|optional|selection based on the indicated pair (for example, ETH/BTC, ETH/DASH, LTC/ETH)|
|sym1|String|optional|selection based on the pair's first symbol (for example, for ETH/BTC, the first symbol is ETH)|
|sym2|String|optional|selection based on the pair's second symbol (for example, for ETH/BTC, the second symbol is BTC)|
|ot|String|optional|selection based on the order's type (l,m,c - see place_order description)|
|bs|String|optional|selection based on BUY or SELL, b and s values respectively|
|state|Float|optional|selection based on the trading order's state|
**Returned values:**
NEW `po_id`: An ID of the Parent Order in case this is a stoploss/takeprofit or another child order
NEW DEPRECTED `is_inverted`: IF `true` or `1`, this order should be displayed and handled with inverted trading pair, direction and values on a front-end level. Please see INVERTED ORDERS section for the explanation.
**Sample reply:**
```
{"ok": true, "orders": [
    {"time_last_fill": 0, 
     "time_cancel": 0, 
     "filled_vol": 0.0, 
     "rate": 0.07598567,
     "commission": 0.2,
     "vol": 1.0,
     "time_create": 1525244149.0, 
     "oid": 101011, 
     "sym1": "ETH", 
     "time_complete": 0, 
     "condition_details": null, 
     "sym2": "BTC", 
     "state": 0, 
     "condition_type": null, 
     "bs": "b", 
     "pair": "ETH/BTC", 
     "memo": "Any string up to 255 characters long for your own referance",
     "type": "l"},
     ...
]}
```

---
### 231. Placing an order
```
POST https://api.50x.cloud/json.place_order/
```
Placing a trading order
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pair|String|`required`|Trading pair (for example, ETH/BTC, ETH/DASH, LTC/ETH)|
|v|Float|`required`|Volume|
|ot|String|`required`|Order type (l - limit, m - market)|
|r|Float|`required`|Order execution rate|
|bs|String|`required`|'b' for BUY, 's' for SELL|
|lifetime|Float|optional|Number of seconds of order's lifetime from placement (optional)|
|expire_time|Float|optional|time when order is automatically cancelled (optional, lifetime has the priority)|
|memo|String|optional|Any string up to 255 characters long for your own referance|
|tp_r|Float|optional|Takeprofit order rate|
|sl_trigger|Float|optional|Stoploss activation trigger rate|
|sl_r|Float|optional|Stoploss order rate|
|trailing_pr|Float|optional|Trailing Stop offset in percent, positive value|
|slippage_pr|Float|optional|Trailing Stop slippage in percent, positive value for worst price, negative for better price, default=0|
|copied_from_id|INT|optional|The ID of the parent "template" order|


**Note:**
`copied_from_id`: You may store a reference to the child order in the parent order in case you have order/position duplication functionality. The ID of your new order will be returned as `copied_to` value in the parent order array. The ID of the parent order should be transmitted in `copied_from_id` parameter. If `copied_to` value in the parent order is not empty, it will be replaced with the new value each time you send a new order with the same `copied_from_id` parameter.
Takeprofit can be set without Stoploss, require `tp_r`.
If Stoploss is set, a Takeprofit is `required`. 
Stoploss require `tp_r`+`trailing_pr`+`slippage_pr` OR `tp_r`+`sl_trigger`+`sl_r`.
Error will be returned if `trailing_pr` will be sent with `sl_trigger` or `sl_r`.
`slippage_pr` is the limit order price correction from the Trailing Stop activation price in percent. Positive value makes order's limit price higher than the activation price level in case of bid, and lower in case of ask. If not specified, an activation price will be used. Can be used only with Trailing Stop, otherwise error `22008` will be returned.
**Expected error codes:**
`22008`: Two or more parameters can't be used simultaneously: {Parameter}, {Parameter}.
**Sample reply:**
```
{"ok": true,
 "order": {"bs": "b",
           "expire_time": 0,
           "filled_vol": 0,
           "oid": 151871,
           "pair": "ETH/BTC",
           "rate": 0.001,
           "state": 0,
           "sym1": "ETH",
           "sym2": "BTC",
           "time_cancel": 0,
           "time_complete": 0,
           "time_create": 1536856649.0,
           "time_last_fill": 0,
           "type": "l",
           "vol": 1.0,
           "memo": "Any string up to 255 characters long for your own referance",}
}
```

---
### 232. `Order info`
```
POST https://api.50x.cloud/json.orderinfo/
```
TODO: Returnes an order's changelog.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|oid|INT|`required`|Unique order id|
DEPRECATED `oid` NEW `o_id`
**Sample reply:**
```
TODO 
```

---
### 233. Changing order
```
POST https://api.50x.cloud/json.change_order/
```
Changes an open order

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|oid|String|`required`|order's id|
|amount|Float|optional|order's new volume (optional, if not included or = 0, then volume shall remain unchanged)|
|rate|Float|optional|order's new rate (optional, if not included or = 0, then rate shall remain unchanged)|
|expire_time|Float|optional|order's expiration time, unix timestamp (when it is automatically cancelled, optional, if not inlucded, shall remain unchanged)|
|memo|String|optional|Any string up to 255 characters long for your own referance|
|tp_r|Float|optional|Takeprofit order rate|
|sl_trigger|Float|optional|Stoploss activation trigger rate|
|sl_r|Float|optional|Stoploss order rate|
|trailing_pr|Float|optional|Trailing Stop offset in percent, positive value|
|slippage_pr|Float|optional|Trailing Stop slippage in percent, default:0|
|remove_sltp|String|optional|Expected `sl` or `sltp`|
|from_history|BOOL[1]|optional|Must be `1` if changing an order with `state:3`|
|close_as_filled|BOOL[1]|optional|Makes order volume equal to filled_volume and closes the order as fully filled. Position will be created with SLTP was set in this order. Should come with `oid` only.|
**Note:**
"Position" is an order in `state:5`, meaning a partially or fully filled and closed order with an open SLTP child order. 
"Closed Position" is an order in `state:7`, meaning a closed partially or fully filled order with a closed partially or fully filled SLTP child order. Closed Position can not be changed.
Specified `trailing_pr` will delete `sl_trigger` and `sl_r` if they were set.
`remove_sltp:sl` removes Stoploss or Trailing Stop from an open order or position,
`remove_sltp:sltp` cancels SLTP settings in open order or closes position.
If `remove_sltp` comes with `tp_r` or `sl_trigger` or `sl_r` or `trailing_pr` error `22008` will be returned.
Before sending `remove_sltp` command for the position a user must receive a warning that child SLTP order will be canceled and parent order will be archived in HISTORY section without possibility of setting SLTP order for it again.
If order has `parent_order_id` parameter, no volume change is possible.
**Sample reply:**
```
{"ok": true}
```
**Expected errors:**
`23309`: Error occurred while trying to change the order {oid}.
`23310`: Can not create position from the unfilled or fulfilled order, should be partially filled.
TODO: отменить? `23311`: Cannot create position: SLTP was not set in the order {oid}.
TODO: amount -> volume  

---
### 234. Order cancellation
```
POST https://api.50x.cloud/json.cancel_order/
```
Cancels an open order
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|oid|String|`required`|order's id|
**Sample reply:**
```
{"oid": 151871, "ok": true}
```

---
### 235. Mass Order cancellation
```
POST https://api.50x.cloud/json.cancel_orders/
```
Cancels all orders that match search conditions.
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|optional|Asset Symbol|
|pair|String|optional|Trading pair|
|bs|String|optional|Trading direction (`b`:buy, `s`:sell) |
|buy_sym|Boolean|optional|If `true`, `sym` is required with no additional parameters. Cancels all orders for buying `sym` regardless nominal order direction|
|sell_sym|Boolean|optional|If `true`, `sym` is required with no additional parameters. Cancels all orders for selling `sym` regardless nominal order direction|
**Parameters usage:**
`sym`: if specified, all open orders with sym will be cancelled in both SYM/* and */SYM trading pairs. Should not be used with "pair'.
`pair`: if specified, all open orders with provided trading pair will be cancelled. Should not be used with "sym'.
`bs`: Trading direction (buy/sell) of the order. Use bs='s' to cancel only SELL orders, use bs='b' to cancel only BUY orders. May come with `pair` or `sym` as an additional filters.
`buy_sym`: If `1`, `sym` is required with no additional parameters. Cancels all orders for buying `sym` regardless nominal order direction
`sell_sym`: If `1`, `sym` is required with no additional parameters. Cancels all orders for selling `sym` regardless nominal order direction
**Note:**
Warning! This method cancels all orders fitting filter parameters including SLTP orders and closes all parent `positions`. Sending this request without parameters will result in cancelling all open orders and positions on the user's account.
**Sample reply:**
```
{"ok": true}
```



---
### 240. `Write user settings to the server`
Stores JSON-encoded _string_ to be returned with API.240 method.
You can store user settings and states on the server side to provide cross-device syncronisations.
Total stored sting length could not exceed 15 kb.
```
https://api.50x.cloud/json.writesettings/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|settings|String|`required`|JSON-encoded string of an array|
`settings` **must include** `terminal_id` element, containing multidimentional array of parameters at developer's discretion. "terminal_id" is a unique front-end id, must be approved by 50x.com admins before usage.
To delete contents of such element completely, parameter `clear` with string value `terminal_id` should be sent instead of `settings`.

`settings` may include "common" element containing multidimentional array of parameters at developer's discretion.
Untransmitted elements will remain unchanged on the server.
1st level sub-elements of "common" and "terminal_id" elements will be replaced on the server, or deleted in case `{sub-element:""}` will be sent.
**Server-side recognised parameters**
You can put some values into the `common` element to make them available from all applications. Recommended set is:
`basesym`:
`lastPair`:
"lastOrderType":
`priceCopyShift`:
TODO - limits
There are also some values that will be recognised by the server and affect account settings:
{'common':{'session_lifetime':60}}: INT, period of time in minutes after which session will become expired.
**Sample Query Parameters**
```
settings: {"mycloudfront1":{"lastpair":["A2A","HMT"]}}
```

---
### 241. `Read user settings from the server`
Returns _string_ stored with API.240 method.
```
https://api.50x.cloud/json.readsettings/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|type|String|`required`|unique front-end id, must be approved by 50x.com authorities|
**Sample reply:**
```
{"common": {"nonce": 0}, "mycloudfront1": {"attention_orderplace": "5", "estimate_currency": "ETH", "hidden_boxes": ["currencies-info", "settings", "actionslog"], "currencypair": ["A2A", "ETH"], "orderbook_summ_type": "sumSym1", "orderbookCopyShift": "0.00000001", "lasttradestype": "sym"}}
```
**NOTE:** All contents of `mycloudfront1` element including it's name are defined by the front-end developer. Please see API.240 for the refference.

---
### 250. `The list of API keys`
Returns an array with existing API keys for current user's account.
```
https://api.50x.cloud/json.api_key_list/
```
**No Parameters**
**Sample Reply:**
```
[
    { TODO
      'key': ak.key
      'trade_enabled': true
      'withdraw_enabled': false
      'ip_restriction_enabled': ak.ip_restriction_enabled
      'ip_restriction_list': ak.ip_restriction_list
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

---
###  251. `Creating new API key` 
```
https://api.50x.cloud/json.add_api_key
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit OTP/WOTP Code from Google Authenticator|
**Returned Values:**
`msg_id`: message code
`html`: html message
`values`: API publick and private (secret) keys in format: "['public', 'secret']"

---
###  252. `Deleting API key` 
```
https://api.50x.cloud/json.delete_api_key
```

**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit OTP/WOTP Code from Google Authenticator|
|apikey|String|`required`|API key to be deleted|
**Sample reply:**
```
{"ok": true}
```

---
###  253. Change API key permitions
```
https://api.50x.cloud/json.save_api_key
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|otp|String|`required`|6-digit OTP/WOTP Code from Google Authenticator|
|apikey|String|`required`|API key to be deleted|
|trade_enabled|boolean|optional|default: 0|
|withdraw_enabled|boolean|optional|default: 0|
|ip_restriction_enabled|boolean|optional|default: 0|
|ip_restriction_list|array|optional|default: empty|

**Sample reply:**
```
{"ok": true}
```
---
###  * 260. Placing a new landing order
```
https://api.50x.cloud/json.place_lending
```

**Expected Errors:**
`10003`, `23100`, `26001`, `26002`, `26003`, `26004`, `26053`, `26054`, `35001`, `35025`, `37034`, `37035`
---
###  * 261. User's lending orders list
```
https://api.50x.cloud/lending_orders
```

**Expected No Errors**
---
###  * 262. Cancelling the lending order
```
https://api.50x.cloud/json.cancel_lending
```
**Expected Errors:**
`10003`, `26201`, `35001`, `35015`, `37003`

---
###  * 263. Getting a new loan
```
https://api.50x.cloud/json.get_loan
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|sym|String|`required`|Asset Symbol|
|vol|float|`required`|Asset quantity to be borrowed|
|limit_fee|float(1 decimal)|`required`|Maximum loan daily fee in percent|
|otp|int|`required`|6-digit 2FA Code from Google Authenticator|

**Sample reply:**
```
{"ok": true}
```
**Expected Errors:**
`10003`, `23100`, `26050`, `26053`, `26054`, `26305`, `35001`, `37003`
DELETE `28100`: There are not enough own funds on your account to get a new loan.[own_funds_percent,new_loan_level]
DELETE `28101`: Post-loan marginal coverage is not enough to maintain the loan.[post_own_funds_percent,margincall_level]

---
###  * 264. Paying back the loan
```
https://api.50x.cloud/pay_back_loan
```

**Expected Errors:**
`10003`, `26400`, `37003`

---
###  * 265. Changing the loan
```
https://api.50x.cloud/json.change_loan
```

**Expected Errors:**
`10003`, `35001`, `35015`, `37003`

---
###  * 266. User's loan orders list
```
https://api.50x.cloud/json.loans
```

**Expected No Errors:**

---
###  * 267. Loans orderbook
```
https://api.50x.cloud/json.loan_ob
```

**Expected No Errors:**

---
### 290. Logout
Terminates current session
```
POST https://api.50x.cloud/json.logout/
```
**No Parameters**

---
### 291. Logout from all devices
Terminates all existing sessions.
```
POST https://api.50x.cloud/json.logout/
```
**No Parameters**

---
### 299. Terminate the account
Terminates the account, converts all balances to Ether with market orders and withdraws final Ether (ETH) balance to previously set emergency withdrawal wallet.
```
POST https://api.50x.cloud/json.terminate_account/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|masterkey|String|`required`|Master Key received from API.207 method. After 180 days of the account's inactivity (from last successful login) `login` of the account to be deleted can be sent in this parameter instead of Master Key.|

**Sample reply:**
```
{"ok": true}
```
**Expected Errors:**
`29901`: Wrong Master Key or login. No account found.
`29902`: Account {login} is already in the process of the termination.
`29903`: Account {login} is suspended and cannot be terminated right now. Please contact the support via email {domain.email} to solve this issue first.
`29904`: Internal Error: account termination service is currently unavailable.
`29905`: Master Key is currently required to terminate this account. If you have lost your Master Key, please wait 180 days from the last successful login to the system and try again without it.
`29908`: No Emergency Withdrawal Addresses were set for your account. Unable to terminate the account.
`29909`: Unexpected error during account termination. Your account will be terminated by the administrator manually. 

