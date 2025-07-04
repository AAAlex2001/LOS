'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsGudauta.module.scss';

// Данные АЗС
const gasStations = [
  {
    id: 1,
    name: 'АЗИД',
    nameLink: 'https://azid.org/index.php/nash-azs',
    address: 'Гудаута, пос. Бамбора ,Гагрское шоссе',
    addressLink: 'https://yandex.com/maps/-/CDxryKMK',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsGudauta1.jpg'
  },
  {
    id: 2,
    name: 'Подорожник',
    nameLink: 'https://apsny-oil.info/',
    address: 'Гудаутский район, село Хыпста, поселок Бамбора',
    addressLink: 'https://yandex.com/maps/-/CDxry8l7',
    contacts: '+7 (940) 762-00-00',
    image: '/assets/GasStationsGudauta2.jpg'
  }
];

const GasStationsGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: автозаправочные станции</h1>
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

export default GasStationsGudauta; 