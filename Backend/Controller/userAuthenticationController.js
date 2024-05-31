const signupModel = require('../Models/signUpModel');
const generateToken = require('../helper/generateToken');
const generateUserAvtar = require('../helper/generateUserAvtar');
const transporter = require('../helper/sendEmailVerification');
const pug = require('pug');
// inserting user Data Inside Database
const userLoginController = async (req, res) => {
    try {

        let fullName = req.body.fullName
        let mobileNumber = req.body.mobileNumber
        let email = req.body.email
        let gender = req.body.gender
        let city = req.body.city

        console.log(req.body)

        let data = await signupModel.create({
            fullName: fullName,
            mobileNumber: mobileNumber,
            email: email,
            gender: gender,
            city: city
        })

        let token = generateToken({
            mobileNumber: data.mobileNumber,
            fullName: data.fullName
        }, process.env.user_secret_key);

        fullName = generateUserAvtar(fullName);

        res.json({
            message: "Signup Successfully",
            avtar: fullName,
            token: token,
            response: true
        })

    } catch (err) {
        console.log(err)

        res.json({
            message: "SomeThing Went Wrong !!",
            error: err,
            response: false
        })

    }
}

// root level authentication

const rootAuthenticationController = (req, res) => {
    try {

        let fullName = req.userDetails.payloadData.fullName;
        fullName = generateUserAvtar(fullName);

        res.json({

            message: "Sending Name",
            avtar: fullName,
            response: true

        })

    } catch (err) {
        console.log(err)
        res.json({
            message: "Something went Wrong !!",
            response: false
        })

    }
}


// Checking  that the user is exists or not

const userExistsController = async (req, res) => {
    try {
        let { mobileNumber } = req.query;

        let userInfo = await signupModel.findOne({
            attributes: ['fullName'], where: {
                mobileNumber: mobileNumber
            }
        })

        userInfo = JSON.parse(JSON.stringify(userInfo));

        if (userInfo != undefined) {

            let fullName = userInfo.fullName

            let token = generateToken({
                fullName: fullName,
                mobileNumber: mobileNumber
            }, process.env.user_secret_key)

            fullName = generateUserAvtar(fullName);

            res.json({
                message: "User already exists",
                response: true,
                token: token,
                avtar: fullName
            })

        } else {
            res.json({
                message: "User does not exists",
                response: false
            })
        }

    } catch (err) {
        res.json({
            message: "Something went wrong!!",
            response: false
        })
    }
}


const emailVerificationController = async (req, res) => {
    try {
        const receiverEmail = req.query.email;

        let htmlContent = pug.renderFile('emailTemplate/userEmailVerification.pug');

        const info = await transporter.sendMail({
            from: '"Trampfit" <trampfit180@gmail.com>',
            to: receiverEmail,
            subject: "Email verification",
            html: htmlContent
        });

        if (info) {

            res.json({
                response: true,
                message: "Email send successfully"
            })

        } else {

            res.json({
                response: false,
                message: "Email has not been send"
            })

        }

    } catch (err) {
        console.log(err)
        res.json({
            response: false,
            message: "Something went wrong"
        })
    }

}


const sendOtpController = async (req, res) => {
    try {

       
    } catch (err) {
        console.log(err);

        res.json({
            message: "Something Went wrong !!",
            response: false
        });
    }
}


module.exports = {
    userLoginController: userLoginController,
    rootAuthenticationController: rootAuthenticationController,
    userExistsController: userExistsController,
    emailVerificationController: emailVerificationController,
    sendOtpController
}