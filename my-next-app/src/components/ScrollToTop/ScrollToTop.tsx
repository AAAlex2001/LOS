"use client";

import React, { useEffect, useState } from 'react';
import '@/styles/styles.scss';

const SCROLL_THRESHOLD = 200; // px

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // сразу проверяем положение скролла
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`scroll-to-top-btn${visible ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label="Наверх"
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTop; 