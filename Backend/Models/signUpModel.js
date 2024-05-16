const sequelize = require('../databaseConnection');
const {DataTypes} = require('sequelize');
const signupModel = sequelize.define('signup', {
    // Model attributes are defined here
    fullName : {
        type: DataTypes.STRING,
        allowNull:false,
        required:true   
    },mobileNumber:{
        type:DataTypes.BIGINT,
        allowNull:false,
        required:true
    },email:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    },gender:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    },city:{
        type:DataTypes.STRING,
        allowNull:false,
        required:true
    },
    totalSession:{
      type:DataTypes.INTEGER,
      allowNull:true
  }
  }, {
    freezeTableName : true
  });


  signupModel.sync({force:false}).then((res)=>{
    console.log("Table Has Been created Successfully");
  }).catch((err)=>{
    console.log("Some Error Has Been Occur");
  })

  module.exports = signupModel