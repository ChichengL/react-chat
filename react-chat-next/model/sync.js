const sequelize = require('./db')
sequelize.sync({alter: false}).then(()=>{
    console.log("数据库同步成功")
})
