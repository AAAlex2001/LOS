'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import CitiesSukhum from './CitiesSukhum';
import CitiesGagra from './CitiesGagra';
import styles from './Cities.module.scss';

const Cities: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Города Абхазии</h1>

        {/* Контент города Сухум */}
        <CitiesSukhum />
        
        {/* Контент города Гагра */}
        <CitiesGagra />
      </main>

      <Footer />

      {/* Кнопка прокрутки вверх */}
      <ScrollToTop />
    </div>
  );
};

export default Cities; 