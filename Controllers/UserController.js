const { User, validateUser } = require('../Models/UserModal')

const userController = {

    one: async (req, res) => {
        const user = await User.findOne({ _id: req.params.id })
        if (user.length === 0) return res.status(404).json({ message: "No user found" })
        return res.json(user)
    },

    all: async (req, res) => {
        const users = await User.find().sort({ createdAt: -1 })
        if (users.length === 0) return res.status(404).json({ message: "No user found" })
        return res.json(users)
    },

    create: async (req, res) => {
        const { error, value } = validateUser(req.body)

        if (error) return res.status(400).json({
            message: 'error occured',
            error: error.details.map(e => e.message.replaceAll(/\"/g, ""))
        })

        const user = User(value)
        const data = await user.save()
        if (data) return res.json({ message: 'user created', data })
        return res.json({ message: 'failed to create a user' }).status(500)
    },

    update: async (req, res) => {
        const { error, value } = validateUser(req.body)

        if (error) return res.status(400).json({
            message: 'error occured',
            error: error.details.map(e => e.message.replaceAll(/\"/g, ""))
        })

        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: 'user not found' })
        return res.json({
            message: 'user modified',
            data: await User.findById(req.params.id)
        })
    },

    destroy: async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id, req.body)
        if (!user) return res.status(404).json({ message: 'user not found' })
        return res.json({
            message: 'user removed',
        })
    },

}

module.exports = userController