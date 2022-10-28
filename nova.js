const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const users = [{
    id: 1,
    name: 'gaby'
},]

app.get('/', (req, res) => {
    res.json(users)
})

app.listen(port, () => console.log('listening on port: ' + port))