const jwt = require('jsonwebtoken');
function isLoggedIn(req, res, next) {
    try {
        req.user = jwt.verify(req.headers.authtoken, require("../config/secretkey.js"));
        console.log(req.user);
        return next();
    }
    catch (e) {
        next(e);
    }
}
exports.isLoggedIn = isLoggedIn;
;
