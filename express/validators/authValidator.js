const { body } = require("express-validator");

exports.registerValidation = [
        body('email')
        .isEmail()
        .withMessage('Invalid email'),

        body('password')
        .isLength({ min:6 })
        .withMessage('Minimum 6 characters required')
]