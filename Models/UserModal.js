const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    username: String,
    password: String,
    telephone: String,
}, {
    timestamps: true,
    versionKey: false,
})


// user validation
const validateUser = (user) => {
    const validationSchema = Joi.object().keys({
        fullName: Joi.string().alphanum().min(6).max(20).required(),
        email: Joi.string().email().required(),
        username: Joi.string().alphanum().min(5).required(),
        password: Joi.string().min(6).required(),
        telephone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })

    return validationSchema.validate(user, { abortEarly: false });
}

module.exports.User = mongoose.model('User', userSchema)
module.exports.validateUser = validateUser