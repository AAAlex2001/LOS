'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ChurchesTkuarchal.module.scss';

const churches = [
  {
    id: 1,
    name: 'Церковь Святой Троицы',
    address: 'Ткуарчал, Сухумская ул., 5',
    addressLink: 'https://yandex.com/maps/-/CDxdnZ2y',
    image: '/assets/ChurchesTkuarchal1.jpg',
  },
];

const ChurchesTkuarchal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Ткуарчал: церкви и храмы</h1>
        </section>

        <section className={styles.cardsSection}>
          {churches.map((church) => (
            <div key={church.id} className={styles.churchCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={church.image}
                  alt={church.name}
                  fill
                  className={styles.churchImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.churchName}>{church.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${church.addressLink ? styles.addressLink : ''}`}>
                      {church.addressLink ? (
                        <a href={church.addressLink} target="_blank" rel="noopener noreferrer">{church.address}</a>
                      ) : (
                        church.address
                      )}
                    </span>
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

export default ChurchesTkuarchal; 