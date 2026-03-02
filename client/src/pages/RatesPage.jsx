import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Check, Star, Calculator, Tag } from 'lucide-react';
import { discountAPI } from '../services/api';

const RatesPage = () => {
  const { state, fetchLessons } = useAppContext();
  const { lessons, loading, error } = state;
  const [calculatorQuantity, setCalculatorQuantity] = useState(1);
  const [selectedLessonForCalc, setSelectedLessonForCalc] = useState(null);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const applyDiscount = async () => {
    if (!discountCode.trim()) return;
    setDiscountError('');
    try {
      const response = await discountAPI.validate(discountCode);
      setAppliedDiscount(response.discount);
    } catch {
      setAppliedDiscount(0);
      setDiscountError('Invalid discount code');
    }
  };

  const fallbackLessons = [
    { _id: '1', title: 'Beginner Single Lesson', price: 60, level: 'Beginner', duration: 60 },
    { _id: '2', title: 'Beginner Group Session', price: 35, level: 'Beginner', duration: 60 },
    { _id: '3', title: 'Intermediate Single Lesson', price: 80, level: 'Intermediate', duration: 60 },
    { _id: '4', title: 'Intermediate Drill Session', price: 50, level: 'Intermediate', duration: 90 },
    { _id: '5', title: 'Advanced Private Coaching', price: 120, level: 'Advanced', duration: 60 },
    { _id: '6', title: 'Advanced Match Play', price: 100, level: 'Advanced', duration: 90 },
  ];

  const displayLessons = (lessons && lessons.length > 0) ? lessons : fallbackLessons;

  const calculatedTotal = useMemo(() => {
    if (!selectedLessonForCalc) return 0;
    const subtotal = selectedLessonForCalc.price * calculatorQuantity;
    const discount = subtotal * (appliedDiscount / 100);
    return subtotal - discount;
  }, [selectedLessonForCalc, calculatorQuantity, appliedDiscount]);

  if (loading) return <LoadingSpinner message="Loading pricing..." />;
  if (error) console.error('RatesPage Error:', error);

  const lessonsByLevel = {
    'Beginner': displayLessons.filter(l => l.level === 'Beginner'),
    'Intermediate': displayLessons.filter(l => l.level === 'Intermediate'),
    'Advanced': displayLessons.filter(l => l.level === 'Advanced'),
  };

  const levelColors = {
    'Beginner': { bg: '#dbeafe', text: '#1e40af', border: '#3b82f6' },
    'Intermediate': { bg: '#fed7aa', text: '#c2410c', border: '#f59e0b' },
    'Advanced': { bg: '#fecaca', text: '#991b1b', border: '#ef4444' },
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>
          Rates & Packages
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Competitive pricing for quality tennis instruction
        </p>
      </div>

      <div className="card" style={{
        marginBottom: '3rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        border: '2px solid #10b981',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Calculator size={32} color="#10b981" />
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#166534', margin: 0 }}>
            Price Calculator
          </h2>
        </div>

        <div className="grid grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: '#166534' }}>
              Select Lesson Type
            </label>
            <select
              className="form-select"
              value={selectedLessonForCalc?._id || ''}
              onChange={(e) => {
                const lesson = displayLessons.find(l => l._id === e.target.value);
                setSelectedLessonForCalc(lesson || null);
              }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                backgroundColor: 'white'
              }}
            >
              <option value="">Choose a lesson...</option>
              {displayLessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title} - ${lesson.price} ({lesson.level})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" style={{ color: '#166534' }}>
              Number of Lessons
            </label>
            <input
              type="number"
              className="form-input"
              min="1"
              max="50"
              value={calculatorQuantity}
              onChange={(e) => setCalculatorQuantity(parseInt(e.target.value) || 1)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ color: '#166534' }}>
            Discount Code (Optional)
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => { setDiscountCode(e.target.value); setAppliedDiscount(0); setDiscountError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && applyDiscount()}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={applyDiscount}
              style={{ whiteSpace: 'nowrap' }}
            >
              Apply
            </button>
            {appliedDiscount > 0 && (
              <div style={{
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Tag size={18} />
                {appliedDiscount}% OFF
              </div>
            )}
          </div>
          {discountError && (
            <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.5rem', marginBottom: 0 }}>
              {discountError}
            </p>
          )}
        </div>

        {selectedLessonForCalc && (
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '2px solid #10b981'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#6b7280' }}>
                  {selectedLessonForCalc.title} × {calculatorQuantity}
                </span>
                <span style={{ fontWeight: 600 }}>
                  ${(selectedLessonForCalc.price * calculatorQuantity).toFixed(2)}
                </span>
              </div>
              {appliedDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#10b981' }}>
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-${((selectedLessonForCalc.price * calculatorQuantity * appliedDiscount) / 100).toFixed(2)}</span>
                </div>
              )}
            </div>
            <div style={{
              paddingTop: '1rem',
              borderTop: '2px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>
                Total:
              </span>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                ${calculatedTotal.toFixed(2)}
              </span>
            </div>
            {calculatorQuantity >= 5 && (
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem',
                backgroundColor: '#fef3c7',
                borderRadius: '0.5rem',
                color: '#92400e',
                fontSize: '0.875rem'
              }}>
                💡 <strong>Bulk Discount:</strong> Consider package deals for 10+ lessons!
              </div>
            )}
          </div>
        )}

        {!selectedLessonForCalc && (
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            border: '2px dashed #10b981',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            👆 Select a lesson type above to calculate your total
          </div>
        )}
      </div>

      <div className="grid grid-3">
        {Object.entries(lessonsByLevel).map(([level, levelLessons]) => {
          if (levelLessons.length === 0) return null;

          const avgPrice = Math.round(levelLessons.reduce((sum, l) => sum + l.price, 0) / levelLessons.length);
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

              <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem', color: colors.text }}>
                {level}
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981' }}>
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
                <p style={{ fontSize: '0.875rem', color: colors.text, fontWeight: 500, margin: 0 }}>
                  {levelLessons.length} package{levelLessons.length > 1 ? 's' : ''} available
                </p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
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
                    <Check size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
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
                type="button"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  backgroundColor: colors.border,
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: 'white'
                }}
                onClick={() => {
                  if (levelLessons.length > 0) {
                    setSelectedLessonForCalc(levelLessons[0]);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Calculate Price
              </button>
            </div>
          );
        })}
      </div>

      <div className="card" style={{
        marginTop: '3rem',
        backgroundColor: '#f0fdf4',
        border: '2px solid #10b981'
      }}>
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
              <strong style={{ color: '#166534', display: 'block' }}>Personalized Instruction</strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Tailored coaching based on your skill level
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>Flexible Scheduling</strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Book lessons at times that work for you
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166634', display: 'block' }}>Video Analysis</strong>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Review your technique with slow-motion replays
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
            <Check size={24} color="#10b981" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ color: '#166534', display: 'block' }}>Progress Tracking</strong>
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