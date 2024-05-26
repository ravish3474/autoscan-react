const path = require('path')
const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
    /* @pankajg this destination for custmized for images and files
    supported format automatically convert there respective*/
    destination: (req, file, cb) => {
        let way = path.extname(file.originalname).toLowerCase();
        // if (way == ".jpg" || way == ".jpeg" ||
        //     way == ".png" || way == ".giff") way = ".images";

        // if (way == ".doc" || way == ".docx" ||
        //     way == ".html" || way == ".htm" ||
        //     way == ".odt" || way == ".pdf" ||
        //     way == ".xls" || way == ".xlsx" ||
        //     way == ".xls" || way == ".xlsx" ||
        //     way == ".txt" || way == ".pptx") way = ".docs";

        // if (way == ".mkv" || way == ".mp4") way = ".videos";

        const dest = `public/assets/`
        fs.access(dest, function (error) {
            if (error) {
                console.log("Directory does not exist.");
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                console.log("Directory exists.");
                return cb(null, dest);
            }

        });
    },
    filename: (req, file, cb) => {

      var datetimestamp = new Date();

      datetimestamp = datetimestamp.toISOString().split('T')[0];

      datetimestamp = datetimestamp + '_' + Date.now();

      var fileorignalname = file.originalname;

      let fileName = path.parse(fileorignalname).name;

      fileName = fileName.replace(/ /g, '-');

      fileorignalname = fileorignalname.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase();

      let fileExtensionName = fileorignalname.split('.').pop();

      file['completeName'] = fileName + '_' + datetimestamp;

      cb(null, fileName + '_' + datetimestamp + `.${fileExtensionName}`)

  }
});

const upload = multer({
    storage: storage,
    fileFilter: async (req, file, cb) => {
        return cb(null, true);
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 * 1024 }, // limit sample 1GB
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
}).array('uploadedImages', 4);

module.exports = upload, multi_upload;