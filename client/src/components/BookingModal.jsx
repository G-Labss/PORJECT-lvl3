import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Modal from './Modal';
import { paymentAPI } from '../services/api';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

// ── Stripe card form ──────────────────────────────────────────────────────────
const StripeForm = ({ lesson, studentName, studentEmail, notes, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    try {
      const { clientSecret, bookingId } = await paymentAPI.createStripeIntent({
        lessonId: lesson._id,
        studentName,
        studentEmail,
        notes,
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      await paymentAPI.confirmStripePayment({
        bookingId,
        paymentIntentId: paymentIntent.id,
      });

      onSuccess({ bookingId });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay}>
      <div style={{
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#fafafa',
      }}>
        <CardElement options={{
          style: {
            base: { fontSize: '16px', color: '#111827', '::placeholder': { color: '#9ca3af' } },
            invalid: { color: '#ef4444' },
          },
        }} />
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
        type="submit"
        disabled={loading || !stripe}
        className="btn btn-primary"
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      >
        {loading ? <><Loader size={18} /> Processing...</> : `Pay $${lesson.price}`}
      </button>
    </form>
  );
};

// ── Main BookingModal ─────────────────────────────────────────────────────────
const BookingModal = ({ lesson, isOpen, onClose }) => {
  const [step, setStep] = useState('details'); // 'details' | 'payment' | 'success'
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [notes, setNotes] = useState('');

  const resetAndClose = () => {
    setStep('details');
    setStudentName('');
    setStudentEmail('');
    setNotes('');
    onClose();
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  if (!lesson) return null;

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Book Lesson">
      {step === 'details' && (
        <form onSubmit={handleDetailsSubmit}>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Booking: <strong style={{ color: '#111827' }}>{lesson.title}</strong> — ${lesson.price}
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem', color: '#374151' }}>
              Your name
            </label>
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
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem', color: '#374151' }}>
              Email address
            </label>
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
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.375rem', color: '#374151' }}>
              Notes (optional)
            </label>
            <textarea
              className="input"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Skill level, goals, preferred times..."
              rows={3}
              style={{ width: '100%', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Continue to payment
          </button>
        </form>
      )}

      {step === 'payment' && (
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb',
          }}>
            <div>
              <div style={{ fontWeight: 600, color: '#111827' }}>{lesson.title}</div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{studentEmail}</div>
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              ${lesson.price}
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <StripeForm
              lesson={lesson}
              studentName={studentName}
              studentEmail={studentEmail}
              notes={notes}
              onSuccess={() => setStep('success')}
            />
          </Elements>

          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={() => setStep('details')}
          >
            Back
          </button>
        </div>
      )}

      {step === 'success' && (
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <CheckCircle size={56} color="#10b981" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Booking confirmed!
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            You've booked <strong>{lesson.title}</strong>. A confirmation will be sent to <strong>{studentEmail}</strong>.
          </p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            The coach will reach out to schedule your session.
          </p>
          <button type="button" className="btn btn-primary" onClick={resetAndClose}>
            Done
          </button>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;
