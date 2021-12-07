import { privateAPI } from "./private.js"

privateAPI('json.currencies').then(r => {
    document.getElementById('content').innerHTML = 
    `<table>
        <tr>
            <th>Coin</th>
            <th>Title</th>
            <th>Min trade vol</th>
            <th>Blockchain</th>
        </tr>
        ${
            r.map(it => 
                `<tr>
                    <td>${it.sym}</td>
                    <td>${it.title}</td>
                    <td>${it.min_trade_vol}</td>
                    <td>${it.blockchain}</td>
                </tr>`
            ).join('')
        }
    </table>`
})