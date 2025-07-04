'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesPitsunda.module.scss';

// Данные пляжей
// TODO: Replace with actual images for Pitsunda beaches
const beaches = [
  {
    id: 1,
    name: 'Кипариска',
    address: 'Гагрский район, Пицунда',
    addressLink: 'https://yandex.com/maps/-/CDTBzFpt',
    description: 'Часы работы – круглосуточно\nВход бесплатный',
    image: '/assets/BeachesPitsundra1.png',
  },
  {
    id: 2,
    name: 'Апсилия',
    address: 'Гагрский район, Пицунда ул. Гицба 86',
    addressLink: 'https://yandex.com/maps/-/CDTBzSJU',
    description: 'Часы работы – круглосуточно\nВход бесплатный',
    image: '/assets/BeachesPitsundra2.png',
  },
  {
    id: 3,
    name: 'Пляж Пицунда',
    address: 'Гагрский район, Пицунда ул. Гицба 5',
    addressLink: 'https://yandex.com/maps/-/CDTBz2kG',
    description: 'Часы работы – круглосуточно\nВход бесплатный',
    image: '/assets/BeachesPitsundra3.png',
  },
  {
    id: 4,
    name: 'Пляж Лидзава',
    address: 'Гагрский район, село Лдзаа',
    addressLink: 'https://yandex.com/maps/-/CDTB7C7o',
    description: 'часы работы круглосуточно\nвход бесплатный',
    image: '/assets/BeachesPitsundra4.png',
  },
  {
    id: 5,
    name: 'Пляж Рыбзавод',
    address: 'Гагрский район, село Лдзаа, квартал Рыбзавод',
    addressLink: 'https://yandex.com/maps/-/CDTFAMK2',
    description: 'Часы работы круглосуточно\nВход бесплатный',
    image: '/assets/BeachesPitsundra5.png',
  },
  {
    id: 6,
    name: 'Пляж',
    address: 'Гагрский район, населенный пункт Молочный совхоз',
    addressLink: 'https://yandex.com/maps/-/CDTFE-2O',
    description: 'часы работы круглосуточно\nвход бесплатный',
    image: '/assets/BeachesPitsundra6.png',
  },
  {
    id: 7,
    name: 'Пляж Алахадзы',
    address: 'Гагрский район, село Алахадзы',
    addressLink: 'https://yandex.com/maps/-/CDTFUSmO',
    description: 'часы работы круглосуточно\nвход бесплатный',
    image: '/assets/BeachesPitsundra7.png',
  },
  {
    id: 8,
    name: 'Самшитовая',
    address: 'Гагрский район, Пицунда',
    addressLink: 'https://yandex.com/maps/-/CDTFI81S',
    description: 'часы работы круглосуточно\nвход бесплатный',
    image: '/assets/BeachesPitsundra8.png',
  },
];

const BeachesPitsundra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: пляжи</h1>
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

export default BeachesPitsundra;