import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{
        backgroundColor: '#111827',
        color: 'white',
        padding: '2rem 1rem',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <p>&copy; 2026 Tennis with Daniil. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;