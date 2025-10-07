const express = require('express');
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', isAuthenticated,authController.register);
router.get('/users', isAuthenticated, authController.getAllUsers);
router.get('/profile/:id', isAuthenticated,authController.getProfile);
router.put('/profile/:id', isAuthenticated,authController.updateProfile);
router.delete('/profile/:id', isAuthenticated,authController.deleteUser);

module.exports = router;
