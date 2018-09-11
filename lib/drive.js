const {google} = require('googleapis')
const {getOAuth} = require('./auth')

exports.copyFile = async (req,res) => {
    try {
        if (req.query.id) {
            const drive = google.drive({
                version: 'v3',
                auth: getOAuth()
            })
    
            drive.files.copy({
                fileId : req.query.id
            })
            
            res.send("File Berhasil Di Copy")    
        } else {
            res.send("File Tidak Di Temukan")
        }

        // res.json(copy.data)
    } catch (e) {
        console.error(e)
        res.send("Terjadi Kesalahan Server")
    }
}