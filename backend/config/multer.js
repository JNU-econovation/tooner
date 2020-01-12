const multer = require('multer');

var multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads/images')
        },
        //파일 이름 설정
        filename: function(req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    }),
    fileFilter: function(req, file, cb) {
        console.log(file);
        if (file.mimetype != "image/jpeg" && file.mimetype != "image/jpg" && file.mimetype != "image/png") {
            return cb(new Error("이미지만 업로드 가능합니다."));
        };
        cb(null, true);
    },
    limits: {
        fileSize: 4096 * 4096
    }
}

module.exports = multerConfig;