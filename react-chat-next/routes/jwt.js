
const jwt = require('jsonwebtoken')
const secret = 'secretkey'
const cookieKey = 'token'

exports.publish = ( res,maxAge = 3600, info = {}) => {
    const token = jwt.sign(info, secret, { expiresIn: maxAge })
    res.cookie(cookieKey, token, { maxAge: maxAge * 1000, httpOnly: true })
    res.header('Authorization', `Bearer ${token}`)
}

exports.verify = (req) => { 
    let token = req.headers.authorization || req.cookies[cookieKey]
    if (!token) {
        return null;
    }
    try {
        const parts = token.split(' ')
        token = parts.length === 2 ? parts[1] : parts[0]
        const result = jwt.verify(token, secret)
        return result
    } catch (err) {
        return null
    }
}