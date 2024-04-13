const sequelize = require('sequelize');


const Sequelize = new sequelize('chatroom','root','chen030127',{
    host:'localhost',
    dialect:'mysql',
    timezone:'+08:00'
})


module.exports = Sequelize;