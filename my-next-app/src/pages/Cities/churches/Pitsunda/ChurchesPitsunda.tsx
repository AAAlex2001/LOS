'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ChurchesSukhum.module.scss';

const churches = [
  {
    id: 1,
    name: 'Сухумский Кафедральный собор Благовещения Пресвятой Богородицы',
    address: 'Сухум, ул. Фазиля Искандера, 53',
    addressLink: 'https://yandex.com/maps/-/CDxrU24~',
    workingHours: 'с 09:00 до 20:00',
    image: '/assets/ChurchesSukhum1.png',
  },
  {
    id: 2,
    name: 'Храм святого Иоанна Златоуста',
    address: 'Сухумский район, урочище Каман',
    addressLink: 'https://yandex.com/maps/-/CDxr4QzE',
    workingHours: 'с 10:00 до 17:00',
    image: '/assets/ChurchesSukhum2.png',
  },
  {
    id: 3,
    name: 'Церковь Спаса Преображения',
    address: 'Сухумский район, село Яштуха, Михайловское кладбище',
    addressLink: 'https://yandex.com/maps/-/CHAzEZoO',
    workingHours: 'с 08:00 до 18:00',
    image: '/assets/ChurchesSukhum3.jpg',
  },
];

const ChurchesSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: церкви и храмы</h1>
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

                  {church.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{church.workingHours}</span>
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

export default ChurchesSukhum; 