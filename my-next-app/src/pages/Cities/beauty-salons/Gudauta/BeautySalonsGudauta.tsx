'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeautySalonsGudauta.module.scss';

const beautySalons: {
  id: number;
  name: string;
  name_link?: string;
  address: string;
  addressLink?: string;
  phone?: string;
  website?: string;
  workingHours?: string;
  image: string;
}[] = [
  {
    id: 1,
    name: 'Студия красоты Шарм',
    address: 'г.Гудаута , ул. Харазия (район рынок)',
    addressLink: 'https://yandex.ru/maps/37187/gudauta/geo/1559565173/',
    phone: '+7940979020',
    workingHours: 'с 09:00 до 20:00',
    image: '/assets/BeautySalonsGudauta1.jpg',
  },
];

const BeautySalonsGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: салоны красоты</h1>
        </section>

        <section className={styles.cardsSection}>
          {beautySalons.map((salon) => (
            <div key={salon.id} className={styles.beautySalonCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={salon.image}
                  alt={salon.name}
                  fill
                  className={styles.beautySalonImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={`${styles.beautySalonName} ${salon.name_link ? styles.clickable : ''}`}>
                  {salon.name_link ? (
                    <a href={salon.name_link} target="_blank" rel="noopener noreferrer">{salon.name}</a>
                  ) : (
                    salon.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {salon.address && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Адрес:</span>
                      <span className={`${styles.infoValue} ${salon.addressLink ? styles.addressLink : ''}`}>
                        {salon.addressLink ? (
                          <a href={salon.addressLink} target="_blank" rel="noopener noreferrer">{salon.address}</a>
                        ) : (
                          salon.address
                        )}
                      </span>
                    </div>
                  )}

                  {salon.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{salon.phone}</span>
                    </div>
                  )}

                  {salon.website && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Сайт:</span>
                      <span className={styles.infoValue}>
                        <a href={salon.website} target="_blank" rel="noopener noreferrer">{salon.website}</a>
                      </span>
                    </div>
                  )}

                  {salon.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{salon.workingHours}</span>
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

export default BeautySalonsGudauta; 