const express = require('express');
const membershipController = require('../Controller/membershipController');
const userSecretKey = require('../MiddleWares/userSecretKey');
const jwtVerification = require('../MiddleWares/jwtVerification');
const getUserEmail = require('../MiddleWares/getUserEmail');

const router = express.Router();



// get All Active membership
router.get('/getActiveMembership',membershipController.getActiveMembershipController);

// payment gateway routes 

// 1. create subscription
router.post('/createSubscription',userSecretKey,jwtVerification,getUserEmail,membershipController.createSubscriptionModelController);

// 2. handling plan Cancellation
router.delete('/cancelSubscription',membershipController.cancelSubscriptionController);

// 3.  claim sessions 
router.put('/claimSessions',userSecretKey,jwtVerification,membershipController.claimSessionController);

// 4. handle webhooks events 
router.post('/handleWebhooks',membershipController.handleWebhookController);



module.exports = router;