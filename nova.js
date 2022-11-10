require('dotenv').config()
var mongoose = require('mongoose');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
const { database } = require('./configurations/config');
const router = require('./Routes/MainRoutes');
const loggger = require('./Middlewares/logger');

// mongoose.connect(database.url)
const dbUrl = process.env.NODE_ENV === 'development' ? database.offlineUrl : database.onlineUrl
mongoose.connect(dbUrl, () => console.log('Database connected'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// custom middlewares
app.use('/api', loggger, router)
app.use((req, res) => res.status(404).json({ error: 'path not found' }))


app.listen(port, () => console.log('listening on port: ' + port))