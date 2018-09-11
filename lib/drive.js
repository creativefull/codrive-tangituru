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
                fileId : '1v4rl82BOxT1jO3eS_OZ-QyaaIdu1fM6Y8w'
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