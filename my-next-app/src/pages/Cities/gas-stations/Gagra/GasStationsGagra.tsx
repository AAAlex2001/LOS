'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsGagra.module.scss';

// Данные АЗС
const gasStations = [
  {
    id: 1,
    name: 'Азид',
    nameLink: null,
    address: 'Сухумское ш., 20',
    addressLink: 'https://yandex.ru/maps/-/CDSLyY0T',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsGagra1.jpg'
  },
  {
    id: 2,
    name: 'АЗК № 2 Роснефть',
    nameLink: null,
    address: 'Гагрский район, посёлок Бзыпта, Сухумское шоссе',
    addressLink: 'https://yandex.ru/maps/-/CDSLyBMM',
    contacts: '+7 (940) 777-67-51',
    image: '/assets/GasStationsGagra2.jpg'
  },
  {
    id: 3,
    name: 'Подорожник',
    nameLink: null,
    address: 'Гагрский район, посёлок городского типа Бзыпта',
    addressLink: 'https://yandex.ru/maps/-/CDSLy60q',
    contacts: '+7 (940) 762-00-00',
    image: '/assets/GasStationsGagra3.jpg'
  }
];

const GasStationsGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: автозаправочные станции</h1>
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
                  {station.nameLink ? (
                    <a href={station.nameLink} target="_blank" rel="noopener noreferrer">
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
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Контакты:</span>
                    <span className={styles.infoValue}>{station.contacts}</span>
                  </div>
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

export default GasStationsGagra; 