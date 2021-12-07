# 211. User information

```text
POST https://api.50x.cloud/json.userinfo/
```

After authorization, user information and balances are shown

**Parameters: no**

**Sample reply** (subsequently, additional fields may appear):

```json
{
    "email_confirmed": true, 
    "last_auth_ip": "10.1.0.254", 
    "lang": "en", 
    "first_name": "Example", 
    "ip_restriction_list": "", 
    "blocked": 0, 
    "prev_auth_ip": "10.1.0.254", 
    "email": "example@mail.com", 
    "username": "example@mail.com", 
    "ip_restriction_enabled": false, 
    "fa2_auth_enabled": true, 
    "last_name": "", 
    "actions": "", 
    "balances": [
        ["A2A(B)", 0.074999889323, 0.0],
        ["A2A", 0.0, 0.0], 
        ["BTC", 5555.8909556407, 0.28180805], 
        ["ETH", 13234234.08039, 7.614], 
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

`balances` ARRAY, format: [COIN-SYMBOL, TOTAL_BALANCE, RESERVED_BALANCE, LOAN_BALANCE]

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

`fa2_auth_enabled`: true

`masterkey`: BOOL, 'true' means masterkey is enabled

`wotp`: BOOL, 'true' means separate OTP for withdrawal is enabled

`termination_state`: if > 0 means the termination procedure has began

`termination_time`: shows when the termination procedure will actually start

`loan_level` - borrowed funds to own trusted funds in percent

`margin_level` - loan coverage funds to own trusted funds in percent (loan coverage is an amount of the assets to be sold to buy back missing part of the borrowed funds)

`margin_call` if TRUE, account is in the process of the liquidation of the loans by changing own funds to the loan assets.

`withdrawal_delay` Withdrawal orders and changes of the EWA will be executed with the given delay in seconds.

`new_withdrawal_delay` New (future) value of the `withdrawal_delay`

`new_withdrawal_delay_from` UTC timestamp when the `new_withdrawal_delay` will be set as a `withdrawal_delay`

`avail_for_withdraw` Available volumes for withdrawals.

`emergency_wallets` List of coins with alredy set emergency wallets.

`have_masterkey` Has user got master key.

`have_wotp` Is WOTP enable.

`last_message` last message id. ??? Don't work now

`vip` Account Vip level

`payable_a2a` qnt of payable A2A

`telegram_ids` list of telegrams ID's to notificate.

`telegram_notify_events` list of telegram notify events.

`user_id` ID of user account.

`pmaid` ID of pma account. Not 0 in PMA account.

&nbsp;

### **Typescript** 
```

type TAgreement = 
    'lending' | 
    'loan' |
    'pma' |
    'privacy' |
    'risks' |
    'terms' 

type TBalance = [string, number, number, number];

interface IUserInfo {
    agreements: Record<TAgreement, number>
    avail_for_withdraw: Record<string, number>
    balances: TBalance[]
    blocked: number
    deposited_pma_list: number[]
    email: string
    email_confirmed: boolean
    emergency_wallets: string[]
    fa2_auth_enabled: boolean
    have_masterkey: boolean
    have_wotp: boolean
    ip_restriction_enabled: boolean
    ip_restriction_list: null | string
    lang: string
    last_auth_ip: string
    last_message: number
    loan_level: number
    margin_call: boolean
    margin_level: number
    vip: number
    new_withdrawal_delay: null | number
    new_withdrawal_delay_from: number
    nickname: string
    own_pma_list: number[]
    payable_a2a: number
    prev_auth_ip: string
    telegram_ids: string[]
    telegram_notify_events: string[]
    termination_state: number
    termination_time: number
    type_id: number
    user_id: number
    pmaid?: number 
    username: string
    withdrawal_delay: number

}
```