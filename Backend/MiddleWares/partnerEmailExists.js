const partnerLoginModel = require('../Models/partnerLoginModel');

const partnerEmailExists = async (req, res, next) => {
    try{
        const email = req.query.email;
        let existPartnerEmail = await partnerLoginModel.findOne({
            where: {
                email: email
            }
        })

        if(existPartnerEmail) {
            res.json({
                response : false,
                message : "Email already exists"
            })
        } else {
            next();
        }
    }
    catch(err){
        console.log(err)
        res.json({
            response : true,
            message : "Something went wrong"
        })
    }
}

module.exports = partnerEmailExists