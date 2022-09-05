const express = require("express");
const router = express.Router();
const userController =  require('../controllers/user.controller')

router.route('/').get(userController.userHome)  
router.route('/random').get(userController.randomUser)  
router.route('/all').get(userController.userAll)   
router.route('/save').post(userController.userSave)
router.route('/update/:id').patch(userController.userUpdate)
router.route('/bulk-update').patch(userController.userBulkUpdate)
router.route('/delete/:id').delete(userController.userDelete)

module.exports = router;
