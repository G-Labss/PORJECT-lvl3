import React, { useState } from 'react';
import Modal from './Modal';
import AvailabilityCalendar from './AvailabilityCalendar';
import { paymentAPI } from '../services/api';
import { CheckCircle, Loader, AlertCircle, Calendar, Smartphone } from 'lucide-react';

const GOLD = '#c9a84c';
const ZELLE_NUMBER = '+1 (616) 500-6583';

function formatTime(time24) {
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

const BookingModal = ({ lesson, isOpen, onClose }) => {
  const [step, setStep] = useState('schedule'); // 'schedule' | 'details' | 'payment' | 'success'
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetAndClose = () => {
    setStep('schedule');
    setSelectedSlot(null);
    setStudentName('');
    setStudentEmail('');
    setNotes('');
    setError('');
    onClose();
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setError('');
    setStep('payment');
  };

  const handleZelleConfirm = async () => {
    setLoading(true);
    setError('');
    try {
      await paymentAPI.createZelleBooking({
        lessonId: lesson._id,
        studentName,
        studentEmail,
        notes,
        scheduledDate: selectedSlot?.date,
        scheduledTime: selectedSlot?.time,
        availabilitySlotId: selectedSlot?.slotId,
      });
      setStep('success');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!lesson) return null;

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Book Lesson">
      {/* Step indicator */}
      {step !== 'success' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            { key: 'schedule', label: '1. Schedule' },
            { key: 'details', label: '2. Details' },
            { key: 'payment', label: '3. Payment' },
          ].map((s, i, arr) => (
            <React.Fragment key={s.key}>
              <span style={{
                fontSize: '0.75rem', fontWeight: 600,
                color: step === s.key ? GOLD : ['schedule', 'details', 'payment'].indexOf(step) > i ? '#555' : '#333',
              }}>
                {s.label}
              </span>
              {i < arr.length - 1 && <span style={{ color: '#333', fontSize: '0.75rem' }}>›</span>}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ── Step: schedule ── */}
      {step === 'schedule' && (
        <div>
          <p style={{ color: '#666', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            Pick a time for <strong style={{ color: '#e0e0e0' }}>{lesson.title}</strong>
          </p>

          <AvailabilityCalendar onSelect={setSelectedSlot} selectedSlot={selectedSlot} />

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={resetAndClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: 2, opacity: selectedSlot ? 1 : 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              disabled={!selectedSlot}
              onClick={() => setStep('details')}
            >
              {selectedSlot ? <><Calendar size={16} /> Continue</> : 'Select a time to continue'}
            </button>
          </div>
        </div>
      )}

      {/* ── Step: details ── */}
      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit}>
          <p style={{ color: '#666', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Booking: <strong style={{ color: '#e0e0e0' }}>{lesson.title}</strong> — <span style={{ color: GOLD, fontWeight: 700 }}>${lesson.price}</span>
          </p>
          {selectedSlot && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              marginBottom: '1.25rem', padding: '0.5rem 0.75rem',
              backgroundColor: 'rgba(201,168,76,0.07)', border: `1px solid rgba(201,168,76,0.25)`,
              borderRadius: '0.375rem', fontSize: '0.8rem', color: GOLD,
            }}>
              <Calendar size={14} color={GOLD} />
              <span>
                {new Date(selectedSlot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                {' '}at <strong>{formatTime(selectedSlot.time)}</strong>
              </span>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label className="form-label">Your name</label>
            <input
              type="text"
              className="input"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              placeholder="Jane Smith"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="input"
              value={studentEmail}
              onChange={e => setStudentEmail(e.target.value)}
              placeholder="jane@example.com"
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Notes <span style={{ color: '#444', fontWeight: 400 }}>(optional)</span></label>
            <textarea
              className="input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Skill level, goals..."
              rows={3}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setStep('schedule')}>
              Back
            </button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
              Continue to payment
            </button>
          </div>
        </form>
      )}

      {/* ── Step: payment (Zelle) ── */}
      {step === 'payment' && (
        <div>
          {/* Order summary */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #1e1e1e',
          }}>
            <div>
              <div style={{ fontWeight: 600, color: '#e0e0e0' }}>{lesson.title}</div>
              <div style={{ color: '#555', fontSize: '0.875rem' }}>{studentEmail}</div>
              {selectedSlot && (
                <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  {new Date(selectedSlot.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  {' · '}{formatTime(selectedSlot.time)}
                </div>
              )}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: GOLD, fontFamily: "'Playfair Display', serif" }}>
              ${lesson.price}
            </div>
          </div>

          {/* Zelle instructions */}
          <div style={{
            backgroundColor: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '0.625rem',
            padding: '1.25rem',
            marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Smartphone size={18} color={GOLD} />
              <span style={{ fontWeight: 700, color: '#e0e0e0', fontSize: '0.9375rem' }}>Pay via Zelle</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>Send to</span>
                <span style={{ color: '#e0e0e0', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9375rem' }}>{ZELLE_NUMBER}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>Amount</span>
                <span style={{ color: GOLD, fontWeight: 700, fontSize: '1.0625rem' }}>${lesson.price}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <span style={{ color: '#666', fontSize: '0.875rem', flexShrink: 0 }}>Memo</span>
                <span style={{ color: '#aaa', fontSize: '0.8125rem', textAlign: 'right' }}>
                  {studentName} — {lesson.title}
                </span>
              </div>
            </div>

            <div style={{
              marginTop: '1rem', paddingTop: '0.875rem', borderTop: '1px solid rgba(201,168,76,0.15)',
              fontSize: '0.8125rem', color: '#555', lineHeight: 1.5,
            }}>
              Open your bank app, go to Zelle, and send the payment. Once sent, click the button below to confirm your booking.
            </div>
          </div>

          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem',
            }}>
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}
            onClick={handleZelleConfirm}
            disabled={loading}
          >
            {loading ? <><Loader size={18} /> Confirming...</> : "I've sent the payment"}
          </button>

          <button type="button" className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setStep('details')}>
            Back
          </button>
        </div>
      )}

      {/* ── Step: success ── */}
      {step === 'success' && (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'rgba(201,168,76,0.1)', border: '2px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
          }}>
            <CheckCircle size={36} color={GOLD} />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0f0f0', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>
            Booking Received!
          </h3>
          <p style={{ color: '#888', marginBottom: '0.5rem' }}>
            You've booked <strong style={{ color: '#e0e0e0' }}>{lesson.title}</strong>
          </p>
          {selectedSlot && (
            <p style={{ color: GOLD, fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9375rem' }}>
              {new Date(selectedSlot.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              {' at '}{formatTime(selectedSlot.time)}
            </p>
          )}
          <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
            Your booking is <strong style={{ color: '#fbbf24' }}>pending payment confirmation.</strong><br />
            The coach will confirm once your Zelle payment is received.
          </p>
          <button type="button" className="btn btn-primary" style={{ minWidth: '140px' }} onClick={resetAndClose}>
            Done
          </button>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;
