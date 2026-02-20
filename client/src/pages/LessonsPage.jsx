import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import LessonDetailModal from '../components/LessonDetailModal';
import { BookOpen, Clock, Users, DollarSign } from 'lucide-react';

const LessonsPage = () => {
  const { state, fetchLessons } = useAppContext();
  const { lessons, loading, error } = state;
  const [filter, setFilter] = useState('All Levels');
  const [selectedLesson, setSelectedLesson] = useState(null);

  console.log('Selected lesson:', selectedLesson); // Debug line

  // useMemo to optimize filtering
  const filteredLessons = useMemo(() => {
    if (filter === 'All Levels') {
      return lessons;
    }
    return lessons.filter(lesson => lesson.level === filter);
  }, [lessons, filter]);

  if (loading) return <LoadingSpinner message="Loading lessons..." />;
  if (error) {
    console.error('LessonsPage Error:', error);
  }

  const displayLessons = filteredLessons || [];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Lesson Packages
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Choose the perfect lesson package for your skill level
        </p>
      </div>

      {/* Filter Buttons */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.75rem',
        flexWrap: 'wrap'
      }}>
        {levels.map((level) => (
          <button
            type="button"
            key={level}
            onClick={() => setFilter(level)}
            className="btn"
            style={{
              backgroundColor: filter === level ? '#10b981' : '#f3f4f6',
              color: filter === level ? 'white' : '#374151',
              padding: '0.625rem 1.25rem',
              border: filter === level ? 'none' : '1px solid #d1d5db'
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
          message={`No ${filter} lessons available at the moment. Try selecting a different level.`}
          action={
            <button
              type="button"
              onClick={() => setFilter('All Levels')}
              className="btn btn-primary"
            >
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
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                backgroundColor: lesson.level === 'Beginner' ? '#dbeafe' :
                  lesson.level === 'Intermediate' ? '#fed7aa' : '#fecaca',
                color: lesson.level === 'Beginner' ? '#1e40af' :
                  lesson.level === 'Intermediate' ? '#c2410c' : '#991b1b',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                width: 'fit-content'
              }}>
                {lesson.level}
              </div>

              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                color: '#111827'
              }}>
                {lesson.title}
              </h3>

              <p style={{
                color: '#6b7280',
                marginBottom: '1.5rem',
                flexGrow: 1,
                lineHeight: 1.6
              }}>
                {lesson.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.625rem'
                }}>
                  <Clock size={18} color="#6b7280" />
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {lesson.duration} minutes
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.625rem'
                }}>
                  <Users size={18} color="#6b7280" />
                  <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Max {lesson.maxStudents} student{lesson.maxStudents > 1 ? 's' : ''}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  marginTop: '1rem'
                }}>
                  <DollarSign size={20} color="#10b981" />
                  <span style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#10b981'
                  }}>
                    {lesson.price}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '0.25rem' }}>
                    /session
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={() => setSelectedLesson(lesson)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Lesson Detail Modal */}
      <LessonDetailModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
      />
    </div>
  );
};

export default LessonsPage;