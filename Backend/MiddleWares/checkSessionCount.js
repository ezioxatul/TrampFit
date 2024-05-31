const userModel = require('../Models/signUpModel');
const sessionModel = require('../Models/sessionModel');

const checkSessionCount = async(req,res,next) => {
    try {

        let userSessionCount = req.information.userInfo.totalSession;
        let sessionCapacity = req.information.partnerInfo.sessionCount;

        if(userSessionCount == null) {
            res.json({
                message : "Does not have membership..",
                response : false
            });
        }

        else if(userSessionCount > 0 && sessionCapacity > 0) {
            next();
        } 
        else {
            if(userSessionCount > 0 && sessionCapacity == 0) {
                res.json({
                    message : "Session Capacity Exceeds",
                    response : false
                })
            } else if(userSessionCount == 0 && sessionCapacity > 0) {
                res.json({
                    message : "user does not have enough session",
                    response : false
                })
            } else {
                res.json({
                    message : "Session is not booked",
                    response : false
                })
            }
        }

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}

module.exports = checkSessionCount;