const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const startedPassportLocalAuthentication = async (passport, databaseModel) => {
    passport.use(new LocalStrategy(
        async function (username, password, done) {
            let adminCredential = await databaseModel.findOne({
                attributes: ['username', 'password'], where: {
                    username: username
                }
            })

            adminCredential = JSON.parse(JSON.stringify(adminCredential));

            if(!adminCredential) return done(null,false);

            else {
                let result = await bcrypt.compare(password,adminCredential.password);
                if(result) {
                    return done(null,adminCredential);
                } else {
                    return done(null,false);
                }
            }

        }
    ));
}


module.exports = startedPassportLocalAuthentication