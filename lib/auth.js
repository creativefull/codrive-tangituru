const {google} = require('googleapis');
const fs = require('fs');
const credentials = require('../credentials.json')

/*
======= CONFIGURATION ==========
*/
const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.photos.readonly'
];
const TOKEN_PATH = 'token.json';
/*
===== END CONFIGURATION =========
*/

exports.getOAuth = () => {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    const token = require('../token.json')
    oAuth2Client.setCredentials(token)
    return oAuth2Client;
}

exports.authorize = function(callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
    
    const urlAuth = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    })

    callback(urlAuth)
}

exports.setToken = async (code, callback) => {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    try {
        const {tokens} = await oAuth2Client.getToken(code)
        oAuth2Client.setCredentials(tokens)
    
        fs.writeFile(TOKEN_PATH, new Buffer(JSON.stringify(tokens)), () => {
            return callback(tokens)
        })
    } catch (e) {
        console.error(e)
        return callback(null)
    }
}

exports.setCredentials = (authClient, token, callback) => {
    // authClient.
}