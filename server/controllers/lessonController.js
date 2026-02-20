const { validationResult } = require('express-validator');

// In-memory storage
let lessons = [
  {
    _id: '1',
    title: 'Beginner Tennis Fundamentals',
    description: 'Learn the basics of tennis including grip, stance, and basic strokes',
    duration: 60,
    price: 75,
    level: 'Beginner',
    maxStudents: 4,
    coach: {
      _id: 'coach1',
      name: 'Daniil Medvedev',
      email: 'daniil@tenniscoach.com',
      ntrpRating: 5.5
    },
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: '2',
    title: 'Advanced Serve Technique',
    description: 'Master professional serving techniques including power, spin, and placement',
    duration: 90,
    price: 120,
    level: 'Advanced',
    maxStudents: 2,
    coach: {
      _id: 'coach1',
      name: 'Daniil Medvedev',
      email: 'daniil@tenniscoach.com',
      ntrpRating: 5.5
    },
    isActive: true,
    createdAt: new Date(),
  },
  {
    _id: '3',
    title: 'Intermediate Match Strategy',
    description: 'Develop tactical awareness and strategic thinking for competitive matches',
    duration: 75,
    price: 95,
    level: 'Intermediate',
    maxStudents: 3,
    coach: {
      _id: 'coach1',
      name: 'Daniil Medvedev',
      email: 'daniil@tenniscoach.com',
      ntrpRating: 5.5
    },
    isActive: true,
    createdAt: new Date(),
  }
];

let users = [
  {
    _id: 'coach1',
    name: 'Daniil Medvedev',
    email: 'daniil@tenniscoach.com',
    ntrpRating: 5.5
  }
];

let nextId = 4;

// GET all lessons
exports.getAllLessons = async (req, res, next) => {
  try {
    const activeLessons = lessons.filter(l => l.isActive);
    res.status(200).json({
      success: true,
      count: activeLessons.length,
      data: activeLessons,
    });
  } catch (error) {
    next(error);
  }
};

// GET single lesson
exports.getLessonById = async (req, res, next) => {
  try {
    const lesson = lessons.find(l => l._id === req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};

// POST create lesson
exports.createLesson = async (req, res, next) => {
  try {
    console.log('📝 Creating lesson with data:', req.body);

    // Get coach data
    let coachData = {
      _id: 'coach1',
      name: 'Daniil Medvedev',
      email: 'daniil@tenniscoach.com',
      ntrpRating: 5.5
    };

    if (req.body.coach && users) {
      const foundCoach = users.find(u => u._id === req.body.coach);
      if (foundCoach) {
        coachData = {
          _id: foundCoach._id,
          name: foundCoach.name,
          email: foundCoach.email,
          ntrpRating: foundCoach.ntrpRating
        };
      }
    }

    const newLesson = {
      _id: String(nextId++),
      title: req.body.title,
      description: req.body.description,
      duration: parseInt(req.body.duration),
      price: parseFloat(req.body.price),
      level: req.body.level,
      maxStudents: parseInt(req.body.maxStudents) || 1,
      coach: coachData,
      isActive: true,
      createdAt: new Date(),
    };

    lessons.push(newLesson);

    console.log('✅ Lesson created:', newLesson);

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: newLesson,
    });
  } catch (error) {
    console.error('❌ Error creating lesson:', error);
    next(error);
  }
};

// PUT update lesson
exports.updateLesson = async (req, res, next) => {
  try {
    console.log('📝 Updating lesson:', req.params.id, 'with data:', req.body);

    const index = lessons.findIndex(l => l._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    // Keep existing coach data
    const existingCoach = lessons[index].coach;

    lessons[index] = {
      ...lessons[index],
      title: req.body.title,
      description: req.body.description,
      duration: parseInt(req.body.duration),
      price: parseFloat(req.body.price),
      level: req.body.level,
      maxStudents: parseInt(req.body.maxStudents),
      coach: existingCoach,
      updatedAt: new Date(),
    };

    console.log('✅ Lesson updated:', lessons[index]);

    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: lessons[index],
    });
  } catch (error) {
    console.error('❌ Error updating lesson:', error);
    next(error);
  }
};

// DELETE lesson
exports.deleteLesson = async (req, res, next) => {
  try {
    console.log('🗑️ Deleting lesson:', req.params.id);

    const index = lessons.findIndex(l => l._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    const deletedLesson = lessons.splice(index, 1)[0];

    console.log('✅ Lesson deleted:', deletedLesson);

    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      data: deletedLesson,
    });
  } catch (error) {
    console.error('❌ Error deleting lesson:', error);
    next(error);
  }
};