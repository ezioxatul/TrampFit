const signupModel = require('../Models/signUpModel');

const getUserEmail = async (req,res,next) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;
        
        let userEmail = await signupModel.findOne({
            attributes : ['id','email'],
            where : {
                mobileNumber : mobileNumber
            }
        })

        req.userEmail = userEmail;
        req.fullName = req.userDetails.payloadData.fullName;
        
        next();

    } catch(err) {
        console.log(err);
        
        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}

module.exports = getUserEmail;