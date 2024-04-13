const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const userRoutes = require('./userRoutes')
const messageRoutes = require('./messageRoutes')
const socketIO = require('socket.io')

const app = express();
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use("/api/auth",userRoutes)
app.use('/api/messages',messageRoutes)

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'chen030127',
    database:'chatroom'
})
connection.connect(()=>{
    console.log('Connected to database')
})

const server = app.listen(process.env.PORT,()=>{
    console.log('Server is running on port '+ process.env.PORT)
})

const io = socketIO(server,{
    cors:{
        origin:"*",
        credentials:true
    }
})


global.onlineUsers = new Map();

io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        global.onlineUsers.set(userId,socket.id)
    })
    socket.on("send-msg",(data)=>{
        const sendUserSoket = global.onlineUsers.get(data.to)
        if(sendUserSoket){
            socket.to(sendUserSoket).emit("msg-recieve",data.msg)
        }
    })
})
