const uploader = require('express-fileupload')
const express = require('express')
const route = express.Router()

route.use(uploader());

route.get('/upload', (req, res) => {
    res.sendFile(__dirname + "/views/upload.html")
})

route.post('/uploader', (req, res) => {
    if (req.files) {
        const { document } = req.files
        document.mv(__dirname + '/uploads/' + document.name)
        res.send("uploaded ...")
    } else {
        res.send('no file exist')
    }
})

module.exports.uploader = route