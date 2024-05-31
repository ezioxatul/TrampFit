const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');

const sessionModel = sequelize.define('sessionTiming', {
  sessionTiming: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  sessionCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true
  },
  date: {
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


  sessionModel.sync({ force: false }).then((res) => {
  console.log("session timing Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating session timing Table");
})
module.exports = sessionModel
