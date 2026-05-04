const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8
    },
    role: {
        type: String,
        enum: ['developer', 'hr', 'manager', 'tester', 'architect'],
        default: 'developer'
    },
    officeAddress: {
        country: { type: String, trim: true, required: true },
        state: { type: String, trim: true, required: true },
        street: { type: String, trim: true, required: true },
        city: { type: String, trim: true, required: true },
        zip: { type: String, trim: true, required: true }
    },
    skillProfile: {
        isPermanentEmp: { type: Boolean, default: true },
        skillset: { type: [String], default: [] }
    }
},{
    timestamps: true
});


module.exports = mongoose.model("Employees", empSchema);