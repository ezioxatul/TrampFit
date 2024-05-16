const membershipDetailsModel = require('../Models/membershipModel.config');
const userSignupModel = require('../Models/signUpModel');
const paymentHistoryModel = require('../Models/paymentDetailModel');
const partnerLoginModel = require('../Models/partnerLoginModel');
const { where, Op } = require("sequelize");
const sequelize = require("../databaseConnection");
const { response } = require('express');

// admin Token Check...

const adminTokenCheckController = (req, res) => {
    try {
        res.json({
            response: true,
            message: "Valid Token"
        })
    } catch (err) {
        res.json({
            response: false,
            message: "Something went wrong !!"
        })
    }
}

const getAllCountController = async(req,res) => {
    try {

        let totalUsers = await userSignupModel.count();
        let totalPartners = await partnerLoginModel.count();    
        let activeMembers = await paymentHistoryModel.count({
            where : {
                status : "active"
            }
        })
        res.json({
            message : "counts",
            response : true,
            totalUsers,
            totalPartners,
            activeMembers
        });
    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false  
        })
    }
}

// add Membership API

const addMembershipController = async (req, res) => {
    try {

        let { membershipName, amount, validity, session, description } = req.body;

        await membershipDetailsModel.create({
            membershipName,
            amount,
            validity,
            session,
            description,
            status: "Active"
        })

        res.json({
            message: "Added Membership Successfully",
            response: true
        })

    } catch (err) {

        console.log(err);
        res.json({
            message: "Something went wrong !!",
            response: false
        })

    }
}


// Fetch all membership plan

const getAllMembershipDetailsController = async (req, res) => {
    try {

        let membershipDetails = await membershipDetailsModel.findAll({
            attributes: ['membershipName', 'amount', 'validity', 'description', 'status', 'id','session'],
            order: sequelize.col('id')
        });

        if (membershipDetails) {

            res.json({
                message: "Membership details send",
                response: true,
                data: membershipDetails
            })

        } else {

            res.json({
                message: "Data does get Properly",
                response: false
            })

        }
    } catch (err) {

        console.log(err)

        res.json({
            message: "Something went wrong !!",
            response: false
        })

    }
}


// update the membership plan

