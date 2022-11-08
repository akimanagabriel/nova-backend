var mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const { database } = require('./configurations/config')
const Test = require('./Models/Test.modal')


//Set up default mongoose connection
mongoose.connect(database.url);

//Get the default connection
// var db = mongoose.connection;

app.get('/create-test', (req, res) => {
    var test
    if (req.query.name) {
        test = Test({ name: req.query.name })
    } else {
        test = Test({ name: 'NodeJs test' })
    }

    test.save((err) => {
        if (err) res.json(err)
        res.json({
            message: 'test created successfully',
            data: test
        })
    })
})

app.get('/', (req, res) => {
    Test.find()
        .exec((err, tests) => {
            if (err) res.json({
                message: 'error occured while finding test',
                details: err
            })
            res.json(tests)
        })
})

app.listen(port, () => console.log('listening on port: ' + port))