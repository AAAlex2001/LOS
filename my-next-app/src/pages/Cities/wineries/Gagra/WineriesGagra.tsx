'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesSukhum.module.scss';

// Данные виноделен
const wineries = [
  {
    id: 1,
    name: 'Винодельня Ашуба',
    workingHours: 'с 12:00 до 19:00',
    address: 'Сухум, ул. Акиртава, 57А',
    addressLink: 'https://yandex.com/maps/-/CDX8yB1p',
    contacts: '+7 (940) 770-00-04',
    image: '/assets/WineriesSukhum.png'
  }
];

const WineriesSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: винодельни</h1>
        </section>

        {/* Карточки виноделен */}
        <section className={styles.cardsSection}>
          {wineries.map((winery) => (
            <div key={winery.id} className={styles.wineryCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                <Image
                  src={winery.image}
                  alt={winery.name}
                  fill
                  className={styles.wineryImage}
                />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.wineryName}>{winery.name}</h2>
                
                <div className={styles.infoBlock}>
                  {winery.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{winery.workingHours}</span>
                    </div>
                  )}
                  
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

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Контакты:</span>
                    <span className={styles.infoValue}>{winery.contacts}</span>
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

export default WineriesSukhum; 