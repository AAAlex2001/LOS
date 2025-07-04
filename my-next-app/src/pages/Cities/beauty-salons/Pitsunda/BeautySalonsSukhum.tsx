'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeautySalonsSukhum.module.scss';

const beautySalons = [
  {
    id: 1,
    name: 'Brow & beauty Bar',
    nameLink: 'http://instagram.com/sukhumbeauty',
    address: 'ул. Аидгылара, 4',
    addressLink: 'https://yandex.com/maps/-/CDxnrK35',
    phone: '+7 (940) 737-08-88',
    workingHours: 'с 10:00 до 19:00',
    image: '/assets/BeautySalonsSukhum1.png',
  },
  {
    id: 2,
    name: 'New Fantasy',
    nameLink: 'https://www.instagram.com/newfantasy_sukhum/',
    address: 'Сухум, ул. Воронова, 39',
    addressLink: 'https://yandex.com/maps/-/CDxnrC9Q',
    phone: '+7 (940) 999-92-90, +7 (940) 777-72-90',
    website: 'http://newfantasy.ru/salon',
    workingHours: 'с 09:00 до 18:00',
    image: '/assets/BeautySalonsSukhum2.png',
  },
  {
    id: 3,
    name: 'La La Land',
    nameLink: 'https://instagram.com/lalaland.beauty.sukhum?igshid=ZjE2NGZiNDQ=',
    address: 'Сухум, ул. Конфедератов, 41',
    addressLink: 'https://yandex.com/maps/-/CDxn7C4Z',
    phone: '+7 (940) 909-77-77',
    workingHours: 'с 09:00 до 23:00',
    image: '/assets/BeautySalonsSukhum3.jpg',
  },
  {
    id: 4,
    name: 'Skil Studio',
    nameLink: 'https://instagram.com/studioskil?igshid=MzRlODBiNWFlZA==',
    address: 'Сухум, ул. Конфедератов, 22',
    addressLink: 'https://yandex.com/maps/-/CDxn7HPv',
    phone: '+7 (940) 998-88-90',
    workingHours: 'с 09:00 до 19:00',
    image: '/assets/BeautySalonsSukhum4.png',
  },
  {
    id: 5,
    name: 'Верона',
    nameLink: 'http://instagram.com/verona_masterskaya_krasoty',
    address: 'Сухум, ул. Конфедератов, 26',
    addressLink: 'https://yandex.com/maps/-/CDxrAEPB',
    phone: '+7 (940) 728-66-44',
    workingHours: 'с 09:00 до 20:00',
    image: '/assets/BeautySalonsSukhum5.png',
  },
  {
    id: 6,
    name: 'LuckY LookY',
    address: 'Сухум, ул. Лакоба, 16',
    addressLink: 'https://yandex.com/maps/-/CDxrMUPy',
    phone: '+7 (940) 710-08-85',
    workingHours: 'с 09:00 до 22:00',
    image: '/assets/BeautySalonsSukhum6.png',
  },
  {
    id: 7,
    name: 'Belle Cosmetic',
    nameLink: 'https://www.instagram.com/belle___cosmetic?igsh=MzRlODBiNWFlZA==',
    address: 'Сухум, ул. Званба, 20',
    phone: '+7 (940) 708-88-00',
    workingHours: 'с 10:00 до 19:00',
    image: '/assets/BeautySalonsSukhum7.png',
  },
  {
    id: 8,
    name: 'la belle',
    nameLink: 'https://www.instagram.com/la_belle.salon_krasoty',
    address: 'Сухум, ул. В.Г. Ардзинба, 65',
    addressLink: 'https://yandex.com/maps/-/CDxrQ0om',
    phone: '+7 (940) 958-76-77',
    workingHours: 'с 09:00 до 19:00',
    image: '/assets/BeautySalonsSukhum8.png',
  },
  {
    id: 9,
    name: 'Verona',
    nameLink: 'https://www.instagram.com/studia_verona_rayon?igsh=MW8zMXRyZHBhYW5iYQ==',
    address: 'Сухум, ул. Аргун, 10',
    addressLink: 'https://yandex.com/maps/-/CDxrURNX',
    phone: '+7 (940) 762-10-10',
    workingHours: 'с 09:00 до 20:00',
    image: '/assets/BeautySalonsSukhum9.png',
  },
  {
    id: 10,
    name: 'Студия красоты Мальвины Джагаевой',
    address: 'г.Сухум ул.Эшба 163',
    addressLink: 'https://yandex.ru/maps/org/studiya_krasoty_malviny_dzhagayevoy/50556684687/',
    phone: '+79409963013',
    workingHours: 'с 10:00 до 20:00',
    image: '/assets/BeautySalonsSukhum10.jpg',
  }
];

const BeautySalonsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: салоны красоты</h1>
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
                <h2 className={`${styles.beautySalonName} ${salon.nameLink ? styles.clickable : ''}`}>
                  {salon.nameLink ? (
                    <a href={salon.nameLink} target="_blank" rel="noopener noreferrer">{salon.name}</a>
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

export default BeautySalonsSukhum; 