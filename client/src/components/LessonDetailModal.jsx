import React from 'react';
import Modal from './Modal';
import { Clock, Users, DollarSign, Award, Calendar, Target } from 'lucide-react';

const LessonDetailModal = ({ lesson, isOpen, onClose }) => {
    if (!lesson) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={lesson.title}>
            <div>
                {/* Level Badge */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <span
                        style={{
                            backgroundColor:
                                lesson.level === 'Beginner'
                                    ? '#dbeafe'
                                    : lesson.level === 'Intermediate'
                                        ? '#fed7aa'
                                        : '#fecaca',
                            color:
                                lesson.level === 'Beginner'
                                    ? '#1e40af'
                                    : lesson.level === 'Intermediate'
                                        ? '#c2410c'
                                        : '#991b1b',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                        }}
                    >
                        {lesson.level}
                    </span>
                </div>

                {/* Description */}
                <p
                    style={{
                        color: '#6b7280',
                        lineHeight: 1.6,
                        marginBottom: '2rem',
                        fontSize: '1rem',
                    }}
                >
                    {lesson.description}
                </p>

                {/* Details Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem',
                        marginBottom: '2rem',
                    }}
                >
                    <div
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                        }}
                    >
                        <Clock size={24} color="#10b981" />
                        <div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Duration</div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>
                                {lesson.duration} minutes
                            </div>
                        </div>
                    </div>

                    <div
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                        }}
                    >
                        <DollarSign size={24} color="#10b981" />
                        <div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Price</div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>${lesson.price}</div>
                        </div>
                    </div>

                    <div
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                        }}
                    >
                        <Users size={24} color="#10b981" />
                        <div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Class Size</div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>
                                Max {lesson.maxStudents} student{lesson.maxStudents > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    <div
                        className="card"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '1rem',
                        }}
                    >
                        <Award size={24} color="#10b981" />
                        <div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Skill Level</div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>{lesson.level}</div>
                        </div>
                    </div>
                </div>

                {/* What You'll Learn */}
                <div
                    style={{
                        backgroundColor: '#f0fdf4',
                        padding: '1.5rem',
                        borderRadius: '0.75rem',
                        marginBottom: '2rem',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '1.125rem',
                            fontWeight: 'bold',
                            color: '#166534',
                            marginBottom: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <Target size={20} />
                        What You'll Learn
                    </h3>
                    <ul style={{ color: '#166534', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
                        <li>Proper technique and form</li>
                        <li>Strategic game play</li>
                        <li>Physical conditioning for tennis</li>
                        <li>Mental preparation and focus</li>
                    </ul>
                </div>

                {/* Coach Info */}
                {lesson.coach && (
                    <div
                        className="card"
                        style={{
                            backgroundColor: '#f9fafb',
                            padding: '1.5rem',
                            marginBottom: '1.5rem',
                        }}
                    >
                        <h3
                            style={{
                                fontSize: '1.125rem',
                                fontWeight: 'bold',
                                color: '#111827',
                                marginBottom: '0.75rem',
                            }}
                        >
                            Your Coach
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                {lesson.coach.name?.charAt(0) || 'D'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, color: '#111827', fontSize: '1.125rem' }}>
                                    {lesson.coach.name}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                                    NTRP Rating: {lesson.coach.ntrpRating}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Buttons */}
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #e5e7eb',
                    }}
                >
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        onClick={() => alert('Booking functionality coming soon!')}
                    >
                        <Calendar size={20} />
                        Book This Lesson
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                        style={{ flex: '0 0 auto' }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LessonDetailModal;