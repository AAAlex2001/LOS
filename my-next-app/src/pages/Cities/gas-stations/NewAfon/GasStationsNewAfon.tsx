'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsSukhum.module.scss';

// Данные АЗС
const gasStations = [
  {
    id: 1,
    name: 'Азид',
    nameLink: 'https://azid.org/index.php/nash-azs',
    address: 'Сухум, Привокзальный район',
    addressLink: 'https://yandex.com/maps/-/CDX85F9j',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsSukhum1.png'
  },
  {
    id: 2,
    name: 'Азид',
    nameLink: 'https://azid.org/index.php/nash-azs',
    address: 'Сухум, ул. Дзидзария, 58А',
    addressLink: 'https://yandex.com/maps/-/CDX85VZy',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsSukhum2.png'
  },
  {
    id: 3,
    name: 'Азид',
    nameLink: 'https://azid.org/index.php/nash-azs',
    address: 'Сухум, ул. Б. Адлейба, 34',
    addressLink: 'https://yandex.com/maps/-/CDX85S6I',
    contacts: '+7 (840) 226-34-04',
    image: '/assets/GasStationsSukhum3.png'
  },
  {
    id: 4,
    name: 'АЗС Роснефть',
    nameLink: 'https://allrus.business/go/57466501088/',
    address: 'Сухум',
    addressLink: 'https://yandex.com/maps/-/CDX85Xi6',
    contacts: '+7 (940) 700-05-55',
    image: '/assets/GasStationsSukhum4.png'
  },
  {
    id: 5,
    name: 'Подорожник',
    nameLink: 'https://apsny-oil.info/',
    address: 'Гулрыпшский район, село Мачара',
    addressLink: 'https://yandex.com/maps/-/CDXcYVZa',
    contacts: '+7 (940) 762-00-00',
    image: '/assets/GasStationsSukhum5.png'
  }
];

const GasStationsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: автозаправочные станции</h1>
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

export default GasStationsSukhum; 