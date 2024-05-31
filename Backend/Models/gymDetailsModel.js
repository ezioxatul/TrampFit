const sequelize = require('../databaseConnection');
const { DataTypes } = require('sequelize');
const gymDetailsModel = sequelize.define('gymDetails', {
  gymName: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  gymLocation: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  gymCity: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  openingTime: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  closingTime: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
    gymLogo: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
  interiorPhoto: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  },
   gymDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
    },
    gymQuestion: {
        type: DataTypes.TEXT,
        allowNull: false,
        required: true
      },
    panNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    panImage: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    gstNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    ifscCode: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    amenities : {
      type : DataTypes.ARRAY(DataTypes.STRING),
      allowNull : true,
    },
    totalSessionCapacity : {
      type : DataTypes.INTEGER,
      allowNull : true,
    }
  
}, {
  freezeTableName: true
},
  {
    timestamps: true
  });


gymDetailsModel.sync({ force: false }).then((res) => {
  console.log("Partner Login Table created successfully");
}).catch((err) => {
  console.log("Some error occured while creating partnerLogin Table");
})
module.exports = gymDetailsModel;
