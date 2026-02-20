import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Award, Target, Calendar, TrendingUp, CheckCircle, Trophy } from 'lucide-react';

const AboutPage = () => {
    const { state } = useAppContext();
    const { currentUser } = state;

    const achievements = [
        { icon: Trophy, title: 'ITF lvl 1 certified', description: 'Professional Tennis Registry Certification' },
        { icon: Award, title: 'NTRP 6.5 Rated and 7.0 in the past' },
        { icon: Target, title: '100+ Students Coached', description: 'Helping players of all levels since 2015' },
        { icon: TrendingUp, title: '95% Success Rate', description: 'Students reach their goals within 3-6 months' },
    ];

    const timeline = [
        { year: '2018', event: 'Started professional coaching career' },
        { year: '2019', event: 'Opened private coaching practice' },
        { year: '2021', event: 'Reached 100+ students milestone' },
        { year: '2023', event: 'Expanded to group coaching programs' },
        { year: '2025', event: 'Launched online coaching platform' },
    ];

    const philosophyPoints = [
        'Personalized training programs tailored to each student\'s goals',
        'Focus on both technical skills and mental game development',
        'Emphasis on proper form to prevent injuries',
        'Video analysis to track progress and identify areas for improvement',
        'Positive reinforcement and building confidence on court',
        'Strategic game planning for competitive players',
    ];

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '4rem 1rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10b981',
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        margin: '0 auto 2rem',
                        border: '4px solid rgba(255, 255, 255, 0.3)'
                    }}>
                        {currentUser?.name?.charAt(0) || 'D'}
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
                        About {currentUser?.name || 'Me'}
                    </h1>
                    <p style={{ fontSize: '1.25rem', opacity: 0.95, maxWidth: '42rem', margin: '0 auto' }}>
                        Passionate tennis coach dedicated to helping players unlock their full potential
                    </p>
                </div>
            </section>

            {/* Bio Section */}
            <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
                <div className="container">
                    <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                                My Story
                            </h2>
                            <div style={{ color: '#6b7280', lineHeight: 1.8, fontSize: '1.0625rem' }}>
                                <p style={{ marginBottom: '1rem' }}>
                                    {currentUser?.bio || 'Tennis has been my passion for over 18 years. What started as a childhood hobby evolved into a lifelong dedication to the sport.'}
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    After competing at the collegiate level, I discovered my true calling: teaching others to love the game as much as I do. There's nothing more rewarding than watching a student's face light up when they finally nail that serve they've been working on for weeks.
                                </p>
                                <p style={{ marginBottom: '1rem' }}>
                                    My coaching philosophy is simple: meet students where they are and guide them to where they want to be. Whether you're picking up a racket for the first time or looking to compete at a higher level, I'm here to help you achieve your tennis goals.
                                </p>
                                <p>
                                    With {currentUser?.yearsExperience || 10}+ years of coaching experience and an NTRP rating of {currentUser?.ntrpRating || 6.5}, I bring both expertise and enthusiasm to every lesson.
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="card" style={{ backgroundColor: '#f0fdf4', border: '2px solid #10b981', padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#166534' }}>
                                    Quick Facts
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CheckCircle size={24} color="#10b981" />
                                        <div>
                                            <strong style={{ color: '#166534' }}>Experience:</strong>
                                            <span style={{ color: '#166534', marginLeft: '0.5rem' }}>
                                                {currentUser?.yearsExperience || 10}+ years
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CheckCircle size={24} color="#10b981" />
                                        <div>
                                            <strong style={{ color: '#166534' }}>NTRP Rating:</strong>
                                            <span style={{ color: '#166534', marginLeft: '0.5rem' }}>
                                                {currentUser?.ntrpRating || 5.5}
                                            </span>
                                        </div>
                                    </div>
                                    {currentUser?.specialties && currentUser.specialties.map((specialty, index) => (
                                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <CheckCircle size={24} color="#10b981" />
                                            <span style={{ color: '#166534' }}>{specialty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Grid */}
            <section style={{ padding: '4rem 1rem', backgroundColor: '#f9fafb' }}>
                <div className="container">
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        color: '#111827'
                    }}>
                        Achievements & Credentials
                    </h2>
                    <div className="grid grid-2" style={{ gap: '2rem' }}>
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'start',
                                    gap: '1.5rem',
                                    padding: '2rem',
                                    backgroundColor: 'white',
                                    transition: 'transform 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '0.75rem',
                                    backgroundColor: '#f0fdf4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <achievement.icon size={32} color="#10b981" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827' }}>
                                        {achievement.title}
                                    </h3>
                                    <p style={{ color: '#6b7280', lineHeight: 1.6 }}>
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coaching Philosophy */}
            <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <Target size={48} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                                My Coaching Philosophy
                            </h2>
                            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
                                What guides my approach to tennis instruction
                            </p>
                        </div>
                        <div className="grid grid-1" style={{ gap: '1rem' }}>
                            {philosophyPoints.map((point, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'start',
                                        gap: '1rem',
                                        padding: '1.5rem',
                                        backgroundColor: '#f9fafb',
                                        borderRadius: '0.75rem',
                                        borderLeft: '4px solid #10b981'
                                    }}
                                >
                                    <CheckCircle size={24} color="#10b981" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                                    <p style={{ color: '#374151', lineHeight: 1.6, margin: 0 }}>
                                        {point}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section style={{ padding: '4rem 1rem', backgroundColor: '#f9fafb' }}>
                <div className="container">
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '3rem',
                        color: '#111827'
                    }}>
                        My Journey
                    </h2>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    gap: '2rem',
                                    marginBottom: index < timeline.length - 1 ? '2rem' : 0,
                                    position: 'relative'
                                }}
                            >
                                {/* Timeline Line */}
                                {index < timeline.length - 1 && (
                                    <div style={{
                                        position: 'absolute',
                                        left: '2.4375rem',
                                        top: '3rem',
                                        bottom: '-2rem',
                                        width: '2px',
                                        backgroundColor: '#e5e7eb'
                                    }} />
                                )}

                                {/* Year Badge */}
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    flexShrink: 0,
                                    position: 'relative',
                                    zIndex: 1,
                                    border: '4px solid white',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                    {item.year}
                                </div>

                                {/* Event Description */}
                                <div className="card" style={{
                                    flex: 1,
                                    padding: '1.5rem',
                                    backgroundColor: 'white',
                                    marginTop: '0.75rem'
                                }}>
                                    <p style={{ color: '#374151', fontWeight: 500, fontSize: '1.0625rem', margin: 0 }}>
                                        {item.event}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '4rem 1rem',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>
                        Ready to Start Your Tennis Journey?
                    </h2>
                    <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '1.25rem' }}>
                        Let's work together to achieve your tennis goals!
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/lessons" className="btn btn-primary" style={{
                            fontSize: '1.125rem',
                            padding: '1rem 2.5rem',
                            textDecoration: 'none'
                        }}>
                            View Lesson Packages
                        </a>
                        <a href="/#contact" className="btn btn-secondary" style={{
                            fontSize: '1.125rem',
                            padding: '1rem 2.5rem',
                            textDecoration: 'none'
                        }}>
                            Get In Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;