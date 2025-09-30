const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
//router.post('/login', authController.login);
// Additional routes like getProfile, updateProfile can be added here
//router.get('/profile', authController.getProfile);
//router.put('/profile', authController.updateProfile);
router.get('/users', authController.getAllUsers);

module.exports = router;
