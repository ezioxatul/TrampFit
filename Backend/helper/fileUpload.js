const multer  = require('multer')
let path = require('path')
let fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let directoryName = req.userDetails.payloadData.fullName + " " + "(" + req.userDetails.payloadData.mobileNumber + ")" 
        if(!fs.existsSync('../Frontend/public/multerUploads/' + directoryName)){
            fs.mkdirSync('../Frontend/public/multerUploads/' + directoryName)
        }
        
      cb(null, '../Frontend/public/multerUploads/' + directoryName + '/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + path.extname(file.originalname))
    }
  })
  
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/png') {
            cb(null, false);
        }
        else{
           cb(null, true);
        }
        
    }
});

  module.exports = upload