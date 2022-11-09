const { isValidObjectId } = require("mongoose")

// request param must be renamed 
const validateId = (req, res, next) => {
    const id = req.params.id || req.query.id || req.body.id
    if (isValidObjectId(id)) {
        return next()
    }
    return res.status(400).json({ message: "invalid provided identification" })
}

module.exports = validateId