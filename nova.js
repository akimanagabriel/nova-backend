var mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000
const { database } = require('./configurations/config');
const router = require('./Routes/MainRoutes');
const loggger = require('./Middlewares/logger');


// mongoose.connect(database.url)
require('dotenv').config()
const dbUrl = process.env.NODE_ENV === 'development' ? database.offlineUrl : database.onlineUrl
mongoose.connect(dbUrl, () => console.log('Database connected'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//sessions and cookies
const oneDay = 1000 * 60 * 50 * 24
app.use(session({
    secret: 'mysecret',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))
app.use(cookieParser())

// custom middlewares
app.use('/api', loggger, router)
app.use((req, res) => res.status(404).json({ error: 'path not found' }))


app.listen(port, () => console.log('listening on port: ' + port))