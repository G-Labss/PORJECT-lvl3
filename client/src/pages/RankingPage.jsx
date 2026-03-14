import React, { useState, useMemo } from 'react';
import { Trophy, TrendingUp, Award, Medal, Search } from 'lucide-react';

const GOLD = '#c9a84c';

const RankingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const students = [
    { id: 1, name: 'Alex Dill', ntrp: 3.0, improvement: '+0.5', lessons: 12 },
    { id: 2, name: 'Gemma Sun', ntrp: 2.5, improvement: '+0.3', lessons: 8 },
    { id: 3, name: 'Jordan Smith', ntrp: 4.0, improvement: '+0.2', lessons: 15 },
    { id: 4, name: 'Taylor Brown', ntrp: 3.5, improvement: '+0.4', lessons: 10 },
    { id: 5, name: 'Casey Miller', ntrp: 2.0, improvement: '+0.6', lessons: 6 },
    { id: 6, name: 'Morgan Lee', ntrp: 4.5, improvement: '+0.3', lessons: 20 },
    { id: 7, name: 'Riley Davis', ntrp: 3.0, improvement: '+0.7', lessons: 14 },
  ];

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    let sorted = [...filtered];
    if (sortBy === 'rating') sorted.sort((a, b) => b.ntrp - a.ntrp);
    else if (sortBy === 'improvement') sorted.sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement));
    else if (sortBy === 'lessons') sorted.sort((a, b) => b.lessons - a.lessons);
    return sorted;
  }, [searchTerm, sortBy]);

  const getMedalColor = (i) => ['#c9a84c', '#9ca3af', '#cd7f32'][i] ?? '#444';

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Trophy size={56} color={GOLD} style={{ display: 'block', margin: '0 auto 1rem' }} />
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#f0f0f0' }}>
          Student Rankings
        </h1>
        <p style={{ color: '#666', fontSize: '1.0625rem' }}>
          Celebrating our students' progress and achievements
        </p>
      </div>

      {/* Controls */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
          <Search size={16} color="#555" style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontWeight: 500, color: '#888', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-select" style={{ minWidth: '150px' }}>
            <option value="rating">NTRP Rating</option>
            <option value="improvement">Improvement</option>
            <option value="lessons">Lessons Taken</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', color: '#555', fontSize: '0.875rem' }}>
        Showing {filteredAndSortedStudents.length} of {students.length} students
      </div>

      {/* Table */}
      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e1e1e', backgroundColor: '#0d0d0d' }}>
              {['Rank', 'Student', 'NTRP Rating', 'Improvement', 'Total Lessons'].map((h, i) => (
                <th key={h} style={{ padding: '1rem 1.25rem', textAlign: i === 0 || i === 1 ? 'left' : 'center', fontWeight: 600, color: '#666', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: '#555' }}>
                  No students found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              filteredAndSortedStudents.map((student, index) => (
                <tr
                  key={student.id}
                  style={{ borderBottom: '1px solid #1a1a1a', transition: 'background-color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#161616'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {index < 3 ? (
                      <Medal size={24} color={getMedalColor(index)} fill={getMedalColor(index)} />
                    ) : (
                      <span style={{ fontSize: '1rem', fontWeight: 600, color: '#555' }}>#{index + 1}</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 500, color: '#e0e0e0' }}>{student.name}</td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                    <span style={{ backgroundColor: 'rgba(201,168,76,0.1)', color: GOLD, padding: '0.3rem 0.75rem', borderRadius: '9999px', fontWeight: 600, fontSize: '0.8125rem', border: '1px solid rgba(201,168,76,0.2)' }}>
                      {student.ntrp} NTRP
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center' }}>
                    <span style={{ color: '#4ade80', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                      <TrendingUp size={14} />
                      {student.improvement}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'center', color: '#777', fontWeight: 500 }}>{student.lessons}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-3" style={{ marginTop: '3rem' }}>
        {[
          { icon: Trophy, label: 'Top Performer', color: GOLD, student: filteredAndSortedStudents[0], stat: `NTRP ${filteredAndSortedStudents[0]?.ntrp || 'N/A'}` },
          { icon: TrendingUp, label: 'Most Improved', color: '#4ade80', student: [...students].sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement))[0], stat: `${[...students].sort((a, b) => parseFloat(b.improvement) - parseFloat(a.improvement))[0].improvement} improvement` },
          { icon: Award, label: 'Most Dedicated', color: '#818cf8', student: [...students].sort((a, b) => b.lessons - a.lessons)[0], stat: `${[...students].sort((a, b) => b.lessons - a.lessons)[0].lessons} lessons` },
        ].map(({ icon: Icon, label, color, student, stat }) => (
          <div key={label} className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <Icon size={40} color={color} style={{ display: 'block', margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</h3>
            <p style={{ fontSize: '1.375rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.25rem' }}>{student?.name || 'N/A'}</p>
            <p style={{ color: '#555', fontSize: '0.875rem' }}>{stat}</p>
          </div>
        ))}
      </div>

      {/* NTRP Info */}
      <div className="card" style={{ marginTop: '3rem', borderColor: 'rgba(201,168,76,0.2)' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem', color: GOLD }}>About NTRP Ratings</h3>
        <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          The National Tennis Rating Program (NTRP) objectively measures playing ability from 1.0 (beginner) to 7.0 (world class).
        </p>
        <div className="grid grid-2" style={{ gap: '1rem' }}>
          {[
            { range: '1.0 – 2.5', label: 'Beginner', desc: 'Learning basic strokes and court positioning' },
            { range: '3.0 – 4.0', label: 'Intermediate', desc: 'Consistent strokes and tactical awareness' },
            { range: '4.5 – 5.5', label: 'Advanced', desc: 'Strong competitive play with refined technique' },
            { range: '6.0 – 7.0', label: 'Professional', desc: 'National and international tournament level' },
          ].map(({ range, label, desc }) => (
            <div key={range}>
              <strong style={{ color: '#c0c0c0', display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                {range}: {label}
              </strong>
              <p style={{ fontSize: '0.8125rem', color: '#555' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
