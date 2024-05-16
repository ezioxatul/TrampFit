const { where } = require('sequelize');
const membershipDetailsModel = require('../Models/membershipModel.config'); 

const deactivateMembershipLimitCheck = async(req,res,next) => {
    try {

        let activeMembershipCount = await membershipDetailsModel.count({
            where : {
                status : "Active"
            }
        })

        if(activeMembershipCount > 1) {
            next();
        } else {
            res.json({
                message : "Plan can not be deactivated !!",
                response : false
            })
        }

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}


module.exports = deactivateMembershipLimitCheck;