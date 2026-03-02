import React, { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Award, Medal, Search } from 'lucide-react';

const RankingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, improvement, lessons

  // Sample student data
  const students = [
    { id: 1, name: 'Alex Dill', ntrp: 3.0, improvement: '+0.5', lessons: 12 },
    { id: 2, name: 'Gemma Sun', ntrp: 2.5, improvement: '+0.3', lessons: 8 },
    { id: 3, name: 'Jordan Smith', ntrp: 4.0, improvement: '+0.2', lessons: 15 },
    { id: 4, name: 'Taylor Brown', ntrp: 3.5, improvement: '+0.4', lessons: 10 },
    { id: 5, name: 'Casey Miller', ntrp: 2.0, improvement: '+0.6', lessons: 6 },
    { id: 6, name: 'Morgan Lee', ntrp: 4.5, improvement: '+0.3', lessons: 20 },
    { id: 7, name: 'Riley Davis', ntrp: 3.0, improvement: '+0.7', lessons: 14 },
  ];

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    // First filter by search term
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then sort
    let sorted = [...filtered];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.ntrp - a.ntrp);
    } else if (sortBy === 'improvement') {
      sorted.sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement));
    } else if (sortBy === 'lessons') {
      sorted.sort((a, b) => b.lessons - a.lessons);
    }

    return sorted;
  }, [searchTerm, sortBy]);

  const getMedalColor = (index) => {
    if (index === 0) return '#f59e0b';
    if (index === 1) return '#9ca3af';
    if (index === 2) return '#cd7f32';
    return '#6b7280';
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Trophy
          size={64}
          color="#10b981"
          style={{ display: 'block', margin: '0 auto 1rem' }}
        />
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          color: '#111827'
        }}>
          Student Rankings
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Celebrating our students' progress and achievements
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <Search
            size={20}
            color="#6b7280"
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{
              paddingLeft: '3rem',
              width: '100%'
            }}
          />
        </div>

        {/* Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontWeight: 500, color: '#374151', whiteSpace: 'nowrap' }}>
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select"
            style={{ minWidth: '150px' }}
          >
            <option value="rating">NTRP Rating</option>
            <option value="improvement">Improvement</option>
            <option value="lessons">Lessons Taken</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: '1rem', color: '#6b7280' }}>
        Showing {filteredAndSortedStudents.length} of {students.length} students
      </div>

      {/* Rankings Table */}
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '600px'
        }}>
          <thead>
            <tr style={{
              borderBottom: '2px solid #e5e7eb',
              backgroundColor: '#f9fafb'
            }}>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                fontWeight: 600,
                color: '#374151'
              }}>
                Rank
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'left',
                fontWeight: 600,
                color: '#374151'
              }}>
                Student
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'center',
                fontWeight: 600,
                color: '#374151'
              }}>
                NTRP Rating
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'center',
                fontWeight: 600,
                color: '#374151'
              }}>
                Improvement
              </th>
              <th style={{
                padding: '1rem',
                textAlign: 'center',
                fontWeight: 600,
                color: '#374151'
              }}>
                Total Lessons
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  No students found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              filteredAndSortedStudents.map((student, index) => (
                <tr
                  key={student.id}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '1rem' }}>
                    {index < 3 ? (
                      <Medal
                        size={28}
                        color={getMedalColor(index)}
                        fill={getMedalColor(index)}
                      />
                    ) : (
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#6b7280'
                      }}>
                        #{index + 1}
                      </span>
                    )}
                  </td>
                  <td style={{
                    padding: '1rem',
                    fontWeight: 500,
                    color: '#111827'
                  }}>
                    {student.name}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      padding: '0.375rem 0.875rem',
                      borderRadius: '9999px',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}>
                      {student.ntrp} NTRP
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      color: '#10b981',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontWeight: 600
                    }}>
                      <TrendingUp size={16} />
                      {student.improvement}
                    </span>
                  </td>
                  <td style={{
                    padding: '1rem',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontWeight: 500
                  }}>
                    {student.lessons}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-3" style={{ marginTop: '3rem' }}>
        <div className="card" style={{ textAlign: 'center', backgroundColor: '#fef3c7' }}>
          <Trophy
            size={48}
            color="#f59e0b"
            style={{ display: 'block', margin: '0 auto 1rem' }}
          />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#92400e'
          }}>
            Top Performer
          </h3>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '0.25rem'
          }}>
            {filteredAndSortedStudents[0]?.name || 'N/A'}
          </p>
          <p style={{ color: '#78716c' }}>
            NTRP {filteredAndSortedStudents[0]?.ntrp || 'N/A'}
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', backgroundColor: '#d1fae5' }}>
          <TrendingUp
            size={48}
            color="#10b981"
            style={{ display: 'block', margin: '0 auto 1rem' }}
          />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#065f46'
          }}>
            Most Improved
          </h3>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '0.25rem'
          }}>
            {[...students].sort((a, b) =>
              parseFloat(b.improvement) - parseFloat(a.improvement)
            )[0].name}
          </p>
          <p style={{ color: '#78716c' }}>
            {[...students].sort((a, b) =>
              parseFloat(b.improvement) - parseFloat(a.improvement)
            )[0].improvement} improvement
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center', backgroundColor: '#dbeafe' }}>
          <Award
            size={48}
            color="#3b82f6"
            style={{ display: 'block', margin: '0 auto 1rem' }}
          />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#1e40af'
          }}>
            Most Dedicated
          </h3>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981',
            marginBottom: '0.25rem'
          }}>
            {[...students].sort((a, b) => b.lessons - a.lessons)[0].name}
          </p>
          <p style={{ color: '#78716c' }}>
            {[...students].sort((a, b) => b.lessons - a.lessons)[0].lessons} lessons completed
          </p>
        </div>
      </div>

      {/* Info Section */}
      <div className="card" style={{
        marginTop: '3rem',
        backgroundColor: '#f0fdf4',
        border: '2px solid #10b981'
      }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#166534'
        }}>
          About NTRP Ratings
        </h3>
        <p style={{ color: '#6b7280', lineHeight: 1.6, marginBottom: '1rem' }}>
          The National Tennis Rating Program (NTRP) is a rating system used to objectively
          measure a tennis player's playing ability. Ratings range from 1.0 (beginner) to 7.0 (world class).
        </p>
        <div className="grid grid-2" style={{ gap: '1rem' }}>
          <div>
            <strong style={{ color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
              1.0 - 2.5: Beginner
            </strong>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Learning basic strokes and court positioning
            </p>
          </div>
          <div>
            <strong style={{ color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
              3.0 - 4.0: Intermediate
            </strong>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Consistent strokes and tactical awareness
            </p>
          </div>
          <div>
            <strong style={{ color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
              4.5 - 5.5: Advanced
            </strong>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Strong competitive play with refined technique
            </p>
          </div>
          <div>
            <strong style={{ color: '#166534', display: 'block', marginBottom: '0.25rem' }}>
              6.0 - 7.0: Professional
            </strong>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              National and international tournament level
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;