const Lesson = require('../models/Lesson');
const { validationResult } = require('express-validator');

exports.getAllLessons = async (req, res, next) => {
  try {
    const lessons = await Lesson.find({ isActive: true })
      .populate('coach', 'name email ntrpRating')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons,
    });
  } catch (error) {
    next(error);
  }
};

exports.getLessonById = async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('coach', 'name email bio ntrpRating yearsExperience specialties');
    
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
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid lesson ID format',
      });
    }
    next(error);
  }
};

exports.createLesson = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const lesson = await Lesson.create(req.body);
    const populatedLesson = await Lesson.findById(lesson._id)
      .populate('coach', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: populatedLesson,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message),
      });
    }
    next(error);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('coach', 'name email');
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: lesson,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message),
      });
    }
    next(error);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      data: lesson,
    });
  } catch (error) {
    next(error);
  }
};