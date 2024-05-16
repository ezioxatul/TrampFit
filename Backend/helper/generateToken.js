const jwt = require('jsonwebtoken');


const generateToken = (payloadData,user_secret_key)=>{
    let token =  jwt.sign({payloadData : payloadData},user_secret_key,{
        expiresIn:'30d'
    });

    return token;
}

module.exports = generateToken;