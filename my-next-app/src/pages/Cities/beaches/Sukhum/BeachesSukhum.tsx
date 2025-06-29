'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesSukhum.module.scss';

// Данные пляжей
const beaches = [
  {
    id: 1,
    name: 'Пляж',
    address: 'Сухум',
    addressLink: 'https://yandex.com/maps/-/CDtHqD41',
    image: '/assets/BeachesSukhum1.png',
  },
  {
    id: 2,
    name: 'Айтар',
    address: 'Сухум',
    addressLink: 'https://yandex.com/maps/-/CDtHuFI3',
    image: '/assets/BeachesSukhum2.png',
  },
  {
    id: 3,
    name: 'Пляж Мокко',
    nameLink: 'https://www.instagram.com/mokko_beach?igsh=M3I0ZHRyeHRodWwx',
    address: 'Сухум, Тхубунский район',
    addressLink: 'https://yandex.com/maps/-/CDtHu0Mu',
    phone: '+7 (940) 740-50-60',
    image: '/assets/BeachesSukhum3.png',
  },
  {
    id: 4,
    name: 'Marnero',
    nameLink: 'http://marnerobeach.tilda.ws/',
    address: 'Сухум, Тхубунский район',
    addressLink: 'https://yandex.com/maps/-/CDtHN-Zg',
    phone: '+7 (940) 750-40-00',
    image: '/assets/BeachesSukhum4.png',
  },
  {
    id: 5,
    name: 'Del Mar',
    nameLink: 'https://www.instagram.com/delmare_club?igsh=MWVxbnVrZDRldHA3NA==',
    address: 'Сухум Ул.Адлейба 27',
    addressLink: 'https://yandex.com/maps/-/CDtHVV7Q',
    phone: '+7 (940) 760-18-18',
    image: '/assets/BeachesSukhum5.png',
  },
];

const BeachesSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: пляжи</h1>
        </section>

        <section className={styles.cardsSection}>
          {beaches.map((beach) => (
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

export default BeachesSukhum; 