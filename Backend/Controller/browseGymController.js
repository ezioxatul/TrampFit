const partnerLoginModel = require('../Models/partnerLoginModel');
const gymDetailsModel = require('../Models/gymDetailsModel');
const userSignupModel = require('../Models/signUpModel');
const sessionBookingModel = require('../Models/sessionBookingModel')
const feedbackModel = require('../Models/feedbackModel');
const sessionModel = require('../Models/sessionModel');
const sequelize = require('../databaseConnection');
const transporter = require('../helper/sendEmailVerification');
const pug = require('pug');
const { Op, where } = require('sequelize');


// get all browse Data
const getAllGymDetailsController = async (req, res) => {
    try {

        let getBrowseGymData = await gymDetailsModel.findAll({
            include: [
                {
                    model: partnerLoginModel,
                    attributes: [],
                    as: 'partnerInfo'
                }
            ],
            attributes: ['id', 'gymName', 'gymLocation', 'gymCity', 'gymLogo', 'gymDescription'],
            where: {
                '$partnerInfo.status$': "Approved"
            },
            order: sequelize.col('id')
        })

        res.json({
            message: "Browse Gym Data",
            response: true,
            data: getBrowseGymData
        });

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went Wrong !!",
            response: false
        })

    }
}

// get individual browse gym Data
const getGymViewDetailController = async (req, res) => {
    try {

        let { gymId } = req.query;

        let getGymData = await gymDetailsModel.findOne({
            include: [
                {
                    model: partnerLoginModel,
                    attributes: [],
                    as: 'partnerInfo'
                }
            ],
            attributes: ['gymName', 'gymLocation', 'gymCity', 'openingTime', 'closingTime', 'gymLogo', 'interiorPhoto', 'gymDescription', 'gymQuestion', 'amenities'],
            where: {
                [Op.and]: [
                    {
                        '$partnerInfo.status$': "Approved"
                    },
                    {
                        id: gymId
                    }
                ]
            }
        })

        let reviewsCount = await feedbackModel.count({
            where : {
                gymId : gymId
            }
        })

        res.json({
            message: "Gym detail",
            response: true,
            data: getGymData,
            reviewsCount : reviewsCount
        });

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

// apply search on browse gym
const searchGymController = async (req, res) => {
    try {

        let { searchText } = req.query;

        let getSearchData = await gymDetailsModel.findAll({
            include: [
                {
                    model: partnerLoginModel,
                    attributes: [],
                    as: 'partnerInfo'
                }
            ],
            attributes: ['id', 'gymName', 'gymLocation', 'gymCity', 'gymLogo', 'gymDescription'],
            where: {
                [Op.and]: [
                    {
                        '$partnerInfo.status$': "Approved"
                    },
                    {
                        [Op.or]: [
                            {
                                gymName: {
                                    [Op.iLike]: `%${searchText}%`
                                }
                            },
                            {
                                gymCity: {
                                    [Op.iLike]: `%${searchText}%`
                                }
                            },
                            {
                                gymLocation: {
                                    [Op.iLike]: `%${searchText}%`
                                }
                            }
                        ]
                    }
                ]
            }
        })


        res.json({
            response: true,
            message: "Search Data",
            data: getSearchData
        })


    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// get session Slots

const getSessionSlotsTimingController = async (req, res) => {
    try {

        let { gymId, date } = req.query;

        let currentTimeZone = new Date();
        let currentTime;
        let currentDate = currentTimeZone.getDate().toString();
        if (currentTimeZone.getHours() < 10) {
            currentTime = `0${currentTimeZone.getHours()}:${currentTimeZone.getMinutes()}`;
        } else {
            currentTime = `${currentTimeZone.getHours()}:${currentTimeZone.getMinutes()}`;

        }

        let getDate = date.split('/');

        if (currentDate === getDate[0]) {
            console.log(currentTime)

            let getSlotData = await sessionModel.findAll({
                attributes: ['id', 'sessionTiming', 'date'],
                where: {
                    [Op.and]: [
                        {
                            date: date
                        },
                        {
                            gymId: gymId
                        },
                        {
                            sessionTiming: {
                                [Op.gt]: currentTime
                            }
                        }
                    ]
                },
                order: sequelize.col('sessionTiming')
            })

            res.json({
                message: "Slot Timing",
                response: true,
                data: getSlotData
            })

        } else {

            let getSlotData = await sessionModel.findAll({
                attributes: ['id', 'sessionTiming', 'date'],
                where: {
                    [Op.and]: [
                        {
                            date: date
                        },
                        {
                            gymId: gymId
                        }
                    ]
                },
                order: sequelize.col('sessionTiming')
            })

            res.json({
                message: "Slot Timing",
                response: true,
                data: getSlotData
            })

        }
    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

// slot booking
const bookedSlotController = async (req, res) => {
    try {

        let { sessionId, date, time } = req.body;
        let userId = req.information.userInfo.id;
        let userEmail = req.information.userInfo.email;
        let userSessionCount = req.information.userInfo.totalSession;
        let sessionCapacity = req.information.partnerInfo.sessionCount;
        let gymName = req.information.partnerInfo.gymDetails.gymName;
        let userName = req.information.userInfo.fullName;

        let partnerId = req.information.partnerInfo.gymDetails.partnerInfo.id;

        await sessionBookingModel.create({
            bookingDate: date,
            userId: userId,
            sessionId: sessionId,
            partnerId : partnerId
        })

        await userSignupModel.update({ totalSession: userSessionCount - 1 }, {
            where: {
                id: userId
            }
        })

        await sessionModel.update({ sessionCount: sessionCapacity - 1 }, {
            where: {
                id: sessionId
            }
        })

        // user session booked notification
        let htmlContentForUserSessionBooking = pug.renderFile('emailTemplate/userBookingConfirmation.pug', { sessionId: sessionId, date: date, gymName: gymName, sessionTiming: time, userName: userName });

        const info = await transporter.sendMail({
            from: '"Trampfit" <trampfit180@gmail.com>',
            to: userEmail,
            subject: "Booking Confirmation",
            html: htmlContentForUserSessionBooking
        });


        res.json({
            message: "Session Booked Successfully",
            response: true
        })

    } catch (err) {
        console.log(err);
        res.json({
            message: "Something went wrong!!",
            response: false
        })
    }
}

// apply filter on the basis of amenities
const amenitiesFilterController = async (req, res) => {
    try {

        let filterArray = Object.values(req.query);

        let getFilterData = await gymDetailsModel.findAll({
            include: [
                {
                    model: partnerLoginModel,
                    attributes: [],
                    as: 'partnerInfo'
                }
            ],

            attributes: ['id', 'gymName', 'gymLocation', 'gymCity', 'gymLogo', 'gymDescription'],
            where: {
                [Op.and]: [
                    {
                        '$partnerInfo.status$': "Approved"
                    },
                    {
                        amenities: {
                            [Op.overlap]: filterArray
                        }
                    }
                ]
            }
        })

        res.json({
            message: "Filtered Data",
            response: true,
            data: getFilterData
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

const cityFilterController = async (req, res) => {
    try {

        let { cityName } = req.query

        let getFilterData = await gymDetailsModel.findAll({
            include: [
                {
                    model: partnerLoginModel,
                    attributes: [],
                    as: 'partnerInfo'
                }
            ],

            attributes: ['id', 'gymName', 'gymLocation', 'gymCity', 'gymLogo', 'gymDescription'],
            where: {
                [Op.and]: [
                    {
                        '$partnerInfo.status$': "Approved"
                    },
                    {
                        gymCity : cityName  
                    }
                ]
            }
        })

        res.json({
            message: "City filter Data",
            response: true,
            data: getFilterData
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// check userBooking
const checkBookingController = async(req,res) => {
    try {

        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let checkData = await sessionBookingModel.findAll({
            include : [
                {
                    model : userSignupModel,
                    attributes : [],
                    as : "userDetails"
                },
                {
                    model :    sessionModel,
                    attributes : ['gymId'],
                    as : "sessionInfo"
                }
            ],
            attributes : [],
            where : {
                '$userDetails.mobileNumber$' : mobileNumber
            }
        })

            res.json({
                message : "Booking Exists",
                response : true,
                data : checkData
            })
    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong!!",
            response : false
        })
    }
}

// add user feedback

const addFeedbackController = async(req,res) => {
    try {
         
        let mobileNumber = req.userDetails.payloadData.mobileNumber;

        let {gymId,ratings,feedbackMessage} = req.body;

        let userId = await userSignupModel.findOne({
            attributes : ['id'],
            where : {
                mobileNumber : mobileNumber
            }
        })

        await feedbackModel.create({
            userId : userId.id,
            gymId : gymId,
            ratings : ratings,
            feedbackMessage : feedbackMessage
        });

        res.json({
            message : "User Review Added Successfully",
            response : true
        })

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}


const getUserReviewsController = async(req,res) => {
    try {

        let {gymId,limit} = req.query;

        let getReviews = await feedbackModel.findAll({
            include : [
                {
                    model : userSignupModel,
                    attributes : ['fullName'],
                    as : 'userViews'
                }  
            ],
            attributes : ['ratings','feedbackMessage','createdAt'],
            where : {
                gymId : gymId
            },
            limit : limit
        })

        res.json({
            message : "Gym reviews",
            response : true,
            data : getReviews
        })

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}


module.exports = {
    getAllGymDetailsController,
    getGymViewDetailController,
    searchGymController,
    getSessionSlotsTimingController,
    bookedSlotController,
    amenitiesFilterController,
    cityFilterController,
    checkBookingController,
    addFeedbackController,
    getUserReviewsController
}