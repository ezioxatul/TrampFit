const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');

const membershipDetails = sequelize.define('membershipDetails', {
    // Model attributes are defined here
    membershipName : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    } , 
    amount : {
        type : DataTypes.INTEGER,
        required : true,
        allowNull : false
    } , 

    validity : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    } ,
    session : {
        type : DataTypes.INTEGER,
        required : true,
        allowNull : false
    } ,

    description : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    } , 
    status : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false   
    }

}, {
    freezeTableName: true
});


membershipDetails.sync({ force: false }).then((res) => {
    console.log("membership details Table Has Been created Successfully");
}).catch((err) => {
    console.log("Some Error Has Been Occur");
})

module.exports = membershipDetails