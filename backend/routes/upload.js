const multer = require('multer');
var multerconfig = require('../config/multer');
const upload = multer(multerconfig);

module.exports = function(app) {
    app.post('/upload/image', upload.array('image'), function(req,res) {
        console.log(req.files);
        let files = [];
        req.files.forEach(file => files.push(file.filename));
        res.json({ message: "success", data: files});
    });
};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    // remember where session come from
    req.session.returnTo = req.originalUrl;
    req.session.save(function (err) {
        if(err) return next(err);
        res.redirect('/login');
    });
};