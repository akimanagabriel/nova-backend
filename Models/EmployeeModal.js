const mongoose = require('mongoose')
const Joi = require('joi')

const empSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    documents: [Object],
    referrals: [{ name: String, mobile: String }],
}, {
    timestamps: true,
    versionKey: false
})


// user validation
const validateEmployee = (emp) => {
    const validationSchema = Joi.object().keys({

        documents: Joi.array().items(Joi.object({
            documentType: Joi.string().required(),
            documentUrl: Joi.string().required()
        })).min(1).required(),

        referrals: Joi.array().items(Joi.object({
            name: Joi.string().required(),
            mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required()
        })).min(1).required(),
    })

    return validationSchema.validate(emp, { abortEarly: false });
}

module.exports.Employee = mongoose.model('Employee', empSchema)
module.exports.employeeValidator = validateEmployee