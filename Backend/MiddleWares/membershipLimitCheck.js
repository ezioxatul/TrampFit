const { where } = require('sequelize');
const membershipDetailsModel = require('../Models/membershipModel.config');

const membershipLimitCheck = async(req,res,next) => {

    try{

        let membershipCount = await membershipDetailsModel.count({
            where : {
                status : "Active"
            }
        })

        if(membershipCount < 3) {
            next();
        } else {
            res.json({
                message : "Plan Limit has been exceeded !!",
                response : false
            });
        }

    } catch(err) {
        console.log(err)

        res.json({
            message : "Something went wrong !!",
            response : false  
        })
    }

}


module.exports = membershipLimitCheck;