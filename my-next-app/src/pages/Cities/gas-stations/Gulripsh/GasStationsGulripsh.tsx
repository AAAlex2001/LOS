'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsGulripsh.module.scss';

// Данные АЗС
const gasStations = [
  {
    id: 1,
    name: 'Азид',
    nameLink: 'https://www.instagram.com/azid_abh/?igsh=MWNrOWZ5dGplMzM5MQ%3D%3D',
    address: 'посёлок Тхубын, Абжуйское ш., 41',
    addressLink: 'https://yandex.com/maps/-/CDxHiB3G',
    contacts: null,
    image: '/assets/GasStationsGulripsh1.jpg'
  },
  {
    id: 2,
    name: 'Азид',
    nameLink: 'https://www.azid.org/',
    address: 'Гулрыпшский район, село Мачара',
    addressLink: 'https://yandex.com/maps/-/CDxHiJMc',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsGulripsh2.jpg'
  },
  {
    id: 3,
    name: 'Подорожник',
    nameLink: 'https://apsny-oil.info/',
    address: 'Гулрыпшский район, село Мачара',
    addressLink: 'https://yandex.com/maps/-/CDxHiGyC',
    contacts: '+7 (940) 762-00-00',
    image: '/assets/GasStationsGulripsh3.jpg'
  }
];

const GasStationsGulripsh: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гулрыпш: автозаправочные станции</h1>
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
                  
                  {station.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{station.contacts}</span>
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

export default GasStationsGulripsh; 