'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacyTkuarchal.module.scss';

// Данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Здоровье-2008',
    workingHours: 'с 09:00 до 15:00',
    address: 'Ткуарчал, просп. Владислава Ардзинба, 13',
    addressLink: 'https://yandex.com/maps/-/CDxd6TpG',
    contacts: null,
    image: '/assets/PharmacyTkuarchal1.jpg'
  },
];

const PharmacyTkuarchal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Ткуарчал: аптеки</h1>
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

export default PharmacyTkuarchal; 