const sequelize = require('./db');
const { DataTypes } = require('sequelize');
const User = require('./userModel')

const Message = sequelize.define('Message', {

    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
    
  },{
    timestamps: true,
    createAt: true,
  });

  module.exports = Message;