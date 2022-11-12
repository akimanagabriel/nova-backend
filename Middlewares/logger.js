const moment = require('moment')
const fs = require('fs');

const loggger = (req, res, next) => {
    const content = `${moment().format('MMMM Do YYYY, h:mm:ss a')}  ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}\n`
    fs.writeFile('logs/api_logs.log', content, { flag: 'a+' }, (err) => {
        if (!err) console.log(`${moment().format('MMMM Do YYYY, h:mm:ss a')}  ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    });
    next()
}




module.exports = loggger