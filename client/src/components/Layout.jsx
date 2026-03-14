import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const GOLD = '#c9a84c';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        backgroundColor: '#080808',
        borderTop: '1px solid #1a1a1a',
        padding: '3rem 1rem 2rem',
        marginTop: '4rem',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: GOLD, opacity: 0.5 }} />
            <span style={{ color: GOLD, fontSize: '1.125rem', fontFamily: "'Playfair Display', serif", letterSpacing: '0.05em' }}>
              Tennis with Daniil
            </span>
            <div style={{ width: '24px', height: '1px', backgroundColor: GOLD, opacity: 0.5 }} />
          </div>
          <p style={{ color: '#444', fontSize: '0.8125rem', letterSpacing: '0.04em' }}>
            &copy; 2026 Tennis with Daniil. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
