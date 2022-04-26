const express = require('express')
const app = express()
const versions = require('./versions.json')
const messages = require('./messages.json')
const config = require('./config.json')

app.get('/*', function (req, res) {
    let requestUrl = req.originalUrl;
    let request = requestUrl.substr(1);
    let response = versions[request];
    let responseType;
    if (typeof response !== 'undefined'){
        responseType = messages.success;
    }else{
        responseType = messages.notfound;
    }
    if(responseType !== messages.success){
        response = versions.notfound;
    }
    let responseCtor = `{
        "status": "${responseType.status}",
        "message": "${responseType.message}",
        "binary": "${response.binary}",
        "content": "${response.content}"
    }`
    const responseJsonObj = JSON.parse(responseCtor);
    res.send(responseJsonObj)
})

app.listen(config.api.port)