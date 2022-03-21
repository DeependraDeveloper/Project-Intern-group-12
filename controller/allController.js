const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


const createCollege = async function(req, res) {
    try {
        var data = req.body
        let savedData = await collegeModel.create(data)
        res.status(201).send({ data: savedData })
    } catch (error) {
        res.status(500).send({ status: "failed", message: error.message })
    }

}

const createIntern = async function(req, res) {
    try {
        var data = req.body
        let savedData = await internModel.create(data)
        res.status(201).send({ data: savedData })
    } catch (error) {
        res.status(500).send({ status: "failed", message: error.message })
    }

}

const getDetails = async function(req, res) {

    try {

        let array = []
        let name = req.query.name
        let detail = await internModel.find({ name: name })

        if (detail.length > 0) {

            for (let element of detail) {

                if (element.isDeleted === false) {
                    array.push(element)
                }
            }
            res.status(200).send({ status: true, data: array })

        } else {
            res.status(404).send({
                status: false,
                msg: "no such details found"
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ status: "failed", message: err.message })
    }

}




module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getDetails = getDetails