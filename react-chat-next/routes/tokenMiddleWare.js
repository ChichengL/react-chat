const { pathToRegexp } = require('path-to-regexp')
const jwt = require('./jwt')
const needTokenApi = [
    { method: "POST", path: "/api/auth/setAvatar" },
    { method: "GET", path: "/api/auth/allUsers" },
    { method: "POST", path: "/api/messages/addmsg" },
    { method: "POST", path: "/api/messages/getmsgs" }
]
module.exports = (req, res, next) => {

    const apis = needTokenApi.filter(api => {
        if (api.method === req.method && pathToRegexp(api.path).test(req.path)) {
            return true;
        }
    })
    if (apis.length === 0) {
        return next();
    }
    // check token
    let result = jwt.verify(req);
    if (result) {
        next();
    } else {
        handleNoToken(req, res, next);
    }
}
const handleNoToken = (req, res, next) => {
    res.status(401).send({ message: "请先登录" })
}