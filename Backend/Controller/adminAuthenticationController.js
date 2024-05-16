const generateToken = require('../helper/generateToken');

const validAdminLoginController = (req,res) =>{
    try{
        let token = generateToken({
            adminUsername : req.user.username
        },process.env.admin_secret_key);

        res.json({
            response : true,
            token : token,
            message : "Admin Login Successfully"
        })

    } catch(err) {  
        console.log(err);
        res.json({
            response : false,
            message : "Something went wrong"
        })
    }
}

const invalidAdminLoginController = (req,res) =>{
    try{
        res.json({
            response : false,
            message : "invalid Admin Credential"
        })
    } catch(err){
        console.log(err);
        res.json({
            response : false,
            message : "Something went wrong"  
        })
    }
}

module.exports = {
    invalidAdminLoginController,
    validAdminLoginController
}