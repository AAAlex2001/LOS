'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesGudauta.module.scss';

// Данные виноделен
const wineries = [
  {
    id: 1,
    name: 'Домашнее вино',
    workingHours: 'с 10:00 до 19:00',
    address: 'Гудаута, ул. Дзидзария, 30',
    addressLink: null,
    contacts: '+7 (940) 926-26-30',
    image: '/assets/WineriesGudauta1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'Дегустационный зал Гудаутского винзавода',
    workingHours: 'с 10:00 до 20:00',
    address: 'Гудаута, Гагрское шоссе',
    addressLink: 'https://yandex.com/maps/-/CDxryYKT',
    contacts: '+7 (940) 936-07-73',
    image: '/assets/WineriesGudauta2.jpg',
    name_link: null,
  }
];

const WineriesGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: винодельни</h1>
        </section>

        <section className={styles.cardsSection}>
          {wineries.map((winery) => (
            <div key={winery.id} className={styles.wineryCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={winery.image}
                  alt={winery.name}
                  fill
                  className={styles.wineryImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.wineryName}>
                  {winery.name_link ? (
                    <a href={winery.name_link} target="_blank" rel="noopener noreferrer">
                      {winery.name}
                    </a>
                  ) : (
                    winery.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {winery.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{winery.workingHours}</span>
                    </div>
                  )}
                  
                  {winery.address && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Адрес:</span>
                      <span className={`${styles.infoValue} ${winery.addressLink ? styles.addressLink : ''}`}>
                        {winery.addressLink ? (
                          <a href={winery.addressLink} target="_blank" rel="noopener noreferrer">{winery.address}</a>
                        ) : (
                          winery.address
                        )}
                      </span>
                    </div>
                  )}
                  
                  {winery.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{winery.contacts}</span>
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

export default WineriesGudauta;
