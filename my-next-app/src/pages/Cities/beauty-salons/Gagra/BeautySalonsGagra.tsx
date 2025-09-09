'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeautySalonsGagra.module.scss';

// TODO: Add actual images for Gagra beauty salons
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
    name: 'Студия красоты "Малина"',
    address: 'просп. Ардзинба, 187',
    addressLink: 'https://yandex.ru/maps/-/CDcIV2Y5',
    phone: '+7 (940) 722-72-36',
    workingHours: 'ежедневно с 09:00 до 19:00',
    image: '/assets/BeautySalonsGagra1.jpg',
  },
  {
    id: 2,
    name: 'Элида',
    address: 'Гагра, улица Абазгаа',
    addressLink: 'https://yandex.ru/maps/-/CDcI6F1j',
    phone: '+7 (940) 901-44-33',
    workingHours: 'ежедневно с 09:00 до 18:00',
    image: '/assets/BeautySalonsGagra2.jpg',
  },
  {
    id: 3,
    name: 'ASA',
    address: 'ул. Демерджипа, 18',
    addressLink: 'https://yandex.ru/maps/-/CDcInXld',
    phone: '+7 (940) 907-75-55',
    workingHours: 'с 10:00 до 18:00',
    image: '/assets/BeautySalonsGagra3.jpg',
  },
  {
    id: 4,
    name: 'Beauty CAMP Gagra',
    address: 'ул. Абазгаа, 53/2',
    addressLink: 'https://yandex.ru/maps/10280/gagra/house/YEkYdAFoSkUEQFppfX52dHhnbA==/',
    phone: '+7 (940) 900-22-25\n+7 (940)234-40-90',
    workingHours: 'с 09:00 до 19:00',
    image: '/assets/BeautySalonsGagra4.jpg',
  },
];

const BeautySalonsGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: салоны красоты</h1>
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
                      <span className={styles.infoValue} style={{whiteSpace: 'pre-line'}}>{salon.phone}</span>
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

export default BeautySalonsGagra; 