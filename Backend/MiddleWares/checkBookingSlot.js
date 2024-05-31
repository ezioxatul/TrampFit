const { Op } = require('sequelize');
const sessionBookingModel = require('../Models/sessionBookingModel');
const checkBookingSlot = async(req,res,next) => {
    try {

        let userId = req.information.userInfo.id;
        let {sessionId} = req.body;

        let getSlotBooking = await sessionBookingModel.findOne({
            attributes : ['sessionId'],
            where : {
                [Op.and] : [
                    {
                        sessionId : sessionId
                    },
                    {
                        userId : userId
                    }
                ]
            }
        })

        if(getSlotBooking === null) {
            next();
        } else {
            res.json({
                message : "Session already booked...",
                response : false
            })
        }
    } catch(err) {
        console.log(err) ;

        res.json({
            message : "Something went wrong!!",
            response : false
        })
    }
}

module.exports = checkBookingSlot