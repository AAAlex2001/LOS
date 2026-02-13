"use client";

import React, { useEffect, useState } from 'react';
import '@/styles/styles.scss';
import { useLocale } from '@/i18n/LocaleContext';

const SCROLL_THRESHOLD = 200; // px

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  const [ariaLabel, setAriaLabel] = useState('Scroll to top');

  React.useEffect(() => {
    try {
      const htmlLang = document.documentElement.lang;
      if (htmlLang && htmlLang.startsWith('ru')) {
        setAriaLabel('Наверх');
        return;
      }

      const segments = window.location.pathname.split('/');
      if (segments[1] === 'ru') {
        setAriaLabel('Наверх');
        return;
      }

      setAriaLabel('Scroll to top');
    } catch {
      setAriaLabel('Scroll to top');
    }
  }, []);

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
      suppressHydrationWarning
      className={`scroll-to-top-btn${visible ? ' show' : ''}`}
      onClick={scrollToTop}
      aria-label={ariaLabel}
    >
      <i className="fas fa-arrow-up" aria-hidden="true"></i>
    </button>
  );
};

export default ScrollToTop; 