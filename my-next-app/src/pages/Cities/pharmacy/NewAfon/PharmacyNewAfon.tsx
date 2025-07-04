'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacyNewAfon.module.scss';

// Данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Аптека',
    workingHours: 'с 08:00 до 21:00',
    address: 'ул. Харазия, 2, Новый Афон',
    addressLink: 'https://yandex.com/maps/-/CDxKB2pq',
    contacts: null,
    image: '/assets/PharmacyNewAfon1.jpg'
  },
  {
    id: 2,
    name: 'Аптека Vitafarm',
    workingHours: 'с 09:00 до 22:00',
    address: 'ул. Лакоба, 32, Новый Афон',
    addressLink: 'https://maps.app.goo.gl/jTPNNDWxVmDgUfrW7',
    contacts: null,
    image: '/assets/PharmacyNewAfon2.jpg'
  },
  {
    id: 3,
    name: 'Raketa Market',
    workingHours: 'с 09:00 до 20:00',
    address: 'ул. Харазия, 40, Новый Афон',
    addressLink: 'https://yandex.com/maps/-/CDxKFJoc',
    contacts: '+7 (940) 707-21-21',
    image: '/assets/PharmacyNewAfon3.jpg'
  }
];

const PharmacyNewAfon: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Новый Афон: аптеки</h1>
        </section>

        <section className={styles.cardsSection}>
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className={styles.pharmacyCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  fill
                  className={styles.pharmacyImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.pharmacyName}>
                  {pharmacy.name}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${pharmacy.addressLink ? styles.addressLink : ''}`}>
                      {pharmacy.addressLink ? (
                        <a href={pharmacy.addressLink} target="_blank" rel="noopener noreferrer">{pharmacy.address}</a>
                      ) : (
                        pharmacy.address
                      )}
                    </span>
                  </div>
                  
                  {pharmacy.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{pharmacy.contacts}</span>
                    </div>
                  )}
                  
                  {pharmacy.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{pharmacy.workingHours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PharmacyNewAfon; 