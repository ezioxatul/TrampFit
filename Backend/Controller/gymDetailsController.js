const gymDetailsModel = require('../Models/gymDetailsModel');
const partnerLoginModel = require('../Models/partnerLoginModel');
const sequelize = require("../databaseConnection");
const { where, Op } = require("sequelize");


//Getting Gym Details
const getGymDetailsController = async (req, res) => {
    try {
        let gymName = req.body.gymName;
        let gymLocation = req.body.gymLocation;
        let gymCity = req.body.gymCity;
        let openingTime = req.body.openingTime;
        let closingTime = req.body.closingTime; 
        let gymDescription = req.body.gymDescription;
        let gymQuestion = req.body.gymQuestion;
        let panNumber = req.body.panNumber;
        let gstNumber = req.body.gstNumber;
        let bankAccountNumber = req.body.bankAccountNumber;
        let ifscCode = req.body.ifscCode;
        let gymLogo = req.files.gymLogo[0].path;
        let interiorPhoto = req.files.interiorPhoto[0].path;
        let panImage = req.files.panImage[0].path;


        let partnerId = await partnerLoginModel.findOne({
            attributes: ['id'],
            where: {
                mobileNumber: req.userDetails.payloadData.mobileNumber
                
            }
        });

        partnerId = JSON.parse(JSON.stringify(partnerId));
        
        await gymDetailsModel.create({
            gymName: gymName,
            gymLocation: gymLocation,
            gymCity: gymCity,
            openingTime: openingTime,
            closingTime: closingTime,
            gymDescription: gymDescription,
            gymQuestion: gymQuestion,
            panNumber: panNumber,
            gstNumber: gstNumber,
            bankAccountNumber: bankAccountNumber,
            ifscCode: ifscCode,
            gymLogo: gymLogo,
            interiorPhoto: interiorPhoto,
            panImage: panImage,
            partnerId: partnerId.id
        });

        res.json({
            message: "Gym Details Added Successfully",
            response: true
        })

        

    } catch (error) {
        console.log(error)
        res.json({
            message: "Something went Wrong !!",
            response: false
        })
    }
}

//checking the token
const tokenCheckController = (req, res) => {
    try {
        res.json({
            message: "Valid Partner",
            response: true
        })
    } catch (err) {
        res.json({
            message: "Something went wrong",
            response: false
        })
    }
}




module.exports = { getGymDetailsController, tokenCheckController}