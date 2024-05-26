const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
console.log('metadata file.fieldname',process.env.AWS_S3_BUCKET_NAME);

let fileUpload;
if (process.env.MEDIA_LOCATION_S3 == "true") {
    fileUpload = require('../middlewares/fileUploadS3');
} 
else {
    fileUpload = require('../middlewares/fileUpload');
}
router.get("/list", userController.getAlUserPagination);
router.get('/fetch-user', userController.getAllUsers);
router.post('/create-user', upload.none(),userController.createNewUser);
router.get('/fetch-userbyid/:userId',userController.getUserById);
router.patch('/update-user/:userId',fileUpload.any(),userController.updateUserById);
router.delete('/delete-user/:userId',userController.deleteUserById);
module.exports = router;