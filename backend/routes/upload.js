const multer = require('multer');
var multerconfig = require('../config/multer');
const upload = multer(multerconfig);

module.exports = function(app) {
    app.post('/upload/image', upload.single('file'), function(req,res) {
        if(!req.file) throw("파일이 없습니다.");
        console.log(req.file);
        res.json({ message: "success", data: [req.file.filename]});
    });
};

