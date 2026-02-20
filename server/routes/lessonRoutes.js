const express = require('express');
const router = express.Router();
const {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

// Remove validation for now - we'll add it back later if needed
router.route('/')
  .get(getAllLessons)
  .post(createLesson);

router.route('/:id')
  .get(getLessonById)
  .put(updateLesson)
  .delete(deleteLesson);

module.exports = router;