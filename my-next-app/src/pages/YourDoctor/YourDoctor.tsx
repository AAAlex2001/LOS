'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './YourDoctor.module.scss';
import tabStyles from './MainTabs.module.scss';

const YourDoctor: React.FC = () => {
  const tabs = [
    { id: 'hospitals', name: 'Больницы' },
    { id: 'private-clinics', name: 'Частные клиники' },
    { id: 'dentistry', name: 'Стоматология' },
    { id: 'doctors', name: 'Врачи' },
    { id: 'vet-clinics', name: 'Вет. клиники' },
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
          <div className={styles.logo}>
            {/* Placeholder for logo */}
          </div>
          <div className={styles.titleTextContainer}>
            <h1 className={styles.mainTitle}>Ваш доктор</h1>
          </div>
        </section>

        <section className={tabStyles.mainTabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={tabStyles.tabItem}
              onClick={() => scrollToSection(tab.id)}
            >
              <div className={tabStyles.tabLabel}>{tab.name}</div>
            </div>
          ))}
        </section>

        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.id}
            className={`${styles.tabContent} ${index === 0 ? styles.hasImageCard : ''}`}
          >
            {index === 0 && (
              <div className={styles.imageCard}>
                <Image
                  src="/assets/city_sukhum.jpg"
                  alt="Сухум"
                  layout="responsive"
                  width={1872}
                  height={1248}
                  className={styles.cardImage}
                />
              </div>
            )}
          </div>
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default YourDoctor; 