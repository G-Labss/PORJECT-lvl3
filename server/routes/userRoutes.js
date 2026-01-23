const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validation');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(validateUser, createUser);

router.route('/:id')
  .get(getUserById)
  .put(validateUser, updateUser)
  .delete(deleteUser);

module.exports = router;