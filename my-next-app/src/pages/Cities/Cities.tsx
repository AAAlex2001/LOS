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
import CitiesGulripsh from './CitiesGulripsh';
import CitiesOchamchira from './CitiesOchamchira';
import CitiesTkuarchal from './CitiesTkuarchal';
import CitiesGal from './CitiesGal';
import styles from './Cities.module.scss';
import { useTranslations } from '@/i18n/LocaleContext';

const Cities: React.FC = () => {
  const t = useTranslations('cities');

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{t('title')}</h1>

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
        
        {/* Контент города Гулрыпш */}
        <CitiesGulripsh />
        
        {/* Контент города Очамчыра */}
        <CitiesOchamchira />
        
        {/* Контент города Ткуарчал */}
        <CitiesTkuarchal />
        
        {/* Контент города Гал */}
        <CitiesGal />
      </main>

      <Footer />

      {/* Кнопка прокрутки вверх */}
      <ScrollToTop />
    </div>
  );
};

export default Cities; 