const express = require('express');
const adminLoginModel = require('../Models/adminLogin.config');
const adminAuthenticationController = require('../Controller/adminAuthenticationController');
const startPassportLocalAuthentication = require('../helper/passportLocalAuthentication')
const passport = require('passport');
const router = express.Router();

router.use(passport.initialize());
startPassportLocalAuthentication(passport,adminLoginModel);
// Authenticate Admin Login

router.post('/adminLogin',passport.authenticate('local',{session:false,failureRedirect:'/invalidAdminLogin'}),adminAuthenticationController.validAdminLoginController);

router.get('/invalidAdminLogin',adminAuthenticationController.invalidAdminLoginController);

module.exports = router