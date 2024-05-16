const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', process.env.db_username,process.env.db_password, {
    host: process.env.db_host,
    dialect: 'postgres'
  });

   sequelize.authenticate().then((res)=>{
    console.log('Connection has been established successfully.');  
   }).catch((err)=>{
    console.log(err)
   })

   module.exports = sequelize
 
