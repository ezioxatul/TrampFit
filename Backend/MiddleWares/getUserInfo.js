const userSignupModel = require('../Models/signUpModel');
const SessionModel = require('../Models/sessionModel');
const gymDetailModel = require('../Models/gymDetailsModel');
const partnerLoginModel = require('../Models/partnerLoginModel');

const getUserInfo = async (req,res,next) => {
    try {

        let {sessionId} = req.body;
        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let userInfo = await userSignupModel.findOne({
            attributes : ['id','email','totalSession','fullName'],
            where : {
                mobileNumber : mobileNumber
            }
        })

        let partnerInfo = await SessionModel.findOne({
            include : [
                {
                    model : gymDetailModel,
                    attributes : ['id','gymName'],
                    as : "gymDetails",
                    include : [
                        {
                            model : partnerLoginModel,
                            attributes : ['id','email'],
                            as : "partnerInfo"
                        }
                    ]
                }
            ],
            attributes : ['sessionCount'],
            where : {
                id : sessionId
            }  
        })

        req.information = {
            userInfo,
            partnerInfo
        }

        next();

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong!!",
            response : false
        })
    }
}

module.exports = getUserInfo;