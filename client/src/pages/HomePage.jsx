import ContactForm from '../components/ContactForm';
import Testimonials from '../components/Testimonials';
import { Mail } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Trophy, Target, Users, Award, Clock, DollarSign } from 'lucide-react';

const HomePage = () => {
  const { state, fetchLessons } = useAppContext();
  const { lessons, loading, error, currentUser } = state;

  if (loading) return <LoadingSpinner message="Loading lessons..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchLessons} />;

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
          <Trophy size={64} style={{ display: 'block', margin: '0 auto 1rem' }} />
          <h1 style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
            lineHeight: 1.2
          }}>
            Tennis Lessons with {currentUser?.name || 'Daniil'}
          </h1>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            opacity: 0.95,
            maxWidth: '42rem',
            margin: '0 auto 2rem'
          }}>
            {currentUser?.bio || 'Professional tennis coaching for all skill levels'}
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/lessons"
              className="btn"
              style={{
                backgroundColor: 'white',
                color: '#10b981',
                fontSize: '1.125rem',
                padding: '1rem 2rem'
              }}
            >
              Book a Lesson
            </Link>
            <Link
              to="/rates"
              className="btn btn-secondary"
              style={{
                fontSize: '1.125rem',
                padding: '1rem 2rem'
              }}
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid grid-3" style={{ textAlign: 'center' }}>
            <div>
              <Target
                size={48}
                color="#10b981"
                style={{ display: 'block', margin: '0 auto 1rem' }}
              />
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {currentUser?.yearsExperience || 10}+
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>Years Experience</p>
            </div>
            <div>
              <Users
                size={48}
                color="#10b981"
                style={{ display: 'block', margin: '0 auto 1rem' }}
              />
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {lessons.length}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>Lesson Packages</p>
            </div>
            <div>
              <Award
                size={48}
                color="#10b981"
                style={{ display: 'block', margin: '0 auto 1rem' }}
              />
              <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                {currentUser?.ntrpRating || 5.5}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>NTRP Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb' }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0.5rem'
          }}>
            Featured Lesson Packages
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#6b7280',
            marginBottom: '3rem',
            fontSize: '1.125rem'
          }}>
            Choose the perfect package for your skill level
          </p>

          <div className="grid grid-3">
            {lessons.slice(0, 3).map((lesson) => (
              <div key={lesson._id} className="card" style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}>
                <div style={{
                  backgroundColor: lesson.level === 'Beginner' ? '#dbeafe' :
                    lesson.level === 'Intermediate' ? '#fed7aa' : '#fecaca',
                  color: lesson.level === 'Beginner' ? '#1e40af' :
                    lesson.level === 'Intermediate' ? '#c2410c' : '#991b1b',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  width: 'fit-content'
                }}>
                  {lesson.level}
                </div>

                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: '#111827'
                }}>
                  {lesson.title}
                </h3>

                <p style={{
                  color: '#6b7280',
                  marginBottom: '1.5rem',
                  flexGrow: 1,
                  lineHeight: 1.6
                }}>
                  {lesson.description}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Clock size={18} color="#6b7280" />
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      {lesson.duration} min
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <DollarSign size={24} color="#10b981" />
                    <span style={{
                      fontSize: '1.75rem',
                      fontWeight: 'bold',
                      color: '#10b981'
                    }}>
                      {lesson.price}
                    </span>
                  </div>
                </div>

                <Link
                  to="/lessons"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/lessons" className="btn btn-primary" style={{ fontSize: '1.125rem' }}>
              View All Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      {currentUser?.specialties && currentUser.specialties.length > 0 && (
        <section style={{ padding: '3rem 1rem', backgroundColor: 'white' }}>
          <div className="container">
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              My Specialties
            </h2>
            <div className="grid grid-3">
              {currentUser.specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="card"
                  style={{
                    textAlign: 'center',
                    backgroundColor: '#f0fdf4',
                    border: '2px solid #10b981'
                  }}
                >
                  <Award size={40} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#166534'
                  }}>
                    {specialty}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section style={{
        padding: '4rem 1rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Ready to Improve Your Game?
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '2rem',
            fontSize: '1.25rem',
            maxWidth: '36rem',
            margin: '0 auto 2rem'
          }}>
            Book your first lesson today and start your tennis journey with professional coaching!
          </p>
          <Link
            to="/lessons"
            className="btn btn-primary"
            style={{ fontSize: '1.125rem', padding: '1rem 2.5rem' }}
          >
            Get Started Now
          </Link>
        </div>
      </section>
      {/* Testimonials Section */}
      <section style={{ padding: '4rem 1rem', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#111827'
            }}>
              What My Students Say
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Real feedback from students who've improved their game
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{
        padding: '4rem 1rem',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
      }}>
        <div className="container">
          <div className="grid grid-2" style={{ gap: '3rem', alignItems: 'center' }}>
            {/* Left Side - Info */}
            <div>
              <Mail size={48} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#111827'
              }}>
                Get In Touch
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.125rem',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}>
                Ready to take your tennis game to the next level? Send me a message
                and let's discuss your goals and how I can help you achieve them.
              </p>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  📧 Email
                </h3>
                <p style={{ color: '#6b7280' }}>khitroudaniil@gmail.com</p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  📞 Phone
                </h3>
                <p style={{ color: '#6b7280' }}>(616) 500-6583</p>
              </div>

              <div>
                <h3 style={{
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  color: '#111827'
                }}>
                  📍 Location
                </h3>
                <p style={{ color: '#6b7280' }}>Chicago, Illinois</p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="card" style={{ backgroundColor: 'white', padding: '2rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#111827'
              }}>
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


