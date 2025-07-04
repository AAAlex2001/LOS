'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesGulripsh.module.scss';

// Данные виноделен
const wineries = [
  {
    id: 1,
    name: 'Craft Product',
    workingHours: 'с 12:00 до 18:00',
    address: 'Гулрыпшский район, поселок Тхубын, 4-й тупик Абжуйского шоссе, 41',
    addressLink: 'https://yandex.com/maps/-/CDxHiIP9',
    contacts: '+7(940)733-13-57\n+7 (940) 777-17-31',
    image: '/assets/WineriesGulripsh1.jpg',
    nameLink: 'https://www.instagram.com/craft_product_abkhazia',
  }
];

const WineriesGulripsh: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гулрыпш: винодельни</h1>
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
                  {winery.nameLink ? (
                    <a href={winery.nameLink} target="_blank" rel="noopener noreferrer">
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

export default WineriesGulripsh;