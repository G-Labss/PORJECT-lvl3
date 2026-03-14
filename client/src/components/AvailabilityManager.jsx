import React, { useState, useEffect } from 'react';
import { availabilityAPI } from '../services/api';
import { Save, Loader, Check } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 13 }, (_, i) => {
  const h = i + 8; // 8am to 8pm
  return `${h.toString().padStart(2, '0')}:00`;
});

const GOLD = '#c9a84c';

function formatHour(time24) {
  const [h] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour} ${ampm}`;
}

const AvailabilityManager = () => {
  // active[dayIndex] = Set of startTime strings
  const [active, setActive] = useState(() =>
    Array.from({ length: 7 }, () => new Set())
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    availabilityAPI.getSlots()
      .then(data => {
        const newActive = Array.from({ length: 7 }, () => new Set());
        // slots have dayOfWeek (0=Mon...6=Sun in our model)
        (data.slots || []).forEach(slot => {
          if (slot.isActive && slot.dayOfWeek >= 0 && slot.dayOfWeek <= 6) {
            newActive[slot.dayOfWeek].add(slot.startTime);
          }
        });
        setActive(newActive);
      })
      .catch(() => setError('Failed to load schedule.'))
      .finally(() => setLoading(false));
  }, []);

  function toggle(dayIndex, time) {
    setActive(prev => {
      const next = prev.map(s => new Set(s));
      if (next[dayIndex].has(time)) {
        next[dayIndex].delete(time);
      } else {
        next[dayIndex].add(time);
      }
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const slots = [];
      active.forEach((times, dayIndex) => {
        times.forEach(startTime => {
          slots.push({ dayOfWeek: dayIndex, startTime, isActive: true });
        });
      });
      await availabilityAPI.upsert(slots);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save schedule.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: GOLD }}>
        <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  const totalSlots = active.reduce((sum, s) => sum + s.size, 0);

  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '1.5rem',
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
            Weekly Schedule
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Click cells to toggle available time slots. Changes are saved when you click Save.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.625rem 1.25rem',
            backgroundColor: saved ? '#065f46' : GOLD,
            color: saved ? '#fff' : '#000',
            border: 'none', borderRadius: '0.5rem',
            fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem', transition: 'all 0.2s',
          }}
        >
          {saving ? <Loader size={16} /> : saved ? <Check size={16} /> : <Save size={16} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : `Save (${totalSlots} slots)`}
        </button>
      </div>

      {error && (
        <p style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>
      )}

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px repeat(7, 1fr)',
          backgroundColor: '#f9fafb',
          borderBottom: '2px solid #e5e7eb',
        }}>
          <div style={{ padding: '0.75rem', borderRight: '1px solid #e5e7eb' }} />
          {DAYS.map((day, i) => (
            <div key={i} style={{
              padding: '0.75rem 0.5rem',
              textAlign: 'center',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: '#374151',
              borderRight: i < 6 ? '1px solid #e5e7eb' : 'none',
            }}>
              {day.slice(0, 3).toUpperCase()}
              <div style={{
                fontSize: '0.7rem', color: '#9ca3af', fontWeight: 400, marginTop: '0.1rem',
              }}>
                {active[i].size > 0 ? `${active[i].size} slot${active[i].size > 1 ? 's' : ''}` : '—'}
              </div>
            </div>
          ))}
        </div>

        {/* Time rows */}
        {HOURS.map((time, hi) => (
          <div key={hi} style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)',
            borderBottom: hi < HOURS.length - 1 ? '1px solid #f3f4f6' : 'none',
          }}>
            <div style={{
              padding: '0.6rem 0.75rem',
              fontSize: '0.75rem',
              color: '#9ca3af',
              borderRight: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
            }}>
              {formatHour(time)}
            </div>
            {DAYS.map((_, di) => {
              const isOn = active[di].has(time);
              return (
                <div
                  key={di}
                  onClick={() => toggle(di, time)}
                  style={{
                    padding: '0.4rem',
                    borderRight: di < 6 ? '1px solid #f3f4f6' : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.1s',
                    backgroundColor: isOn ? '#fef9ec' : 'transparent',
                  }}
                  title={isOn ? `Remove ${DAYS[di]} ${formatHour(time)}` : `Add ${DAYS[di]} ${formatHour(time)}`}
                >
                  <div style={{
                    width: '32px', height: '28px',
                    borderRadius: '0.375rem',
                    backgroundColor: isOn ? GOLD : '#f3f4f6',
                    border: isOn ? `2px solid ${GOLD}` : '2px solid #e5e7eb',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {isOn && <Check size={14} color="#000" strokeWidth={3} />}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.75rem', textAlign: 'center' }}>
        Gold cells = available to students. Click any cell to toggle. Don't forget to save!
      </p>
    </div>
  );
};

export default AvailabilityManager;
