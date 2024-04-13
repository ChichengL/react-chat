const Message = require('../model/messageModel');
const Sequelize = require('sequelize')

module.exports.addMessage = async(req, res,next) => {
    try{
        const {from,to,message} = req.body;
        const data = await Message.create({
            text:message,
            senderId:from,
            receiverId:to
        })
        if(data){
            res.json({msg:"发送成功",code:200})
        }else{
            res.json({msg:"发送失败",code:500})
        }
    }catch(err){
        next(err)
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    try {
      const messages = await Message.findAll({
        order: [['createdAt', 'ASC']] // 按照创建时间升序排序
      });
      const {from,to} = req.body;
      const msgs = messages.filter(msg => {
        return (msg.senderId === from && msg.receiverId === to) || (msg.senderId === to && msg.receiverId === from)
      })
  
      res.json({ message: "获取成功", code: 200, messages: msgs });
    } catch (err) {
      next(err);
    }
  };