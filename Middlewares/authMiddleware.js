const auth = (req, res, next) => {
    if (req.session.user) return next()
    res.status(400).json({ message: "You must login first" })
    res.end()
}

module.exports.AuthMiddleware = auth