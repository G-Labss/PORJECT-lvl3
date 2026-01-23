const express = require('express');
const router = express.Router();
const { validateLesson } = require('../middleware/validation');
const {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

// GET all lessons & POST new lesson
router.route('/')
  .get(getAllLessons)
  .post(validateLesson, createLesson);

// GET, PUT, DELETE specific lesson
router.route('/:id')
  .get(getLessonById)
  .put(validateLesson, updateLesson)
  .delete(deleteLesson);

module.exports = router;