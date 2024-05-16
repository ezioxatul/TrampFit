const sequelize = require('../databaseConnection');
const {DataTypes} = require('sequelize');

const adminCredential = sequelize.define('adminCredential', {
    // Model attributes are defined here
    username : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        required : true,
        allowNull : false
    }
  }, {
    freezeTableName : true
  });


  adminCredential.sync({force:false}).then((res)=>{
    console.log("Table Has Been created Successfully");
  }).catch((err)=>{
    console.log("Some Error Has Been Occur");
  })

  module.exports = adminCredential