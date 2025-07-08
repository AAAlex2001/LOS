'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './Important.module.scss';
import tabStyles from './MainTabs.module.scss';

const Important: React.FC = () => {
  const tabs = [
    { id: 'tourist-pharmacy', name: 'Туристическая аптечка' },
    { id: 'emergency-phones', name: 'Телефоны экстренной помощи' },
    { id: 'public-behavior', name: 'Правила поведения в общественных местах' },
    { id: 'taxi-etiquette', name: 'Такси-этикет' },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <div className={styles.titleTextContainer}>
            <h1 className={styles.mainTitle}>Важно знать</h1>
          </div>
        </section>

        <section className={tabStyles.mainTabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={tabStyles.tabItem}
              onClick={() => scrollToSection(tab.id)}
            >
              <div className={tabStyles.tabLabel}>
                <span>{tab.name}</span>
              </div>
            </div>
          ))}
        </section>

        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.id}
            className={styles.tabContent}
          >
            <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2>Контент для раздела "{tab.name}" будет здесь.</h2>
            </div>
          </div>
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Important; 