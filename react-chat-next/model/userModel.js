const sequelize = require('./db')
const { DataTypes } = require('sequelize')


const UserModel = sequelize.define('User', {
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    isAvatarImage:{
        type:DataTypes.BOOLEAN,
        defaultValue: false,
    },
    avatarImage:{
        //二进制数据类型
        type:DataTypes.BLOB,
        defaultValue:""
    }
    
},{
    createdAt: false,
    updatedAt: false,
    paranoid: false,
})

module.exports = UserModel