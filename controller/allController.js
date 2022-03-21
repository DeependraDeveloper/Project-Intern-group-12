const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")


//validation function-----------------------------------------
const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}
const isValidObjectId = function(objectId) {
        return mongoose.Types.ObjectId.isValid(objectId)
    }
    //01-***********************************************************************************************************************
const createCollege = async function(req, res) {
    try {
        //reqbody validation
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })

        }
        const { name, fullName, logoLink, isDeleted } = requestBody;

        //name validation
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'college name is required' })

        }
        const isNameUsed = await collegeModel.findOne({ name });

        if (isNameUsed) {
            return res.status(400).send({ status: false, message: `${name}  already registered` })

        }
        //fullNAme validation
        if (!isValid(fullName)) {
            return res.status(400).send({ status: false, message: 'FullName is required' })

        }
        const isFullName = await collegeModel.findOne({ fullName });

        if (isFullName) {
            return res.status(400).send({ status: false, message: `${fullName}  already registered` })
        }
        //logolink validation
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, message: 'logoLink is required' })
        }

        const isLogoLink = await collegeModel.findOne({ logoLink });

        if (isLogoLink) {
            return res.status(400).send({ status: false, message: `${logoLink}  already registered` })
        }

        const collegeData = {
            name,
            fullName,
            logoLink,
            isDeleted
        }
        const newCollege = await collegeModel.create(collegeData)
        res.status(201).send({ status: true, message: 'New book created successfully', data: newCollege })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}


//02-************************************************************************************************************************
const createIntern = async function(req, res) {
    try {
        //reqbody validation
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide intern details' })

        }
        const { name, email, mobile, collegeId, isDeleted } = requestBody;

        //name validation
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'college name is required' })

        }
        const isNameUsed = await internModel.findOne({ name });

        if (isNameUsed) {
            return res.status(400).send({ status: false, message: `${name}  already registered` })

        }
        //fullNAme validation
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: 'emailId is required' })

        }
        const isEmail = await internModel.findOne({ email });

        if (isEmail) {
            return res.status(400).send({ status: false, message: `${email}  already registered` })
        }
        //logolink validation
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: 'mobile is required' })
        }

        const isMobile = await collegeModel.findOne({ mobile });

        if (isMobile) {
            return res.status(400).send({ status: false, message: `${mobile}  already registered` })
        }
        //collgeid validation
        if (!isValid(collegeId)) {
            return res.status(400).send({ status: false, message: 'collegeid is required' })
        }

        const isCollegeId = await collegeModel.findOne({ logoLink });

        if (isCollegeId) {
            return res.status(400).send({ status: false, message: `${collegeId}  already registered` })
        }


        const internData = {
            name,
            email,
            mobile,
            isCollegeId,
            isDeleted
        }
        const newIntern = await collegeModel.create(internData)
        res.status(201).send({ status: true, message: 'New book created successfully', data: newIntern })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}


//03**************************************************************************************************************
const getDetails = async(req, res) => {

    try {

        if (!(isValid(req.params.collegeId) && isValidObjectId(req.params.collegeId))) {
            return res.status(400).send({ status: false, msg: "collegeId is not valid" })
        }

        let tempIntern = await bookModel.findOne({ _id: req.params.name, isDeleted: false })

        if (tempIntern) {

            let intern = await internModel.populate("College")

            if (intern.length > 0) {


                res.status(200).send({ status: true, data: intern })

            }
        } else {
            res.status(404).send({ status: false, msg: "intern not exist" })

        }

    } catch (err) {

        console.log(err)
        res.status(500).send({ status: false, error: err.message })
    }
}





module.exports.createCollege = createCollege
module.exports.createIntern = createIntern
module.exports.getDetails = getDetails



// const createCollege = async function(req, res) {
//     try {
//         var data = req.body
//         let savedData = await collegeModel.create(data)
//         res.status(201).send({ data: savedData })
//     } catch (error) {
//         res.status(500).send({ status: "failed", message: error.message })
//     }

// }



// const createIntern = async function(req, res) {
//     try {
//         var data = req.body
//         let savedData = await internModel.create(data)
//         res.status(201).send({ data: savedData })
//     } catch (error) {
//         res.status(500).send({ status: "failed", message: error.message })
//     }

// }

// const getDetails = async function(req, res) {

//     try {
//         let array = []
//         let name = req.query.name
//         let detail = await internModel.find({ name: name }).populate("College")

//         if (detail.length > 0) {

//             for (let element of detail) {

//                 if (element.isDeleted === false) {
//                     array.push(element)
//                 }
//             }
//             res.status(200).send({ status: true, data: array })

//         } else {
//             res.status(404).send({
//                 status: false,
//                 msg: "no such details found"
//             })
//         }

//     } catch (err) {
//         console.log(err)
//         res.status(500).send({ status: "failed", message: err.message })
//     }

// }