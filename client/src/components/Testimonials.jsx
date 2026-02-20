import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        rating: 5,
        text: 'Daniil transformed my game completely! His patient teaching style and attention to detail helped me improve my serve by 40%. Highly recommend!',
        role: 'Intermediate Player',
        image: 'SJ',
    },
    {
        id: 2,
        name: 'Michael Chen',
        rating: 5,
        text: 'Best tennis coach I\'ve ever had. The strategic approach to match play has taken my game to the next level. Worth every penny!',
        role: 'Advanced Player',
        image: 'MC',
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        rating: 5,
        text: 'As a beginner, I was nervous about starting tennis. Daniil made me feel comfortable from day one. Now I play twice a week and love it!',
        role: 'Beginner',
        image: 'ER',
    },
];

const StarRating = ({ rating }) => {
    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={18}
                    color="#f59e0b"
                    fill={star <= rating ? '#f59e0b' : 'none'}
                />
            ))}
        </div>
    );
};

const Testimonials = () => {
    return (
        <div className="grid grid-3" style={{ gap: '1.5rem' }}>
            {testimonials.map((testimonial) => (
                <div
                    key={testimonial.id}
                    className="card"
                    style={{
                        position: 'relative',
                        padding: '2rem 1.5rem',
                        backgroundColor: 'white',
                        border: '2px solid #f3f4f6',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#f3f4f6';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                    }}
                >
                    {/* Quote Icon */}
                    <Quote
                        size={40}
                        color="#10b981"
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            opacity: 0.2,
                        }}
                    />

                    {/* Rating */}
                    <div style={{ marginBottom: '1rem' }}>
                        <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Testimonial Text */}
                    <p
                        style={{
                            color: '#374151',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem',
                            fontSize: '0.9375rem',
                            fontStyle: 'italic',
                        }}
                    >
                        "{testimonial.text}"
                    </p>

                    {/* Author Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                backgroundColor: '#10b981',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.125rem',
                            }}
                        >
                            {testimonial.image}
                        </div>
                        <div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>
                                {testimonial.name}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                                {testimonial.role}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;