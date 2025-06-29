'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import CitiesSukhum from './CitiesSukhum';
import CitiesGagra from './CitiesGagra';
import CitiesPitsunda from './CitiesPitsunda';
import CitiesGudauta from './CitiesGudauta';
import CitiesNewafon from './CitiesNewafon';
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
        
        {/* Контент города Пицунда */}
        <CitiesPitsunda />
        
        {/* Контент города Гудаута */}
        <CitiesGudauta />
        
        {/* Контент города Новый Афон */}
        <CitiesNewafon />
      </main>

      <Footer />

      {/* Кнопка прокрутки вверх */}
      <ScrollToTop />
    </div>
  );
};

export default Cities; 