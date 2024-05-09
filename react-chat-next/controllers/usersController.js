const User = require('../model/userModel')
const brcypt = require('bcrypt')
const Sequelize = require('sequelize')
const jwt = require('../routes/jwt')
module.exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const usernameCheck = await User.findOne({
            where: {
                username
            }
        });

        if (usernameCheck) {
            return res.json({ message: "用户已经存在", code: 403 })
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
        })
        delete user.password
        return res.json({ message: "注册成功", code: 200, user })
    } catch (err) {
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({
            where: {
                username,
            }
        });
        if (!user) {
            return res.json({ message: "用户不存在", code: 403 })
        }
        const isMatch = await brcypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "密码错误", code: 403 })
        }
        user.avatarImage = user.avatarImage.toString("binary")
        //颁发token
        jwt.publish(res, undefined, {})

        delete user.password
        return res.json({ message: "登录成功", code: 200, user })
    } catch (err) {
        next(err)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const avatarImage = req.body.image;
        const user = await User.update(
            {
                avatarImage,
                isAvatarImage: true,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.json({ message: "头像设置成功", code: 200, image: user.avatarImage })
    } catch (err) {
        next(err)
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try {
        //选择所有用户但是不包括自己的id
        const id = req.params.id;
        const users = await User.findAll({
            where: {
                id: {
                    [Sequelize.Op.ne]: id
                }
            }
        });
        users.forEach(user => {
            user.avatarImage = user.avatarImage?.toString("binary")
            delete user.password
        })
        res.json({ message: "获取成功", code: 200, users })
    } catch (err) {
        next(err)
    }
}