'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesGagra.module.scss';

// Данные пляжей
const beaches = [
  {
    id: 1,
    name: 'Центральный пляж',
    address: 'Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDWJJJyX',
    image: '/assets/BeachesGagra1.jpg',
  },
  {
    id: 2,
    name: 'Пляж «Махито»',
    address: 'просп. Ардзинба, 49 (Нартаа, 49)',
    addressLink: 'https://yandex.ru/maps/-/CDWJJCY5',
    description: 'Часы работы – круглосуточно\nВход бесплатный',
    image: '/assets/BeachesGagra2.png',
  },
  {
    id: 3,
    name: 'Медицинский пляж',
    address: 'Гагра, микрорайон Старая Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDWJJL~t',
    description: 'часы работы - круглосуточно\nбесплатный вход, дикий пляж',
    image: '/assets/BeachesGagra3.jpg',
  },
  {
    id: 4,
    name: 'Пляж «Белые скалы»',
    address: 'Гагрский район п.г.т. Цандрипш',
    addressLink: 'https://yandex.ru/maps/-/CDWJJ2iH',
    description: 'часы работы – круглосуточно\nвход бесплатный',
    image: '/assets/BeachesGagra4.jpg',
  },
];

const BeachesGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: пляжи</h1>
        </section>

        <section className={styles.cardsSection}>
          {beaches.map((beach: any) => (
            <div key={beach.id} className={styles.beachCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={beach.image}
                  alt={beach.name}
                  fill
                  className={styles.beachImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={`${styles.beachName} ${beach.nameLink ? styles.clickable : ''}`}>
                  {beach.nameLink ? (
                    <a href={beach.nameLink} target="_blank" rel="noopener noreferrer">{beach.name}</a>
                  ) : (
                    beach.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${beach.addressLink ? styles.addressLink : ''}`}>
                      {beach.addressLink ? (
                        <a href={beach.addressLink} target="_blank" rel="noopener noreferrer">{beach.address}</a>
                      ) : (
                        beach.address
                      )}
                    </span>
                  </div>

                  {beach.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{beach.phone}</span>
                    </div>
                  )}

                  {beach.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Информация:</span>
                      <span className={styles.infoValue} style={{whiteSpace: 'pre-line'}}>{beach.description}</span>
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

export default BeachesGagra;