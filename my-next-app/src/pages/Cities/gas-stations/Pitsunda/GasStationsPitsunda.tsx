'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsPitsunda.module.scss';

// Данные АЗС
const gasStations = [
  {
    id: 1,
    name: 'Роснефть',
    name_link: null,
    address: 'Гагрский район, посёлок Бзыпта, Сухумское шоссе',
    addressLink: 'https://yandex.com/maps/-/CDHbZFnh',
    contacts: '+7 (940) 777-67-51',
    workingHours: 'круглосуточно',
    image: '/assets/GasStationsPitsunda1.jpg'
  }
];

const GasStationsPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: автозаправочные станции</h1>
        </section>

        <section className={styles.cardsSection}>
          {gasStations.map((station) => (
            <div key={station.id} className={styles.gasStationCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={station.image}
                  alt={station.name}
                  fill
                  className={styles.gasStationImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.gasStationName}>
                  {station.name_link ? (
                    <a href={station.name_link} target="_blank" rel="noopener noreferrer">
                      {station.name}
                    </a>
                  ) : (
                    station.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${station.addressLink ? styles.addressLink : ''}`}>
                      {station.addressLink ? (
                        <a href={station.addressLink} target="_blank" rel="noopener noreferrer">{station.address}</a>
                      ) : (
                        station.address
                      )}
                    </span>
                  </div>
                  
                  {station.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{station.contacts}</span>
                    </div>
                  )}

                  {station.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{station.workingHours}</span>
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

export default GasStationsPitsunda; 