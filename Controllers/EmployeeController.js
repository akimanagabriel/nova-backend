const { Employee, employeeValidator } = require('../Models/EmployeeModal')

const Controller = {

    all: async (req, res) => {
        const employees = await Employee.find().populate('userId').sort({ createdAt: -1 })
        if (employees.length === 0) return res.status(404).json({ message: "no employee found" })

        res.json(employees)
    },


    one: async (req, res) => {
        const employee = await Employee.findById({ _id: req.params.id }).populate('userId')
        if (!employee) return res.status(404).json({ message: "no employee found" })
        return res.json(employee)
    },

    create: async (req, res) => {
        const { error, value } = employeeValidator(req.body)
        if (error) return res.status(400).json({
            message: 'error occured',
            error: error.details.map(e => e.message.replaceAll(/\"/g, ""))
        })
        const employee = await Employee({ userId: req.session.user._id, ...value })
        await employee.save()
        return res.json({ message: 'Employee saved', data: employee })
    },

    update: (req, res) => {
        res.send("Employee updating....")
    },

    destroy: (req, res) => {
        Employee.findByIdAndDelete({ _id: req.params.id }, {}, (err, result) => {
            if (err) return res.json(err)
            return res.json(result)
        })
    },

}

module.exports.employeeController = Controller