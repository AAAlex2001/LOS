'use client';

import React, { useEffect, useState } from 'react';
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
import config from '@/config';

type Hospital = {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  image_url: string;
  order: number;
};

type PrivateClinic = Hospital;
type Dentistry = Hospital;
type VetClinic = Hospital;

type DoctorsGroup = {
  id: number;
  hospital_name: string;
  doctors: string[];
  order: number;
};

type YourDoctorPageData = {
  hospitals: Hospital[];
  private_clinics: PrivateClinic[];
  dentistries: Dentistry[];
  vet_clinics: VetClinic[];
  doctors_groups: DoctorsGroup[];
  logo_image_url: string;
  hospitals_hero_image_url: string;
};

const API_BASE = config.API_BASE;

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

  const [pageData, setPageData] = useState<YourDoctorPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/your-doctor/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load YourDoctor');
        const json = (await res.json()) as YourDoctorPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          {pageData.logo_image_url && (
            <div className={styles.logo}>
              <img
                src={`${API_BASE}/media/${pageData.logo_image_url}`}
                alt="Ваш доктор логотип"
                className={styles.logoImage}
                style={{ width: 100, height: 100 }}
              />
            </div>
          )}
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
                {pageData.hospitals_hero_image_url && (
                  <div className={styles.imageCard}>
                    <img
                      src={`${API_BASE}/media/${pageData.hospitals_hero_image_url}`}
                      alt="Больницы"
                      className={styles.cardImage}
                      style={{ background: 'transparent', width: '100%', height: 'auto' }}
                    />
                  </div>
                )}
                <div id="hospitals-content">
                  <YourDoctorHospitals hospitals={pageData.hospitals} />
                </div>
              </>
            ) : tab.id === 'private-clinics' ? (
              <YourDoctorPrivateClinics private_clinics={pageData.private_clinics} />
            ) : tab.id === 'dentistry' ? (
              <YourDoctorDentistry dentistries={pageData.dentistries} />
            ) : tab.id === 'doctors' ? (
              <YourDoctorDoctors doctors_groups={pageData.doctors_groups} />
            ) : tab.id === 'vet-clinics' ? (
              <YourDoctorVetClinics vet_clinics={pageData.vet_clinics} />
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