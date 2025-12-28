"use client";

import React, { useEffect, useState } from 'react';
import '@/styles/styles.scss';
import { useLocale } from '@/i18n/LocaleContext';

const SCROLL_THRESHOLD = 200; // px

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  // Try to get locale context, but don't fail if it's not available
  let ariaLabel = 'Scroll to top';
  try {
    const { locale } = useLocale();
    ariaLabel = locale === 'ru' ? 'Наверх' : 'Scroll to top';
  } catch {
    // Provider not available, use default
  }

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
      aria-label={ariaLabel}
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTop; 