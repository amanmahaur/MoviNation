import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Loading from './components/Loading/Loading';  
import { Toaster } from 'react-hot-toast';
import { MovieProvider } from './contexts/MovieContext/MovieContext';

function Layout() {
  const [loading, setLoading] = useState(true);

  const bgStyle = {
    backgroundImage: "url('https://img.freepik.com/premium-photo/purple-watercolor-background_3590-12.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: 'rgb(0, 0, 0)'
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <MovieProvider>
      <div style={bgStyle} className=' flex flex-col min-h-screen'>
        <Header />
        <main className='flex-grow'>
          <Outlet />
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </MovieProvider>
  );
}

export default Layout;
