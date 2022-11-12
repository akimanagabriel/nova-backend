const Joi = require('joi')
const { User } = require('../Models/UserModal')

const authSchema = Joi.object().keys({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
})

const authController = {

    login: async (req, res) => {
        const { error, value } = authSchema.validate(req.body)

        if (error) {
            return res.status(400).json({
                message: 'error occured',
                error: error.details.map(e => e.message.replaceAll(/\"/g, ""))
            })
        }

        const { username, password } = value

        const users = await User.find({ username })
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }

        const loggedUser = users.filter(user => user.password === password)
        if (loggedUser.length === 0) {
            return res.status(400).json({ message: "incorrect user's password" })
        } else {
            //save user into session
            req.session.user = loggedUser[0]
            return res.json({ message: "login success", user: loggedUser[0] })
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.json({
            message: "session destroyed",
            logout: "ok"
        })
    },

    loginSession: (req, res) => {
        if (req.session.user) {
            const { user } = req.session
            res.json(user)
        } else {
            res.status(404).json({
                message: "no session created"
            })
        }
    }

}

module.exports.authController = authController