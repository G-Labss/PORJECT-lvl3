import React from 'react';
import { LogIn } from 'lucide-react';
import useForm from '../hooks/useForm';

const LoginPage = () => {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    async (data) => {
      // Simulate login - in real app this would call backend
      console.log('Login attempt:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Login functionality coming soon!');
    }
  );

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundColor: '#f9fafb'
    }}>
      <div className="card" style={{ maxWidth: '28rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <LogIn 
            size={48} 
            color="#10b981" 
            style={{ display: 'block', margin: '0 auto 1rem' }} 
          />
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem',
            color: '#111827'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#6b7280' }}>Sign in to manage your lessons</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="form-input"
              placeholder="your@email.com"
              required
              disabled={isSubmitting}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-input"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              cursor: 'pointer'
            }}>
              <input type="checkbox" />
              Remember me
            </label>
            <a 
              href="#" 
              style={{ 
                color: '#10b981', 
                fontSize: '0.875rem',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Forgot password?
            </a>
          </div>

          {errors.general && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              borderRadius: '0.5rem',
              marginBottom: '1rem',
              fontSize: '0.875rem'
            }}>
              {errors.general}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
            Don't have an account?{' '}
            <a 
              href="#" 
              style={{ 
                color: '#10b981', 
                fontWeight: 600,
                textDecoration: 'none'
              }}
            >
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;