const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

//---------------------------Validation Functions----------------------------------------------
const isValidRequestBody = requestBody => {
        return Object.keys(requestBody).length > 0
    }
    //---------------------------------------------------------------------------------------------
const isValid = value => {
        if (typeof value === 'undefined' || value === null) return false
        if (typeof value === 'string' && value.trim().length === 0) return false
        return true;
    }
    //---------------------------------------------------------------------------------------------
const isValidObjectId = objectId => {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//01****************************************************************************************************************

const createInterns = async function(req, res) {

    try {
        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide collage details' })
        }

        let { name, mobile, email, CollegeName } = req.body

        if (!isValid(name))
            return res.status(400).send({ status: false, message: `name is required` })

        if (!isValid(email))
            return res.status(400).send({ status: false, message: `Email is required` })

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })

        const isEmailAlreadyUsed = await internModel.findOne({ email });

        if (isEmailAlreadyUsed)
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })

        if (!isValid(mobile))
            return res.status(400).send({ status: false, message: `Mobile is required` })

        if (!(String(mobile).length === 10))
            return res.status(400).send({ status: false, message: `given mobile:${mobile} is not of valid 10 Digit number` })

        if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile))
            return res.status(400).send({
                status: false,
                message: `${mobile} is not a valid mobile number, Please provide a valid mobile number to continue`,
            });

        const isMobileAlreadyUsed = await internModel.findOne({ mobile });

        if (isMobileAlreadyUsed)
            return res.status(400).send({ status: false, message: `${mobile} this Mobile is already registered` })

        if (!isValid(CollegeName))
            return res.status(400).send({ status: false, message: `CollegeName is required` })


        let collegeDetail = await collegeModel.findOne({ name: CollegeName, isDeleted: false });

        if (!collegeDetail)
            return res.status(400).send({ status: false, msg: "No such college found" })

        let { _id } = collegeDetail;

        if (!isValid(_id))
            return res.status(400).send({ status: false, message: 'College id is required' })

        if (!isValidObjectId(_id)) {
            res.status(400).send({ status: false, message: `${_id} is not a valid College Id` })
            return
        }

        req.body["collegeId"] = _id

        let savedIntern = await internModel.create(req.body)
        res.status(201).send({ status: true, data: savedIntern })

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: err })
    }
}



//02*************************************************************************************************************************
const giveAllInterns = async function(req, res) {
    try {
        if (!isValid(req.query.CollegeName))
            return res.status(400).send({ status: false, message: 'collegeName is not proper' })


        let collegeDetail = await collegeModel.findOne({ name: req.query.CollegeName, isDeleted: false })

        if (!collegeDetail)
            return res.status(400).send({ status: false, msg: "No college found " })

        let { _id, name, fullName, logoLink } = collegeDetail

        let allInterns = await internModel.find({ collegeId: _id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })

        if (allInterns.length === 0)
            return res.status(400).send({ status: false, msg: "no intern applied for this college" })

        let College = { name, fullName, logoLink, intrest: allInterns }

        let ans = { data: College };

        ans ? res.status(200).send(ans) : res.status(400).send({ status: false, msg: "no one has applied for this college" })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}

//***********************************************************************************************************************
module.exports = { createInterns, giveAllInterns }