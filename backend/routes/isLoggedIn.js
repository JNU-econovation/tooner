const jwt = require('jsonwebtoken');
function isLoggedIn(req, res, next) {
    try {
        req.user = jwt.verify(req.headers.authtoken, require("../config/secretkey.js"));
        return next();
    }
    catch (e) {
        res.status(403).json({message:"먼저 로그인하세요", error: e});
    }
}
exports.isLoggedIn = isLoggedIn;
;
