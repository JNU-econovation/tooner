const multer = require('multer');

var multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            //이미지 파일이면
            if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
                cb(null, 'uploads/images')
            }
        },
        //파일 이름 설정
        filename: function(req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
}

module.exports = multerConfig;