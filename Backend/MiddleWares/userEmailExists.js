const userSignModel = require('../Models/signUpModel');

const userEmailExists = async (req, res, next) => {

    try {
        const email = req.query.email;
        let existUserEmail = await userSignModel.findOne({
            where: {
                email: email
            }
        })

        if(existUserEmail) {

            res.json({
                response : false,
                message : "Email already exists"
            })

        } else {
            next();
        }

    } catch(err) {
        console.log(err)

        res.json({
            response : true,
            message : "Something went wrong"
        })
    }
    
}


module.exports = userEmailExists