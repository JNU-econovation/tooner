const multer = require('multer');
var multerconfig = require('../config/multer');
const upload = multer(multerconfig);

module.exports = function(app) {
    app.post('/upload/image', upload.single('file'), function(req,res) {
        if(!req.file) throw("파일이 없습니다.");
        res.json({ message: "success", data: [req.file.filename]});
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