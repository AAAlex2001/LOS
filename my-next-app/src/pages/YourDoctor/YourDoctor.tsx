'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './YourDoctor.module.scss';
import tabStyles from './MainTabs.module.scss';
import YourDoctorHospitals from './YourDoctorHospitals';
import YourDoctorPrivateClinics from './YourDoctorPrivateClinics';
import YourDoctorDentistry from './YourDoctorDentistry';
import YourDoctorVetClinics from './YourDoctorVetClinics';
import YourDoctorDoctors from './YourDoctorDoctors';

const YourDoctor: React.FC = () => {
  const tabs = [
    { id: 'hospitals', name: 'Больницы' },
    { id: 'private-clinics', name: 'Частные клиники' },
    { id: 'dentistry', name: 'Стоматология' },
    { id: 'doctors', name: 'Врачи' },
    { id: 'vet-clinics', name: 'Вет. клиники' },
  ];

  const scrollToSection = (sectionId: string) => {
    // Для больниц скроллим к блоку больниц, а не к картинке
    const targetId = sectionId === 'hospitals' ? 'hospitals-content' : sectionId;
    const section = document.getElementById(targetId);
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
            className={`${styles.tabContent} ${(index === 0 || index === 1 || index === 2 || index === 3 || index === 4) ? styles.hasImageCard : ''}`}
          >
            {tab.id === 'hospitals' ? (
              <>
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
                <div id="hospitals-content">
                  <YourDoctorHospitals />
                </div>
              </>
            ) : tab.id === 'private-clinics' ? (
              <YourDoctorPrivateClinics />
            ) : tab.id === 'dentistry' ? (
              <YourDoctorDentistry />
            ) : tab.id === 'doctors' ? (
              <YourDoctorDoctors />
            ) : tab.id === 'vet-clinics' ? (
              <YourDoctorVetClinics />
            ) : (
              <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Контент для раздела "{tab.name}" будет здесь.</h2>
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