const collegeModel = require('../models/collegeModel');

//---------------------------Validation Functions---------------------------------------------------------
const isValidRequestBody = requestBody => {
    return Object.keys(requestBody).length > 0
}
const isValid = value => {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

//01--------------------------------------------------------------------------------------------------------
const createCollege = async function(req, res) {
    try {
        if (!isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide collage details' })
        }
        let { name, fullName, logoLink } = req.body

        if (!isValid(name))
            return res.status(400).send({ status: false, message: `name is required` })

        let Collegedata = await collegeModel.findOne({ name, isDeleted: false })

        if (Collegedata)
            return res.status(400).send({ status: false, msg: `${name} already exist` })

        if (!isValid(fullName))
            return res.status(400).send({ status: false, message: `fullName is required` })


        let Collegefullname = await collegeModel.findOne({ fullName, isDeleted: false })

        if (Collegefullname)
            return res.status(400).send({ status: false, msg: `${fullName} already exist` })

        if (!isValid(logoLink))
            return res.status(400).send({ status: false, message: `logoLink is required` })


        let CollegeLogo = await collegeModel.findOne({ logoLink, isDeleted: false })

        if (CollegeLogo)
            return res.status(400).send({ status: false, msg: `${logoLink} already exist` })

        if (!(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(logoLink)))
            return res.status(400).send({ status: false, message: `logoLink is not a valid URL` })

        let createdCollege = await collegeModel.create(req.body)
        res.status(201).send({ status: true, msg: "Collage created Successfully", data: createdCollege })

    } catch (err) {
        res.status(500).send({ status: false, data: err });
    }
}

module.exports = { createCollege }