const updateMembershipController = async (req, res) => {
    try {
        let id = req.query.id;
        let { membershipName, amount, validity, session, description } = req.body;


        await membershipDetailsModel.update({
            membershipName,
            amount,
            validity,
            session,
            description
        }, {
            where: {
                id: id
            }
        })

        res.json({
            message: "Plan Updated Successfully",
            response: true
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}


// delete the membership (making the plan status to Inactive)

const deleteMembershipController = async (req, res) => {

    try {
        let id = req.query.id;

        await membershipDetailsModel.update(
            { status: 'Deactivated' },
            {
                where: {
                    id: id
                }
            }
        )

        res.json({
            message: "The plan is No more Active",
            response: true
        })
    } catch (err) {
        console.log(err)

        res.json({
            message: "Something went wrong !!",
            response: true
        })

    }
}

// display user information on the admin Portal
const getUserInfoController = async (req, res) => {
    try {
        let userInfo = await userSignupModel.findAll({
            attributes: ['id', 'fullName', 'city', 'mobileNumber', 'email'],
            order: sequelize.col('id')
        })

        res.json({
            message: "User Information",
            response: true,
            data: userInfo
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// apply search on user info on the admin portal
const searchUserController = async (req, res) => {
    try {

        let searchText = req.query.searchText;

        let userInfo = await userSignupModel.findAll({
            attributes: ['id', 'fullName', 'city', 'mobileNumber', 'email'],
            where: {
                [Op.or]: [
                    {
                        fullName: {
                            [Op.iLike]: `%${searchText}%`
                        }
                    },
                    {
                        city: {
                            [Op.iLike]: `%${searchText}%`
                        }
                    },
                    {
                        email: {
                            [Op.iLike]: `%${searchText}%`
                        }
                    },
                    sequelize.where(sequelize.cast(sequelize.col('mobileNumber'), 'VARCHAR'), {
                        [Op.iLike]: `%${searchText}%`
                    })
                ]
            },
            order: sequelize.col('id')
        })

        res.json({
            message: "Search User Information",
            response: true,
            data: userInfo
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// view membership detail of individual users

const getUserMembershipDetailController = async (req, res) => {
    try {

        let userId = req.query.id;

        let getMembershipData = await userSignupModel.findAll({
            include: [
                {
                    model: paymentHistoryModel,
                    attributes: ['subscriptionId', 'subscriptionName', 'paidAmount', 'startDate', 'endDate', 'status', 'downloadInvoice'],
                    as: 'paymentInfo',
                    order : sequelize.col('id')
                }
            ],
            attributes: [],
            where: {
                id: userId
            },
            order : sequelize.col('id')
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

// view active membership of indevidual user
const getUserActiveMembershipController = async (req, res) => {
    try {

        let userId = req.query.id;

        let getMembershipData = await userSignupModel.findAll({
            include: [
                {
                    model: paymentHistoryModel,
                    attributes: ['subscriptionId', 'subscriptionName', 'paidAmount', 'startDate', 'endDate', 'status', 'downloadInvoice'],
                    as: 'paymentInfo',
                    where : {
                        status : 'active'
                    }
                }
            ],
            attributes: [],
            where: {
                id: userId
            }
        })

        if(getMembershipData.length === 0) {
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

// filter user membership information
const filterUserMembershipController = async(req,res) => {
    try {

        let userId = req.query.userId;
        let filterMembershipData = Object.values(req.query);
        filterMembershipData.pop();

        let getUserFilterMembershipData = await userSignupModel.findAll({
            include : [
                {
                    model : paymentHistoryModel,
                    attributes : ['subscriptionId', 'subscriptionName', 'paidAmount', 'startDate', 'endDate', 'status', 'downloadInvoice'],
                    as : "paymentInfo",
                    where : {
                        subscriptionName : {
                            [Op.in] : filterMembershipData
                        }   
                    }
                }
            ],
            attributes : [],
            where : {
                id : userId
            }
        })

        if(getUserFilterMembershipData.length > 0) {

            res.json({
                message : "Filter membership information",
                response : true,
                data : getUserFilterMembershipData
            });

        } else {
            let obj = {
                paymentInfo : []
            }

            getUserFilterMembershipData.push(obj);

            res.json({
                message : "Filter membership information",
                response : true,
                data : getUserFilterMembershipData
            });

        }

        

    } catch(err) {
        console.log(err);

        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}

// display partners information on the admin portal
const getPartnerInfoController = async (req, res) => {
    try {
        let partnerInfo = await partnerLoginModel.findAll({
            attributes: ['id', 'fullName', 'mobileNumber', 'email', 'status'],
            order: sequelize.col('id')
        })

        res.json({
            message: "Partner Information",
            response: true,
            data: partnerInfo
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

// apply search on partner info on the admin portal
const searchPartnerController = async (req, res) => {
    try {

        let searchText = req.query.searchText;

        let searchPartner = await partnerLoginModel.findAll({
            attributes: ['id', 'fullName', 'mobileNumber', 'email', 'status'],
            where: {
                [Op.or]: [
                    sequelize.where(sequelize.cast(sequelize.col('mobileNumber'), 'VARCHAR'), {
                        [Op.iLike]: `%${searchText}%`
                    }),
                    {
                        fullName: {
                            [Op.iLike]: `%${searchText}%`
                        }
                    },

                    {
                        email: {
                            [Op.iLike]: `%${searchText}%`
                        }
                    }

                ]
            },
            order: sequelize.col('id')
        })

        res.json({
            message: "Search Partner Info",
            response: true,
            data: searchPartner
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

const filterPartnerController = async (req, res) => {
    try {

        let filterInfo = Object.values(req.query);

        let partnerFilterData = await partnerLoginModel.findAll({
            attributes: ['id', 'fullName', 'mobileNumber', 'email', 'status'],
            where: {
                status: {
                    [Op.in]: filterInfo
                }
            }
        })

        res.json({
            message: "Data filtered Successfully",
            response: true,
            data: partnerFilterData
        })

    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        });
    }
}

// payment History

// 1. get All payment Details

const getAllPaymentHistoryController = async (req, res) => {
    try {


        let getAllPaymentData = await userSignupModel.findAll({
            include: [
                {
                    model: paymentHistoryModel,
                    attributes: ['id', 'paidAmount', 'startDate', 'invoiceNumber', 'downloadInvoice', 'invoiceId', 'status'],
                    as: 'paymentInfo'
                }
            ],
            attributes: ['id', 'fullName', 'email'],
            where: {
                MembershipId: {
                    [Op.ne]: null
                }
            }
        })

        res.json({
            message: "Payment History",
            response: true,
            data: getAllPaymentData
        })


    } catch (err) {
        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

// 2. apply searching in payment history
const paymentHistorySearchController = async (req, res) => {
    try {

        let { searchTransaction } = req.query;

        let getSearchPaymentData = await userSignupModel.findAll({
            include: [
                {
                    model: paymentHistoryModel,
                    attributes: ['id', 'paidAmount', 'startDate', 'invoiceNumber', 'downloadInvoice', 'invoiceId', 'status'],
                    as: 'paymentInfo'
                }
            ],
            attributes: ['id', 'fullName', 'email'],
            where: {
                [Op.and]: [{
                    MembershipId: {
                        [Op.ne]: null
                    }
                }, {
                    [Op.or]: [
                        {
                            fullName: {
                                [Op.iLike]: `%${searchTransaction}%`
                            }
                        },
                        {
                            '$paymentInfo.invoiceId$': {
                                [Op.iLike]: `%${searchTransaction}%`
                            }
                        },
                        {
                            '$paymentInfo.invoiceNumber$': {
                                [Op.iLike]: `%${searchTransaction}%`
                            }
                        }
                    ]
                }
                ]
            }
        })

        res.json({
            message : "search Data",
            response : true,
            data : getSearchPaymentData
        })

    } catch (err) {

        console.log(err);

        res.json({
            message: "Something went wrong !!",
            response: false
        })
    }
}

module.exports = {
    adminTokenCheckController,
    getAllCountController,
    addMembershipController,
    getAllMembershipDetailsController,
    updateMembershipController,
    deleteMembershipController,
    getPartnerInfoController,
    getUserInfoController,
    searchPartnerController,
    searchUserController,
    filterPartnerController,
    getAllPaymentHistoryController,
    paymentHistorySearchController,
    getUserMembershipDetailController,
    getUserActiveMembershipController,
    filterUserMembershipController
}