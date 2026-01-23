import React from 'react';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Check, Star } from 'lucide-react';

const RatesPage = () => {
  const { state, fetchLessons } = useAppContext();
  const { lessons, loading, error } = state;

  if (loading) return <LoadingSpinner message="Loading pricing..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLessons} />;

  // Group lessons by level
  const lessonsByLevel = {
    'Beginner': lessons.filter(l => l.level === 'Beginner'),
    'Intermediate': lessons.filter(l => l.level === 'Intermediate'),
    'Advanced': lessons.filter(l => l.level === 'Advanced'),
  };

  const levelColors = {
    'Beginner': { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
    'Intermediate': { bg: '#fed7aa', text: '#c2410c', border: '#f59e0b' },
    'Advanced': { bg: '#fecaca', text: '#991b1b', border: '#ef4444' },
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Rates & Packages
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Competitive pricing for quality tennis instruction
        </p>
      </div>

      <div className="grid grid-3">
        {Object.entries(lessonsByLevel).map(([level, levelLessons]) => {
          if (levelLessons.length === 0) return null;
          
          const avgPrice = Math.round(
            levelLessons.reduce((sum, l) => sum + l.price, 0) / levelLessons.length
          );

          const colors = levelColors[level];

          return (
            <div 
              key={level} 
              className="card" 
              style={{
                borderTop: `4px solid ${colors.border}`,
                position: 'relative',
                overflow: 'visible'
              }}
            >
              {level === 'Intermediate' && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Star size={12} fill="white" />
                  POPULAR
                </div>
              )}

              <h3 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem',
                color: colors.text
              }}>
                {level}
              </h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ 
                  fontSize: '3rem', 
                  fontWeight: 'bold', 
                  color: '#10b981' 
                }}>
                  ${avgPrice}
                </span>
                <span style={{ color: '#6b7280', fontSize: '1rem' }}> / session</span>
              </div>

              <div style={{
                backgroundColor: colors.bg,
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: colors.text,
                  fontWeight: 500
                }}>
                  {levelLessons.length} package{levelLessons.length > 1 ? 's' : ''} available
                </p>
              </div>

              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                marginBottom: '1.5rem' 
              }}>
                {levelLessons.map((lesson) => (
                  <li 
                    key={lesson._id} 
                    style={{ 
                      display: 'flex', 
                      gap: '0.75rem', 
                      marginBottom: '1rem',
                      paddingBottom: '1rem',
                      borderBottom: '1px solid #f3f4f6'
                    }}
                  >
                    <Check 
                      size={20} 
                      color="#10b981" 
                      style={{ flexShrink: 0, marginTop: '0.125rem' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: '#111827', display: 'block', marginBottom: '0.25rem' }}>
                        {lesson.title}
                      </strong>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span>{lesson.duration} minutes</span>
                        <span style={{ fontWeight: 600, color: '#10b981' }}>
                          ${lesson.price}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button 
                className="btn btn-primary" 
                style={{ 
                  width: '100%',
                  backgroundColor: colors.border
                }}
                onClick={() => alert(`Selecting ${level} package! (Coming soon)`)}
              >
                Select {level}
              </button>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div 
        className="card" 
        style={{ 
          marginTop: '3rem', 
          backgroundColor: '#f0fdf4',
          border: '2px solid #10b981'
        }}
      >
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem', 
          color: '#166534',
          textAlign: 'center'
        }}>
          All Packages Include
        </h3>
        <div className="grid grid-2">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>
                Personalized Instruction
              </strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Tailored coaching based on your skill level
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>
                Flexible Scheduling
              </strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Book lessons at times that work for you
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>
                Video Analysis
              </strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Review your technique with slow-motion replays
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>
                Progress Tracking
              </strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Monitor your improvement over time
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatesPage;