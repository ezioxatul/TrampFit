const sequelize = require('../databaseConnection');
const signupModel = require('./signUpModel');
const { DataTypes } = require('sequelize');

const paymentDetail = sequelize.define('paymentDetail', {
    invoiceId: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    downloadInvoice: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    downloadRecipt: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    interval: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    intervalCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    paidAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    startDate: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    endDate: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    subscriptionName: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    subscriptionId: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    membershipId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required:true
    },

}, {
    freezeTableName: true
});


paymentDetail.sync({  force : false }).then((res) => {
    console.log("payment  Table created successfully");
}).catch((err) => {
    console.log("Some error occured while creating Payment Table");
})
module.exports = paymentDetail
