const Employee = require("../models/employee");


exports.getAllEmployee = async (req, res, next) => {
    try{
        const empList = await Employee.find({});
        res.status(200).json(empList);
    } catch(err) {
        next(err);
    }
}

exports.getEmpByID = async (req, res, next) => {
    const id = req.params.id;
    try {
        const empList = await Employee.findOne({ _id: id });
        res.status(200).json(empList);
    } catch(err) {
        next(err);
    }
}

exports.fullUpdate = async (req, res, next) => {
    const id = req.params.id;
    try {
        const emp = await Employee.findByIdAndReplace(
            id,
            req.body,
            {
                runValidators: true,
                new: true
            }
        );

    if (!emp) {
    return res.status(404).json({ message: "No Record found" });
}

res.status(200).json(emp);
    } catch(err) {
        next(err);
    }
}

exports.partialUpdate = async (req, res, next) => {
    const id  = req.params.id;

    try {
        const updatedEmp = await Employee.findByIdAndUpdate({ _id:id },
            { $set : req.body },
            {
                runValidators: true,
                new : true,
                context: 'query'
            }
        )

        if(!updatedEmp) {
            return res.status(200).json({ message: "Unable to update Employee" })
        }

        return res.status(200).json(updatedEmp);
    } catch (err) {
        next(err)
    }
}