![Professional Master Accounts](https://m.50x.com/media/terminal-logo.svg)
# PMA API
_Revision: 30. Last update 07.12.2021_

Naming Guidelines:
`json.pma*`: public methods
`json.*_pma`: private methods called from the user's account
`json.pma_*`: private methods called from the PMA
`*PCT`: in parameter/variable name means that the value is in percent
If value should fit min-max range, exact values will be shown in TYPE or Description as `[min-max]`
If value has valid choices, exact values will be shown in TYPE or Description as `[v1,v2...,min-max]`


### Logical or coded values explanation
**PMA `status` - numeric code means**:
0: in the process of opening,
1: empty (waiting for manager's deposit),
2: active,
7: waiting to be closed (closing request can be canceled by the manager),
8: waiting to be closed (no actions possible),
9: closed;

**PMA `suspended` property - numeric code means**:
0: active,
1: suspended for withdrawal,
2: suspended for clearing,
3: suspended by the exchange,

**PMA `listed` boolean property**:
1: PMA has been included in public PMA list and profit will be distributed automatically. Metrics are shown.

**PMA `overload` boolean property**:
1: the share of the manager's own funds on the PMA became lower than `managersshare`, new deposits are disabled

**Deposit `state` - numeric code means**:
0: in the process of opening
1: open
2: new manager's deposit created by the system during the clearing and suspended for clearing.
3: DEPRECATED manager's reward on hold - indicates a deposit created by the system during the clearing, to be closed during the next clearing session if all equity is located in `basesym` tokens.
5: suspended for clearing
6: suspended by the exchange
8: waiting to be closed (no actions possible)
9: closed

**`guestlevel` anf `userlevel` code means**:
0: only metrics will be shown
1: trades with 7 days delay will be shown
2: balances with 7 days delay will be shown
3: trades & balances with 7 days delay will be shown
4: trades with 3 days delay will be shown
5: balances with 3 days delay will be shown
6: trades & balances with 3 days delay will be shown
7: trades with 24H delay will be shown
8: balances with 24H delay will be shown
9: trades & balances with 24H delay will be shown

PMA Accounting is transaction-based.
`deposit` in PMA context means a deposit transaction until it is `closed` by the user by withdrawing it back to his account with possible profit excluding manager's fee. A corresponding share of each token's balance on the PMA will be sent to his account.
=new2020 **User** can withdraw tokens only by closing separate `deposits` in full or by closing ALL existing `deposits` of the PMA.  After closing request has been sent, this action cannot be canceled.
**Manager** cannot withdraw funds out of PMA until PMA is closed.
=new2020 **Manager** and the system cannot initiate profit distribution if current `performancePCT` is less than `highWaterMarkPCT` value.
=new2020 **Capitalization** if set to true in the depositing request, profit distributions will be left on the PMA as a new separate deposits without deduction of the depositing fee.
=new2020 **Volume** of all open orders on the PMA will be automatically reduced in case deposit withdrawal to keep same `nlv`/`volume` ratio after the withdrawal.


`API.211.payable_a2a` means: value `payable_a2a` from the API method `211`. 

---
## Involved Error Codes (common list)
`9xxxx`: PMA module
`22xxx`: Cloud API common i/o errors
`10xxx`: User's account related errors
`10001` also deprecated `37074` also deprecated `37022`: - Your email has not been confirmed yet. [changed13]
`10002` also deprecated `35058`: - Your account should have 2FA activated.
`10003`: You should sign USER AGREEMENT first.
`10010` also deprecated "37015": Wrong 2FA OTP
`10011` also deprecated "37021": Invalid 2FA OTP format
`10013` also deprecated "37061":This 2fa OTP has been already used, please wait for the new code to ge generated and try again.
`10015` also deprecated "37057": Need 2FA OTP or 2FA private key.
`10017` also deprecated "37040": Wrong 2FA OTP was entered 3 times in a row for this account. You need to enter 3 different OTP generated one by one to log in.
`10018` also deprecated "37041": One or more OTP from 3 is wrong. Please try again.
`10019` also deprecated "37062": Internal System Error: Your current 2FA Private Key has not been activated yet.
`22000` also deprecated "35001": "Mandatory parameter '{parametername}' is missing"
`22001`: Unknown Parameter {Parameter}. (Do not rely on this error/msgid, unknown parameters will be just ignored if a valid set was found)
`22004`: Value {Parameter} has invalid TYPE. Expected {type}.
`22005`: Value {Parameter} is out of range. {parameter} value {value} should be >= {min} and <={max}.[parameter,value,min,max]
`22006`: Value {Parameter} is incorrect. {Parameter} value {value} should be >= {min}.
`22007`: Value {Parameter} is incorrect. {Parameter} value {value} should be <= {max}.
`22008`: Two or more parameters cannot be used simultaneously: {Parameter}, {Parameter}.
`22009`: Value {Parameter} is incorrect.
`20701`: Master Key was already set for this account and cannot be changed.

`29901`: Wrong Master Key or login. No account found.
`29902`: Account {login} is already in the process of termination.
`29903`: Account {login} is suspended and cannot be terminated right now. Please contact the support via email {domain.email} to solve this issue first.
`29904`: Internal Error: account termination service is currently unavailable.
`29905`: Master Key is currently required to terminate this account. If you have lost your Master Key, please wait 180 days from the last successful login to the system and try again without it.
`29909`: Unexpected error during account termination. Your account will be terminated by the administrator manually. 

`33001`: "Login required"
`33002`: "Need POST request"
`35058`: "Your account should have 2FA activated to perform this action."
`37013`: "Incorrect code! You should enter a 6-digit code from Google Authenticator App. Please note that this code is time based and you should synchronize your device's clock with the Internet time servers."
`37014`: "Error while checking 2FA"
`37021`: "Please try again - 2FA code is invalid"
`37033`: "Sorry, your account is blocked, please email to support@50x.com"
`37034`: "Too frequent queries, please try again later!"
`37074`: "Your email is not confirmed yet."
`39017`: "Please try again in 30 minutes"
`39027`: Your balance of {sym} is blocked, please email to support {domain.email}.[sym]

`90000`: Wrong PMA ID. No PMA was found with ID {pmaid}.[pmaid]
`90001`: Requested data is not available for PMA {pmaid} yet. PMA should have longer trading history before metrics can be calculated.[pmaid]
`90002`: Requested data is not available for PMA {pmaid} yet. PMA should have longer trading history and status to be listed.[pmaid]
`90003`: Rates server is not available now. Please try again later.
`90004`: Access denied. Incorrect account.
`90005`: Error getting information about Root account.
`90006`: API method {method} is currently unavailable. [method]
`90007`: You should sign PMA AGREEMENT first.
`90008`: PMA {pmaid} is suspended. Try again in few seconds. [pmaid, suspended]
`90009`: This PMA {pmaid} is blocked. [pmaid]
`90010`: Trading with {sym} is not allowed for this PMA {pmaid} because of the PMA setting. [sym, pmaid]
`90011`: Cross-trading is not allowed for this PMA {pmaid} because of the PMA setting. [pmaid]
`90012`: Your order does not fit the {0} PMA limit. PMA limit: {1}%, already used: {2}%, your order will add {3}%, estimated after execution: {4}%.
`90013`: This PMA is not activated yet.
`90014`: PMA ({pmaid}) is not currently listed.[pmaid]
`90020`: PMA status is not suitable for the requested action.
`90030`: This method should be called from PMA account.
`90031`: Market orders are restricted on the PMA.
`90099`: This PMA is closed.
`90301`=renamed=>`90013`: PMA ({pmaid}) is not active now.[pmaid]
`90401`=renamed=>`90014`: PMA ({pmaid}) is not currently listed.[pmaid]

DEPRECATED `91102`: Not enough A2A or {basesym} to pay the PMA fee, it will be taken from your Base Token account in the equivalent of 10000 A2A.[basesym]
`91110`: Not enough A2A to pay the PMA fee, please buy A2A tokens first. PMA opening fee is {fee=5000} A2A. Your current balance is {availableA2A} A2A.[fee, availableA2A]
DEPRECATED !`91201`: You do not have enough available {basesym} or A2A tokens to pay PMA opening fee.[basesym]
`91202`: Requested PMA public name already exists, must be unique.
`91203`: PMA opening error, please email support {domain.email}.
`91204`: To create new PMA please return to the Root account.
`91210`: Cross-trading must be denied to restrict StopLoss usage.
`91211`: Guest level of disclosure was set higher than subscriber's. It is not logical. Please check the settings and try again.

`91301`=renamed=>`90004`: Access denied. 
`91302`=renamed=>`90013`: This PMA is not activated yet.
`91303`=renamed=>`90009`: This PMA is blocked.
`91304`: Relogin error, please email to support {domain.email}.
`91399`=renamed=>`90099`: This PMA is closed
`91600`: You do not have available {basesym} balance to deposit {volume} {basesym}. [volume,basesym]
`91601`: You have already opened a deposit with the same PMA less than 5 minutes ago. Make sure that you do want to open more and try again after 5 minutes.
`91602`: You are in the PMA different to 'pma' parameter.
`91603`: Depositing to this PMA is unavailable right now. Please try again later.
`91605`: PMA depositing error, please email to support {domain.email}.
`91609`=renamed=>`90099`: This PMA was closed.
`91700`: Invalid Deposit ID: {dep_id}. No deposit found with this id.[dep_id]
`91701`: Deposit ID: {dep_id} has been already closed.[dep_id]
`91702`: This deposit contains manager's undistributed reward and will be closed automatically during the next clearing if only {basesym} will be on the PMA {pmaid}.[basesym, pmaid]
`91703`: The manager's deposits can be closed only by the PMA termination.
`91704`: Lock-up period for this deposit {dep_id} is not over yet. Please try again after {timeleft} seconds.[dep_id,timeleft]
`91705`: This deposit {dep_id} can not be closed.[dep_id]
`91706`: Deposit withdrawals are temporarily unavailable in the PMA {pmaid} [dep_id, pmaid]
`92502`: PMA status is not suitable for closing account.
`92602`: PMA closing request not found.
`92700`=renamed=>`90030`: This method should be called from PMA account.
`92702`: NLV is less than the last profit distribution level. Nothing to distribute.
`92703`: Last profit distribution was done less than a week ago ({days} days). Please try again later.[days= format(last_pd)] . 
`92704`: PMA status is not suitable for clearing.

_Method specific errors are described in method description._

---
## Public PMA methods

---
### 900. PMA list
Returns an array of the listed PMAs (PMA with `status` > 1 && `status` < 5 && `listed`==1) optionally divided into pages. Maximum number of items in the reply is 100.
```
POST https://api.50x.cloud/json.pmalist/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|minrank|INT [0-100]|optional|If specified, only PMA with >= `rank` will be included; default:0|
|mintrust|INT [0-100]|optional|If specified, only PMA with >= `trust` will be included; default:0|
|onpage|INT [10-100]|optional|number of items on a page (default:20; min:10; max:100)|
|page|INT|optional|page number starting from 0|
|chart|INT|optional|if chart=1, "chart" array will be included for every PMA|
```
{"ok": true} TODO
```
**Returned values**:
`pmaid`, `name`, `status`, 
`overload`, `basesym`, `userpic`, `description`, `performancePCT`, `nlv`,
`ddPCT`, `max_ddPCT`, `created`, `age`, `trust`,`rank`, `chart` 
TODO In case of Dual Currency PMA `sym2`, `nlv2`, `performancePCT2`
**Sample reply:**
```
{"ok": true} TODO
```

---
### 901. PMA info
не менялось, если не соответствует коду фронта сообщать!
Returns all PMA settings (defined by manager) for the specified PMA
```
POST https://api.50x.cloud/json.pmainfo/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
**Sample reply:**
```
{"ok": true} TODO
```
**Returned values:**
|Name|Type|Description|Translation key|
|---|---|:----------:|--------|
|name|VARCHAR (32)|Public name of the PMA|account_name|
|description|VARCHAR (255)|Public description of the strategy|description|
|basesym|string|Coin of the accounting|baseSym|
|mindeposit|float|Min Deposit in Base Coin, should be more than MinTradeVol for that Coin|minDepositVol|
|managersshare|INT [1-20]|Manager's own funds cannot be lower than [1-20]%|managersshare|
|reward|INT [5-50]|Manager's reward from net profit [5-50]%|reward|
|maxdd|INT [20-80]|Maximum drawdown [20-80]. Account will be terminated in case Net Liquidation Value drops from confirmed ATH by more than maxdd%|maxdd|
|lockup|INT [1-360]|Lock-up period for the deposits in days|lockup|
|cycle|INT [7-360]|Profit distribution every [7-360] days|cycle|
|referral|INT [1-50]|50x50 referral giveaway [1-50]% from reward|referral|
|symlimits|array|Coins permitted for trading with limits in % as sym:percent|permittedSym, symLimits|
DEPRECATED|newsymlimits|array|Newly listed Coins permitted for trading with limits in % as trust_level:percent|newSym, newSymLimits|
|cross|BOOL[0,1]|1 - Permit cross-trading; 0 - Deny|cross|
|stoploss|BOOL[0,1]|1 - Allow stop-loss and selling coins with loss; 0 - Deny, and `cross` must be 0 as well|stoploss|
|maxspread|INT [3-15]|Deny market trades if spread is more than [3-15]%|maxspread|
|guestlevel|INT [0-9]|Disclosure level for non-subscribers|guestlevel|
|userlevel|INT [0-9]|Disclosure level for subscribers|userlevel|
|api|DEPRECATED|INTBot(1) or manual(2) trading, or both(3)|api|

---
### 902. PMA Performance chart 
Returns daily `performancePCT` values for the PMA if PMA status > 1 collected at 0:00-3:59h UTC daily + 1 last current value
```
POST https://api.50x.cloud/json.pmachart/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
**Sample reply:**
```
{"pmachart": [[1624147200, 43.7968, 0], [1624233600, 43.5668, 0], [1624320000, 42.8867, 0], [1624406400, 43.276, 0], [1624492800, 43.8077, 0], [1624579200, 43.912, 0], [1624665600, 43.309, 0], [1624752000, 43.0705, 0], [1624838400, 43.5105, 0], [1624924800, 43.0138, 0], [1625011200, 43.4053, 0], [1625097600, 42.9162, 0], [1625184000, 42.8194, 0], [1625270400, 42.9448, 0], [1625356800, 43.0953, 0], [1625443200, 42.402, 21130.01987967], [1625529600, 42.3144, 0], [1625616000, 42.1718, 0], [1625702400, 41.9557, 0], [1625788800, 41.8707, 0], [1625875200, 41.9367, 0], [1625961600, 42.0307, 0], [1626048000, 42.0902, 25000.0], [1626134400, 38.3368, 0], [1626220800, 37.9321, 0], [1626307200, 38.0303, 0], [1626393600, 38.3521, 0], [1626480000, 37.8062, 0], [1626566400, 37.8081, 0], [1626652800, 38.19941163, 0.0]]}
```
[timestamp, performancePCT, volume]
---
### 903. PMA dashboard
Returns current metrics for the PMA performance if PMA status > 1
```
POST https://api.50x.cloud/json.pmadashboard/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
**Sample reply:**
```
{"ddPCT": 5.7, "athPCT": 46.6, "cda": 575667.56115213, "nlv": 531181.9257598, "lastActionPerformancePCT": 43.0118, "rank": 0, "suspended": 0, "m_holdPCT": 8.2, "m_atr": 62.55616848, "trust": 0, "unrealizedPLPCT": -7.7, "pmaid": 14651, "max_ddPCT": 30.0, "performancePCT": 38.2, "lastActionNLV": 558036.8250544, "highWaterMarkTime": 1620006049, "overload": 0, "m_sharePCT": 0.3, "listed": 1, "highWaterMarkPCT": 42.9, "status": 2, "try_clearing": false, "users": 23, "m_totalPCT": 8.5, "symShare": {"USDT": [null, null, null, null], "A2A": [null, null, null, null], "ETH": [null, null, null, null], "BTC": [null, null, null, null], "50X": [null, null, null, null]}, "ok": true, "created": 1556828264, "age": 69882631, "unrealizedPL": -44485.63539233, "totalUsersProfit": 33025.75251381, "inactivity_timer": 1597968000, "pmachart": [[1625961600, 42.0307, 0], [1626048000, 42.0902, 25000.0], [1626134400, 38.3368, 0], [1626220800, 37.9321, 0], [1626307200, 38.0303, 0], [1626393600, 38.3521, 0], [1626480000, 37.8062, 0], [1626566400, 37.8081, 0], [1626652800, 38.19941163, 0.0]], "loadPCT": 16.3}
```
**Common returned values**:
`pmaid`, `status`, `listed`, `suspended`, `overload`
**Returned values if called from PMA or for LISTED PMA's**:
=rename=>
`users`, `cda`, `nlv`, `athPCT`, `loadPCT`, `performancePCT`, `ddPCT`, `max_ddPCT`, `m_sharePCT`, `m_holdPCT`, `m_totalPCT`, `m_atr`, `highWaterMarkTime`, `highWaterMarkPCT`, `profitPCT`, `created`, `age`, `trust`, `rank`, `chart`, `deadline`.
DEPRECATED `unrealizedPR`

---
### 904. PMA trades info
Returns last 100 trades and/or balances of the PMA based on `guestlevel` or (if authorized and this user has unclosed deposits in this PMA) on `userlevel` settings if PMA `status` > 1 && `listed`==1
```
POST https://api.50x.cloud/json.pmatrades/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
**Sample reply:**
```
{"trades": [{"time_create": 1577420122, "rate": 2.75e-06, "filled_amount": 10000.0, "sym2": "BTC", "sym1": "A2A", "bs": "s"}, {"time_create": 1577419983, "rate": 408163.265306, "filled_amount": 0.02096696, "sym2": "A2A", "sym1": "BTC", "bs": "s"}], "ok": true}
```

---
### 909. PMA banner
Returns jpg/gif file with the PMA chart and metrics.
```
GET https://api.50x.cloud/json.pmabanner/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
|lang|string|optional|Language code in ISO-639-1|
|design|INT|optional|Design ID|
|type|string|`required`|Must be 'jpg' or 'gif'|
|size|string|`required`|Must be a valid pre-defined value of 'width-height'|
`size` valid values are `100-100`, `200-200`, `250-250`, `120-600`, `336-280`, `300-250`, `300-600`, `160-600`, `728-90`, `468-60`, `320-50`, `320-100`.
If different banner designs are available, you can specify the `design` parameter.
`lang` ISO-639-1 supported values: "ko", "ru", "en", "debug". More languages will be supported later.

---
---
## Private methods, called from the manager's or user's account

---
### 910. Manager's PMA list
Returns the list of existing PMAs on manager's account with basic metrics for quick overview.
```
POST https://api.50x.cloud/json.managed_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|---------|
|status|INT|optional|Return only PMAs with this status|
**Sample reply:**
```
{"ok": true} TODO
```
**Returned values**:
`pmaid`, `basesym`, `status`, `listed`, `suspended`, `name`,`users`, `cda`, `nlv`, `performancePCT`, `ddPCT`, `max_ddPCT`,`m_totalPCT`, `profitPCT`, `loadPCT` (see  **Values explanation** section for the explanation)

---
### 911. Additional info for PMA opening

```
POST https://api.50x.cloud/json.new_pma/
```
**No Parameters**
**Sample reply:**
```
{"available_currs": ["BTC", "ETH", "LTC", "DASH", "XRP", "USDT", "A2A", "TRX", "OMG", "TUSD", "ZRX", "DAI", "PAXG", "QTUM", "BNB", "USDC", "LINK", "50X", "XMR", "SAND", "BAEX", "TUSDT", "WBTC"], "ok": true, "basesym_available_currs": ["BTC", "ETH", "LTC", "DASH", "USDT", "A2A", "TUSD", "DAI", "PAXG", "USDC", "LINK", "50X", "BAEX", "TUSDT", "WBTC"]}
```
**Returned values:**
`basesym_available_currs`: values that can be used as 912.basesym
`available_currs`: values that can be used as 912.symlimits

**Expected ERROR codes**:

---
### 912. PMA opening request
Opens a new PMA with transmitted settings
```
POST https://api.50x.cloud/json.open_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|Translation key|
|---|---|:----------:|--------|--------|
|name|VARCHAR (32)|`required`|Public name of the PMA|name|
|description|VARCHAR (255)|`required`|Public description of the strategy|description|
|basesym|string|`required`|Coin of accounting|baseSym|
|mindeposit|float|DEPRECATED|Min Deposit in Base Coin, should be more than MinTradeVol for that Coin|minDepositVol|
|managersshare|INT [1-20]|`required`|Manager's own funds cannot be lower than [1-20]%|managersshare|
|reward|INT [5-50]|`required`|Manager's reward from net profit [5-50]%|reward|
|maxdd|INT [20-80]|`required`|Maximum drawdown [20-80]. Account will be terminated in case Net Liquidation Value drops from confirmed ATH by more than maxdd%|maxddPCT|
|lockup|INT [1-360]|`required`|Lock-up period for the deposits in days|lockup|
|cycle|INT [7-360]|`required`|Profit distribution every [7-360] days|cycle|
|referral|INT [1-50]|`required`|50x50 referral giveaway [1-50]% from reward|referral|
|symlimits|array|`required`|Coins permitted for trading with limits in % as sym:percent|permittedSym, symLimits|
|sym2|array|`required`|second currency in case of Dual currency PMA, should be sent instead of symlimits|sym2|
|newsymlimits|DEPRECATED|Newly listed Coins permitted for trading with limits in % as trust_level:percent|newSym,newSymLimits|
|cross|BOOL[0,1]|DEPRECATED|1 - Permit cross-trading; 0 - Deny|cross|
|stoploss|BOOL[0,1]|DEPRECATED|1 - Allow stop-loss and selling coins with loss; 0 - Deny (in this case `cross` must be 0 as well)|stoploss|
|maxspread|INT [3-15]|`required`|Deny market trades if spread is more than [3-15]%|maxspread|
|guestlevel|INT [0-9]|`required`|Disclosure level for non-subscribers|guestlevel|
|userlevel|INT [0-9]|`required`|Disclosure level for subscribers|userlevel|
|feesym|INT|`required`|SYMBOL of the fee currency|code2fa|
|feevol|INT|`required`|Fee amount shown to the user|code2fa|
|otp|INT|`required`|2FA one-time code|code2fa|
|api|DEPRECATED|`required`|INT Bot(1) or manual(2) trading, or both(3)|api|

**NOTES**:
`symlimits` or `sym2` is mandatory parameter and they cannot be used together (or error 22008).
`sym2` should be used to open a special type of PMA: Dual currency PMA. Can be used if user account has `API.211.vip` >=50
`managersshare` should be checked at deposit, withdraw and profit distribution 
`referral` should be checked at clearing
`stoploss` allow to sell any coin only with loss on position-based accounting if `cross` is not allowed
`maxspread` orders with the price difference more than `maxspread` from the best offer price of the same direction are not allowed. A min(bid[current],bid[-300sec]) is taken a a benchmark for BUY order and max(ask[current],ask[-300sec]) for SELL order.
`feesym`, and `feevol` should be based on `API.110. Fees['pma_open']` rules.
DEPRECATED `mindeposit` on a system level could not be less than `sysPmaMinDeposit`=1000 A2A tokens' current market value, but could be specified in PMA settings.
DEPRECATED: if `api=1`, trading terminal order methods are disabled. if `api=2`, API is disabled.


**Expected ERROR codes**:
`10001`, `10002`
`91110`: Not enough A2A to pay the PMA fee, please buy A2A tokens first. PMA opening fee is {fee=5000} A2A. Your current balance is {availableA2A} A2A.
`91202`: Requested PMA public name already exists, must be unique.
`91203`: PMA opening error, please email support {domain.email}.
=new2020 `91204`: To create new PMA please return to the Root account first.
`91210`: Cross-trading must be denied to restrict StopLoss usage.
`91211`: Guest level of disclosure was set higher than subscriber's. It is not logical. Please check the settings and try again.

---
### 913. PMA Authorization
Switches Trading Terminal to PMA and back to main account by providing a new session id.
```
POST https://api.50x.cloud/json.switch_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID.|
To return to the main account, send `pmaid=0`
**Sample reply:**
```
{‘ok’: true, ‘x_session’: ‘id новой сессии’}
```
**Expected ERROR codes**:
`90004`: Access denied. This is not your PMA.
`91302`: This PMA is not activated yet.
`90007`: This PMA is blocked.
`91304`: Relogin error, please email to support {domain.email}.
`90099`: This PMA is closed

---
### 915. Getting a user's PMAs deposits' list
Returns all user's deposits to PMAs 
```
POST https://api.50x.cloud/json.deposits_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|history|INT[0,1]|`optional`|1 - returns CLOSED deposits; 0 or missing - returns OPEN deposits (default)|

**Sample reply:**
```
{"ok": true,"deposits":{
    "dep_id": dep_id,
    "volume":volume 
    ...
    }
} 
```
**NOTES**:
If called from the PMA, returns all deposts to current PMA from all users.

**Returned values**:
=rename=>
`dep_id`, `pmaid`, `state`, `highWaterMarkTime`, `basesym`, `volume`, `dep_profit`, `dep_profitPCT`, `dep_created`, `dep_age`,`income`=rename=>`dep_income`,
`nlv` =rename=>`dep_nlv`,
`performancePR`=rename=>`dep_performancePCT`,
`npd`=rename=>`npdTime`,
RESTORED: `capitalization`: If TRUE or '1', profit will be left on PMA as a new separate deposit.
DEPRECATED:`unrealizedPR`: Unrealized profit in % = `nlv`/`volume`*100-100;format to 1 decimals, floor 
DEPRECATED: `athPR`
DEPRECATED: `max_ddPCT`

---
###  ПРОВЕРЕНО2020 916. Opening new PMA deposit
Opens a new deposit on the specified PMA. If called from PMA, will deposit **from** the manager's account to the current PMA
```
POST https://api.50x.cloud/json.opendeposit_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|pmaid|INT|`required`|PMA unique ID|
|volume|float|`required`|Amount of the Base Token to be deposited|
|capitalization|boolean|optional|If TRUE, profit will be left in the PMA as a new deposit|
|otp|INT|`required`|2FA one-time code|code2fa|

**Sample reply:**
=rename=>
```
{"ok": true,"dep_id":dep_id,"volume":volume, "basesym":basesym} TODO
```
**Expected ERROR codes**:
`90000`
`91600`: You do not have available {sym} balance to deposit {volume} {sym}.
`91601`: You have already opened a deposit with the same PMA less than 5 minutes ago. Make sure that you do want to open more and try again after 5 minutes.
`91602`: You are in the PMA different to 'pma' parameter.
`91603`: This PMA is currently full and unavailable for the deposits, however, it may become open in the future. Please check the status updates at PMA's homepage.
`91604`: Error getting data from your root account. Please try again. If the problem continues, please contact the Support via email: {domain.email}.
`91605`: An ERROR occurred while opening the PMA deposit. Please try again. If the problem continues, please contact the Support via email: {domain.email}.
`90099`: This PMA was closed.
---
### 917. ПРОВЕРЕНО2020 Closing PMA deposit
Closes the PMA deposit
```
POST https://api.50x.cloud/json.closedeposit_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|dep_id|INT|`required`|Unique Deposit ID|
|otp|INT|`required`|2FA one-time code|code2fa|
DEPRECATED2020 |autoconvert|BOOL|optional|'1' for automatic exchange all funds to Base Token|autoconvert|
**Sample reply:**
```
{"ok": true} TODO
```
**Expected ERROR codes**:
`91700`: Invalid Deposit ID:{dep_id}. No deposit found with this id.
`91701`: Deposit ID:{dep_id} is already closed.
`91704`: Lock-up period for this deposit {dep_id} is not over yet. Please try again after {timeleft} seconds.[dep_id,timeleft]
`91705`: This deposit {dep_id} can not be closed.[dep_id]
`91706`: Deposit {dep_id} cannot be closed right now. Deposit withdrawals are temporarily unavailable in the PMA {pmaid} [dep_id, pmaid]

---
### ПРОВЕРЕНО2020 918. Closing all deposits on the PMA
Closes all user's PMA deposits
```
POST https://api.50x.cloud/json.closealldeposits_pma/
```
**Parameters:**
|Name|Type|Mandatory|Description|Translation key|
|---|---|:----------:|--------|--------|
|pmaid|INT|`required`|Unique PMA ID|NONE|
|otp|INT|`required`|2FA one-time code|code2fa|
**Sample reply:**
```
{"ok": true} TODO
```
**Expected ERROR codes**:
`90000`: Wrong PMA ID. No PMA was found with ID {pmaid}.[pmaid]
`90008`: PMA {pmaid} is suspended. Try again in few seconds. [pmaid, suspended]
`90099`: This PMA was closed.
---
## Private methods, called from the PMA

---
### 920. PMA editing request
Changes settings of the existing PMA
```
POST https://api.50x.cloud/json.edit_pma/
```
**Required Parameters:**
|Name|Type|Mandatory|Description|Translation key|
|---|---|:----------:|--------|--------|
|pmaid|INT|`required`|Unique PMA ID|NONE|
|otp|INT|`required`|2FA one-time code|code2fa|

**The following parameters are optional and can be changed only for the PMA with 0 subscribers:** 
`cross` and `stoploss`: can only be changed to value: 1
`name`, `managersshare`,  `maxdd`, `lockup`, `cycle`, `referral`, `maxspread`,  `userlevel` can be set as described in `912. PMA opening request`
**The following parameters are optional and can be changed for any PMA:** 
`description`, `mindeposit`, `reward`, `guestlevel`
**NOTES**:
Please refer to `912. PMA opening request` for parameters details
If the LISTED PMA is changed, it temporary becomes UNLISTED and will be listed again within a month.
**Sample reply:**
```
{"ok": true}
```
---
### 923. PMA userpic update
Uploads a new userpic file for the PMA, replacing the old one. If PMA `listed` == 1, only initial upload is possible. 
```
POST https://api.50x.cloud/json.pma_newuserpic/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|file|file|`required`|Valid image|
**Sample reply:**
```
{"ok": true}
```
**Expected ERROR codes**:
`92301`: Invalid Image.
`92302`: Your PMA has been already listed and userpic exists. You can not change userpic for listed PMA.

---
### 925. PMA closing request
Should be sent from the PMA to be closed. PMA will be added to the closing waiting list for 1 week, then closed.
```
POST https://api.50x.cloud/json.pma_close/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|2fa|INT|`required`|2FA one-time code|code2fa|
**Sample reply:**
```
{"ok": true, "status": 7, "deadline": 1234567812} TODO ДОБАВИТЬ ТАЙМСТЕМП ЗАКРЫТИЯ ПМА и статус в ответ
```
**Returned values**:
`status`: new PMA status code
`deadline`: Timestamp of the sheduled PMA closing procedure launce


---
### 926. Cancellation of the PMA closing request
If current PMA status is "7 = waiting to be closed", this request will cancel the closing request.
```
POST https://api.50x.cloud/json.pma_closecancel/
```
**Parameters:**
|Name|Type|Mandatory|Description|
|---|---|:----------:|--------|
|2fa|INT|`required`|2FA one-time code|code2fa|

**Sample reply:**
```
{"ok": true, "status": 2}
```
---
### 927. PMA profit distribution (clearing)
Called from PMA, initiates profit distribution. 
Until the end of the clearing, PMA will be suspended with `suspended=2`. All orders on the PMA will be cancelled during the clearing procedure and reopened right after the end of the clearing.
```
POST https://api.50x.cloud/json.pma_clearing/
```
**No Parameters**
Returns `{"ok": true}` on success.
Possible ERROR codes:
=new2020 `92701`: All balances bigger than the Minimal Trading Lot in each token should be converted to the Base Token of accounting before the profit distribution.
`92702`: NLV is less than last profit distribution level. Nothing to distribute.
`92703`: Last profit distribution was done less than a week ago. Please try again later.
endoffile

---
#### Changelog 17+18:
900 ADDED return value `basesym`
901 CHANGED Translation key `name` changed to `account_name` for `name` parameter.
913 Reply specified.
915 DELETED `profitPCT` because of same value as `unrealizedPR`
915 ADDED return value `npd`: Next Profit Distribution Timestamp
915 CHANGED calculation for `performancePR`: All time performance in percent=(`income`+`nlv`) / `volume` * 100 - 100;
BACK. CHANGED ИЗМЕНЕНА ПРОЦЕДУРА `Deposit.Withdraw`: При выводе депозита пользователем, если `915.unrealizedPR` этого депозита отрицательная (т.е. не нужно расчитывать вознаграждение менеджера), и если базовой валюты хватает, дополнительно нужно проверять лимиты по каждой валюты в пост-депозитном состоянии аккаунта. Если они не превысятся, выводим в базовой валюте. Если после вывода возникнет превышение лимита или есть нехватка базовой валюты или `915.unrealizedPR`>0, то задействуется *ранее описанная процедура* уведомления менеджера и, если не возникли условия вывода в `basesym` до истечения срока ожидания, последующий вывод производить в натуральной форме по всем валютам.
По факту `Deposit.Withdraw` МАСШТАБИРУЕМ `volume` всеx ордеров `SELL basesym/*` и `BUY */basesym` на коэффициент изменения `nlv` в результате вывода.
#### Changelog 19+20:
ADDED NEW error codes
CHANGED state 4 changed to 5 in deposit and PMA status in description
ADDED 2fa.912, 2fa.916, 2fa.917, 2fa.925, 2fa.926
DEPRECATED capitalization.916
DEPRECATED 915.capitalization
ADDED 903.lpdl

#### Changelog 21:
CHANGED `status` codes
DELETED status.900
ADDED minrank.900
ADDED mintrust.900
ADDED 903.listed
ADDED 903.suspended  
ADDED 903.rank 
ADDED 910.listed 
ADDED 910.suspended  
DEPRECATED `91102`: Not enough A2A or {basesym} to pay the PMA fee, it will be taken from your Base Token account in the equivalent of 10000 A2A.
ADDED `91110`: Not enough A2A to pay the PMA fee, please buy A2A tokens first. PMA opening fee is {fee=5000} A2A. Your current balance is {availableA2A} A2A.
DEPRECATED !`91201`: You do not have enough available {basesym} or A2A tokens to pay PMA opening fee.[basesym]

#### Changelog 22:
CHANGED 901.stoploss range
CHANGED stoploss.912 range
CHANGED 901.cross range
CHANGED cross.912 range
CHANGED 901.maxspread range
CHANGED maxspread.912 range

#### Changelog 23:
changed 903.ath to 903.athPR and calculation 
changed 903.ddPR calculation 
DEPRECATED api.912
added newsymlimits.912
added 901.newsymlimits
added 910.basesym

#### Changelog 25:
`*PCT`: in parameter/variable name means that the value is in percent
915. json.deposits_pma `nlv` =rename=>`depositNLV`
912. `2fa` =rename=>`otp`
916. `2fa` =rename=>`otp`
917. `2fa` =rename=>`otp`

#### Changelog CLOUD API:
type_id = 3  - PMA
payable_a2a
ЭЛЕМЕНТ `pma` МАССИВА `agreements` ИЗ `userinfo`: он показывает какие галочки отметил пользователь из согласий с правилами.
-нумерация
