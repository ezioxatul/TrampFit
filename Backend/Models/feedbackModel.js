const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');

const feedbackModel = sequelize.define('userFeedback', {
  ratings : {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true
  },

  feedbackMessage : {
    type: DataTypes.TEXT,
    allowNull: false,
    required: true
  },

}, {
  freezeTableName: true
},
  {
    timestamps: true
  });


  feedbackModel.sync({ force: false }).then((res) => {
  console.log("feedback Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating feedback Table");
})
module.exports = feedbackModel
