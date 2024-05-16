const express = require('express');
const adminSecretKey = require('../MiddleWares/adminSecretKey');
const jwtVerification = require('../MiddleWares/jwtVerification');
const adminDashboardController = require('../Controller/adminDashboardController');
const membershipLimitCheck = require('../MiddleWares/membershipLimitCheck');
const deactivateMembershipLimitCheck = require('../MiddleWares/deactivateMembershipLimitCheck');
const router = express.Router();


router.get('/adminDashboard',adminSecretKey,jwtVerification,adminDashboardController.adminTokenCheckController);


// adminDashboard 
router.get('/adminDashboard/count',adminSecretKey,jwtVerification,adminDashboardController.getAllCountController);

// adminDashboard -> Users

// 1. get all Users Information
router.get('/adminDasboard/getUserInfo',adminSecretKey,jwtVerification,adminDashboardController.getUserInfoController);

// 2. Search the user
router.get('/adminDashboard/searchUser',adminDashboardController.searchUserController);

// 3. user view details 
router.get('/adminDashboard/user/getUserMembershipDetail',adminSecretKey,jwtVerification,adminDashboardController.getUserMembershipDetailController);

// 4. get active user membership in view detail
router.get('/adminDashboard/user/getUserActiveMembership',adminSecretKey,jwtVerification,adminDashboardController.getUserActiveMembershipController);

// 5. apply filter on individual user membership
router.get('/adminDashboard/user/filterUserMembership',adminDashboardController.filterUserMembershipController);

// adminDashboard -> Partners

// 1. get all partners information
router.get('/adminDashboard/getPartnersInfo',adminSecretKey,jwtVerification,adminDashboardController.getPartnerInfoController);

// 2. searching the partner
router.get('/adminDashboard/searchPartner',adminDashboardController.searchPartnerController);

// 3. apply filter on partners Data

router.get('/adminDashboard/filterPartner',adminDashboardController.filterPartnerController);

//adminDashboard ->  manage Membership

// token check
router.get('/adminDashboard/manageMembership',adminSecretKey,jwtVerification,adminDashboardController.adminTokenCheckController);

// 1. add Membership
router.post('/adminDashboard/manageMembership/addMembership',adminSecretKey,jwtVerification,membershipLimitCheck,adminDashboardController.addMembershipController);


// 2. get Membership Details
router.get('/adminDashboard/manageMembership/getMembershipDetails',adminDashboardController.getAllMembershipDetailsController);

// 3. update membership Details
router.put('/adminDashboard/manageMembership/updateMembership',adminSecretKey,jwtVerification,adminDashboardController.updateMembershipController)

// 4. Delete membership Details (making status active to INactive)
router.put('/adminDashboard/manageMembership/deleteMembership',adminSecretKey,jwtVerification,deactivateMembershipLimitCheck,adminDashboardController.deleteMembershipController);

//adminDashboard ->  payment History

// 1. get all payment Detail
router.get('/adminDashboard/paymentHistory',adminSecretKey,jwtVerification,adminDashboardController.getAllPaymentHistoryController);

// 2. search the payment history
router.get('/adminDashboard/paymentHistory/searchTransaction',adminDashboardController.paymentHistorySearchController);

module.exports = router;