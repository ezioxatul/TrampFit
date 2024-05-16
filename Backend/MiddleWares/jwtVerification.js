const jwt = require('jsonwebtoken');

const jwtVerification = (req,res,next) => {
    try{
        let token = req.headers["authorization"];
        token = token.split('Bearer ');
        token = token[1];

        const verify = jwt.verify(token,req.secretKey);
        
        if(verify){
            req.userDetails = verify;
            next();
        } else {
            res.json({
                message : "Invalid Token !!",
                response : false
            })
        }
    } catch(err) {
        res.json({
            message : "Something went wrong !!",
            response : false
        })
    }
}

module.exports = jwtVerification