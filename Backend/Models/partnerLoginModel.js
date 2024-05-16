const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const partnerLoginModel = sequelize.define('partnerLogin', {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  mobileNumber: {
    type: DataTypes.BIGINT,
    allowNull: false,
    required: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  }
}, {
  freezeTableName: true
},
  {
    timestamps: true
  });


partnerLoginModel.sync({ force: false }).then((res) => {
  console.log("Partner Login Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating partnerLogin Table");
})
module.exports = partnerLoginModel
