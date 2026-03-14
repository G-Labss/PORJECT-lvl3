import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import LessonDetailModal from '../components/LessonDetailModal';
import { BookOpen, Clock, Users, DollarSign } from 'lucide-react';

const GOLD = '#c9a84c';

const LessonsPage = () => {
  const { state, fetchLessons } = useAppContext();
  const { lessons, loading, error } = state;
  const [filter, setFilter] = useState('All Levels');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const filteredLessons = useMemo(() => {
    if (filter === 'All Levels') return lessons;
    return lessons.filter(lesson => lesson.level === filter);
  }, [lessons, filter]);

  if (loading) return <LoadingSpinner message="Loading lessons..." />;
  if (error) { console.error('LessonsPage Error:', error); }

  const displayLessons = filteredLessons || [];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f0f0f0' }}>
          Lesson Packages
        </h1>
        <div style={{ width: '36px', height: '2px', backgroundColor: GOLD, marginBottom: '1rem', opacity: 0.7 }} />
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Choose the perfect lesson package for your skill level
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={{ marginBottom: '2.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {levels.map((level) => (
          <button
            type="button"
            key={level}
            onClick={() => setFilter(level)}
            className="btn"
            style={{
              backgroundColor: filter === level ? GOLD : 'transparent',
              color: filter === level ? '#0a0a0a' : '#666',
              padding: '0.4375rem 1.125rem',
              fontSize: '0.8125rem',
              fontWeight: filter === level ? 600 : 400,
              border: filter === level ? 'none' : '1px solid rgba(255,255,255,0.09)',
              letterSpacing: 0,
              boxShadow: filter === level ? '0 2px 10px rgba(201,168,76,0.2)' : 'none',
            }}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      {displayLessons.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No lessons found"
          message={`No ${filter} lessons available. Try selecting a different level.`}
          action={
            <button type="button" onClick={() => setFilter('All Levels')} className="btn btn-primary">
              View All Lessons
            </button>
          }
        />
      ) : (
        <div className="grid grid-3">
          {displayLessons.map((lesson) => (
            <div
              key={lesson._id}
              className="card"
              style={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer', border: '1px solid #1e1e1e' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <span style={{
                backgroundColor: 'rgba(201,168,76,0.08)',
                color: GOLD,
                border: '1px solid rgba(201,168,76,0.2)',
                padding: '0.3rem 0.875rem',
                borderRadius: '0.25rem',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {lesson.level}
              </span>

              <h3 style={{ fontSize: '1.375rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f0f0f0' }}>
                {lesson.title}
              </h3>

              <p style={{ color: '#666', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.7, fontSize: '0.9rem' }}>
                {lesson.description}
              </p>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Clock size={15} color="#555" />
                  <span style={{ color: '#666', fontSize: '0.8125rem' }}>{lesson.duration} minutes</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Users size={15} color="#555" />
                  <span style={{ color: '#666', fontSize: '0.8125rem' }}>Max {lesson.maxStudents} student{lesson.maxStudents > 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #1e1e1e' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: GOLD }}>${lesson.price}</span>
                  <span style={{ color: '#555', fontSize: '0.8125rem', marginLeft: '0.25rem' }}>/session</span>
                </div>
              </div>

              <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedLesson(lesson)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      <LessonDetailModal lesson={selectedLesson} isOpen={!!selectedLesson} onClose={() => setSelectedLesson(null)} />
    </div>
  );
};

export default LessonsPage;
