const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');

const sessionBookingModel = sequelize.define('sessionBooking', {
  bookingDate: {
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


sessionBookingModel.sync({ force: false }).then((res) => {
  console.log("session Booking Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating session booking Table");
})
module.exports = sessionBookingModel
