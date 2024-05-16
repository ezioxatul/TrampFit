const express = require('express');
const router = express.Router();
const gymDetailsController = require('../Controller/gymDetailsController');
const partnerSecretKey = require('../MiddleWares/partnerSecretKey')
const jwtVerification = require('../MiddleWares/jwtVerification')
const fileUpload = require('../helper/fileUpload')
const uploadFunction = fileUpload.fields([{ name: 'gymLogo' }, { name: 'interiorPhoto' }, { name: 'panImage' }])

//Getting Gym Details
router.post('/gymDetails', partnerSecretKey, jwtVerification, uploadFunction , gymDetailsController.getGymDetailsController);

//checking for token
router.get('/partnerTokenCheck',partnerSecretKey,jwtVerification,gymDetailsController.tokenCheckController);

module.exports = router;