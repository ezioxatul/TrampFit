
const signupModel = require('../Models/signUpModel');
const paymentDetailModel = require('../Models/paymentDetailModel');
const stripeMethod = require('../helper/stripeFunction');
const sessionBookingModel = require('../Models/sessionBookingModel');
const gymDetailModel = require('../Models/gymDetailsModel');
const sessionTimeModel = require('../Models/sessionModel');

const sequelize = require('../databaseConnection');
const { where } = require('sequelize');

const userDashboardAuthenticationController = (req, res) => {
    try {
        res.json({
            message: "User Authenticated Successfully",
            response: true
        })
    }

    catch (err) {
        res.json({
            message: "Something went Wrong!!",
            response: false
        })
    }
}



const getUserPersonalDetailController = async (req, res) => {
    try {
        let mobileNumber = parseInt(req.userDetails.payloadData.mobileNumber);
        let personalInfo = await signupModel.findOne({
            attributes: ['fullName', 'city', 'email', 'mobileNumber'], where: {
                mobileNumber: mobileNumber
            }
        })

        personalInfo = JSON.parse(JSON.stringify(personalInfo))

        res.json({
            message: "Sending User personal Info",
            response: true,
            personalInfo: personalInfo
        })

    } catch (err) {
        res.json({
            message: "Something went wrong",
            response: false
        })
    }
}


const deleteUserInfoController = async (req, res) => {
    try {
        let mobileNumber = parseInt(req.userDetails.payloadData.mobileNumber);

        let subscriptionInfo = await signupModel.findOne({
            include: [
                {
                    model: paymentDetailModel,
                    attributes: ['subscriptionId'],
                    as: "paymentInfo",
                    where: {
                        status: "active"
                    }
                }
            ],
            attributes: [],
            where: {
                mobileNumber: mobileNumber
            }
        })

        let subscriptionId = subscriptionInfo.paymentInfo[0].subscriptionId

        let cancelSubscription = await stripeMethod.cancelSubscription(subscriptionId);
        if (cancelSubscription) {

            await signupModel.destroy({
                where: {
                    mobileNumber: mobileNumber
                }
            })

            res.json({
                message: "Data has been Deleted",
                response: true
            })
        }



    } catch (err) {
        console.log(err);
        
        res.json({
            message: "Something went wrong",
            response: false
        })
    }
}

const tokenCheckController = (req, res) => {
    try {
        res.json({
            message: "Valid User",
            response: true
        })
    } catch (err) {
        res.json({
            message: "Something went wrong",
            response: false
        })
    }
}

const getMembershipDetailController = async (req, res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let getMembershipData = await signupModel.findAll({
            include: [
                {
                    model: paymentDetailModel,
                    attributes: ['subscriptionId', 'subscriptionName', 'paidAmount', 'startDate', 'endDate', 'status', 'downloadInvoice'],
                    as: 'paymentInfo',
                    order: sequelize.col('id')
                }
            ],
            attributes: [],
            where: {
                mobileNumber: mobileNumber
            },
            order: sequelize.col('id')
        })

        res.json({
            message: "Membership Information",
            response: true,
            data: getMembershipData
        })

    } catch (err) {
        console.log(err);
        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}


const getActiveMembershipController = async (req, res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let getMembershipData = await signupModel.findAll({
            include: [
                {
                    model: paymentDetailModel,
                    attributes: ['subscriptionId', 'subscriptionName', 'paidAmount', 'startDate', 'endDate', 'status', 'downloadInvoice'],
                    as: 'paymentInfo',
                    where: {
                        status: 'active'
                    }
                }
            ],
            attributes: [],
            where: {
                mobileNumber: mobileNumber
            }
        })

        if (getMembershipData.length === 0) {
            res.json({
                message: "No Active Membership",
                response: false
            })
        }
        else {

            res.json({
                message: "Active Membership",
                response: true,
                data: getMembershipData
            })

        }

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false,
        })
    }
}


const getSessionInfoController = async (req, res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let getUserSessionHistory = await sessionBookingModel.findAll({
            include: [
                {
                    model: signupModel,
                    attributes: [],
                    as: 'userDetails'
                },
                {
                    model: sessionTimeModel,
                    attributes: ['sessionTiming'],
                    as: "sessionInfo",
                    include: [
                        {
                            model: gymDetailModel,
                            attributes: ['gymName', 'gymCity'],
                            as: 'gymDetails'
                        }
                    ]
                }
            ],
            attributes: ['bookingDate', 'id'],
            where: {
                '$userDetails.mobileNumber$': mobileNumber
            },
            order: sequelize.col('bookingDate')
        })

        res.json({
            message: "User Session Information",
            response: true,
            data: getUserSessionHistory
        });

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

const getLastSessionBookedController = async (req, res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let getUserSessionHistory = await sessionBookingModel.findOne({
            include: [
                {
                    model: signupModel,
                    attributes: [],
                    as: 'userDetails'
                },
                {
                    model: sessionTimeModel,
                    attributes: ['sessionTiming'],
                    as: "sessionInfo",
                    include: [
                        {
                            model: gymDetailModel,
                            attributes: ['gymName', 'gymCity'],
                            as: 'gymDetails'
                        }
                    ]
                }
            ],
            attributes: ['bookingDate', 'id'],
            where: {
                '$userDetails.mobileNumber$': mobileNumber
            },
            order: [['createdAt', 'DESC']]
        })

        res.json({
            message: "Last session booked..",
            response: true,
            data: getUserSessionHistory
        });

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

module.exports = {
    userDashboardAuthenticationController,
    getUserPersonalDetailController,
    deleteUserInfoController,
    tokenCheckController,
    getMembershipDetailController,
    getActiveMembershipController,
    getSessionInfoController,
    getLastSessionBookedController
}