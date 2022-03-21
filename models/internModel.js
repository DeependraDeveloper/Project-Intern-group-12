const mongoose = require('mongoose')
const validator = require('validator');



const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: ["please enter the name"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: [true, " emailId already used"],
        lowercase: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Please enter a valid EmailId")
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        minlen: [10, "please enter a valid mobile number"]
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model('Intern', internSchema)