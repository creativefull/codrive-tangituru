const config = require('./config.json')
const express = require('express'),
    app = express()
const {authorize, setToken} = require('./lib/auth')
const {copyFile} = require('./lib/drive')

// Load client secrets from a local file.
app.get('/getToken', (req,res) => {
    authorize((url) => {
        res.redirect(url)
    });
})

app.get('/setToken', async (req,res) => {
    setToken(req.query.code, (tokens) => {
        res.json(tokens)
    })
})

app.get('/copy', copyFile)

app.listen(config.port, config.host, () => console.log("Application running on " + config.host + ":" + config.port))