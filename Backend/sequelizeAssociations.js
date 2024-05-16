const sequelize = require('./databaseConnection');
const partnerLoginModel = require('./Models/partnerLoginModel');
const gymDetailsModel = require('./Models/gymDetailsModel');
const userSignupModel = require('./Models/signUpModel')
const paymentDetailModel = require('./Models/paymentDetailModel');


const sequelizeAssociations =  () => {
    // paymentDetail to userSignupModel
    paymentDetailModel.hasMany(userSignupModel, { foreignKey: "MembershipId", as: "userInfo" });
    userSignupModel.belongsTo(paymentDetailModel, { foreignKey: "MembershipId", as: "userInfo" });

    userSignupModel.hasMany(paymentDetailModel, { foreignKey: "userId", as: "paymentInfo",onDelete : "CASCADE" });
    paymentDetailModel.belongsTo(userSignupModel, { foreignKey: "userId", as: "paymentInfo" });

    partnerLoginModel.hasOne(gymDetailsModel, { foreignKey: "partnerId", as: "gymInfo" });
    gymDetailsModel.belongsTo(partnerLoginModel, { foreignKey: "partnerId", as: "gymInfo" });
}

sequelize.sync({ alter: false }).then((res) => {
    console.log("payment  Table created successfully");
}).catch((err) => {
    console.log(err);
    console.log("Some error has been occur while creating relation");
})


module.exports = sequelizeAssociations;