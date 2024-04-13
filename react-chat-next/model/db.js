const sequelize = require('sequelize');


const Sequelize = new sequelize('chatroom','root','123456',{
    host:'localhost',
    dialect:'mysql',
    timezone:'+08:00'
})


module.exports = Sequelize;