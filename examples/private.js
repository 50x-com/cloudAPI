const converToUrlencoded = (data) => {
    if(!data) return '';
    const res = [];
    Object.keys(data).forEach(key => {
        let value = data[key];
        if(typeof value === "number"){
            value = data[key].toString();
        }
        else if(typeof value === "boolean"){
            if(!value) value = '0';
            else value = "1";
        }
        else if(typeof value === "object"){
            value = JSON.stringify(value);
        }
        res.push(`${key}=${encodeURIComponent(value)}`);
    })
    return res.join('&');
}


const getHeaders = () => {
    const headers = {
        //"X-Session": "YOUR_X-SESSION_CODE",
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Partner": "other" 
        // After the app has been developed, you can send an email 
        // to support@50x.com and obtain your permanent partner identification.
    };
    return headers;
}

export const privateAPI = (method, params) => {
    return new Promise((resolve, reject) => {
        fetch("https://api.50x.cloud/" + method, {
            body: converToUrlencoded(params), 
            headers: getHeaders(),
            method: "POST"
        })
        .then(r => r.json())
        .then(r => {
            console.log("success", r)
            resolve(r);
        })
        .catch((e) => {
            console.log("error", e)
            reject(e);
        });
    })
    
    
}