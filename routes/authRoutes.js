const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');
const { register, login } = require('../validators/auth.validator');
const auth = require('../middleware/authMiddleware');
//const { protect, auth } = require('../middleware/authMiddleware');





router.post('/register', validate(register), authController.register);
router.post('/login', validate(login), authController.login);
router.get('/users', auth(['admin']), authController.getAllUsers);
router.get('/profile/:id', auth(), authController.getProfile);
router.put('/profile/:id', auth(), authController.updateProfile);
router.delete('/profile/:id', auth(), authController.deleteUser);
// OAuth2 token endpoint
router.post('/token', authController.token);

// Optional refresh token endpoint
router.post('/refresh', authController.refreshToken);

module.exports = router;
