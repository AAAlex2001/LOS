'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacySukhum.module.scss';

// Данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Аптека',
    workingHours: 'с 09:00 до 23:00',
    address: 'ул. А.Читанава, 14',
    addressLink: 'https://yandex.com/maps/-/CDXqmL6F',
    image: '/assets/PharmacySukhum1.jpg'
  },
  {
    id: 2,
    name: 'Ракета Маркет',
    nameLink: 'https://www.instagram.com/raketa_market_/',
    workingHours: 'с 09:00 до 22:00',
    address: 'просп. Аиааира, 48',
    addressLink: 'https://yandex.com/maps/-/CDXqm-5r',
    contacts: '+7 (940) 709-21-21',
    image: '/assets/PharmacySukhum2.png'
  },
  {
    id: 3,
    name: 'Республиканская аптека',
    nameLink: 'https://yandex.com/maps/-/CDXqqRnF',
    workingHours: '08:30 до 23:00',
    address: 'просп. Леона, 12',
    image: '/assets/PharmacySukhum3.png'
  },
  {
    id: 4,
    name: 'Аптека N1',
    workingHours: 'с 09:00 до 21:00',
    address: 'Проспект Леона, 17',
    image: '/assets/PharmacySukhum4.png'
  },
  {
    id: 5,
    name: 'Лекарь',
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Конфедератов, 30',
    addressLink: 'https://yandex.com/maps/-/CDXquKjg',
    contacts: '+7 (940) 717-00-02',
    image: '/assets/PharmacySukhum5.jpg'
  },
  {
    id: 6,
    name: 'Аптека',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, ул. Дзидзария, 64',
    addressLink: 'https://yandex.com/maps/-/CDXqu85V',
    image: '/assets/PharmacySukhum6'
  },
  {
    id: 7,
    name: 'Аптека Пульс',
    workingHours: 'с 08:30 до 00:00',
    address: 'Сухум, улица Лакоба',
    addressLink: 'https://yandex.com/maps/-/CDXquX1A',
    image: '/assets/PharmacySukhum7.jpg'
  },
  {
    id: 8,
    name: 'ВитАмин',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, ул. Б. Адлейба, 218',
    addressLink: 'https://yandex.com/maps/-/CDXqB6Ns',
    image: '/assets/PharmacySukhum8.png'
  },
  {
    id: 9,
    name: 'Лекфарм',
    workingHours: 'с 09:00 до 22:00',
    address: 'Сухум, улица Эшба 175',
    addressLink: 'https://yandex.com/maps/-/CDXJ6ZY-',
    image: '/assets/PharmacySukhum9.jpg'
  },
  {
    id: 10,
    name: 'Республиканская Аптека',
    workingHours: 'круглосуточно',
    address: 'Сухум, Новый район',
    addressLink: 'https://yandex.com/maps/-/CDXJbMzU',
    image: '/assets/PharmacySukhum10.jpg'
  },
  {
    id: 11,
    name: 'Аптека АЛОЭ',
    nameLink: 'https://www.instagram.com/apteka__aloe?igsh=ZmExcXE4NG9lM21v',
    workingHours: 'с 09:00 до 23:00',
    address: 'улица Акиртава, 20',
    addressLink: 'https://yandex.com/maps/-/CDXJb8OE',
    contacts: '+7 (940) 956-92-94',
    image: '/assets/PharmacySukhum11.jpg'
  }
];

const PharmacySukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: аптеки</h1>
        </section>

        {/* Карточки аптек */}
        <section className={styles.cardsSection}>
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className={styles.pharmacyCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                <Image
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  fill
                  className={styles.pharmacyImage}
                />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.pharmacyName}>
                  {pharmacy.nameLink ? (
                    <a href={pharmacy.nameLink} target="_blank" rel="noopener noreferrer">
                      {pharmacy.name}
                    </a>
                  ) : (
                    pharmacy.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${pharmacy.addressLink ? styles.addressLink : ''}`}>
                      {pharmacy.addressLink ? (
                        <a href={pharmacy.addressLink} target="_blank" rel="noopener noreferrer">{pharmacy.address}</a>
                      ) : (
                        pharmacy.address
                      )}
                    </span>
                  </div>
                  
                  {pharmacy.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{pharmacy.contacts}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Часы работы:</span>
                    <span className={styles.infoValue}>{pharmacy.workingHours}</span>
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

export default PharmacySukhum; 