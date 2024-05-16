
const passingPartnerSecretKey = (req,res,next) =>{
    try{
        req.secretKey = process.env.partner_secret_key;
        next();
    } catch (err) {
        res.json({
            response : false,
            message : "Something went wrong !!"
        })
    }
}

module.exports = passingPartnerSecretKey;