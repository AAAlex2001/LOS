'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsGudauta.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Отель Апсны',
    address: 'улица Абазинская, д. 2А, Гудаута',
    addressLink: 'https://yandex.ru/maps/-/CDBKZM4j',
    contacts: '+79407280055',
    price: '2600р за ночь для двух гостей',
    image: '/assets/HotelsGudauta1.jpg',
  },
  {
    id: 2,
    name: 'Отель Келешбей',
    address: 'улица Гумистинская, д.15, Гудаута',
    addressLink: 'https://yandex.ru/maps/-/CDBKZY2x',
    contacts: '+7 (940) 997-24-53',
    price: '5500р за ночь для двух гостей',
    image: '/assets/HotelsGudauta2.jpg',
  },
  {
    id: 3,
    name: 'База отдыха "Лыхны"',
    address: 'Гудаутский район, село Лыхны, посёлок Бамбора',
    addressLink: 'https://yandex.ru/maps/-/CDBKZG6j',
    contacts: '+7 (940) 772-44-94',
    price: '5300р за ночь для двух гостей',
    image: '/assets/HotelsGudauta3.jpg',
  },
  {
    id: 4,
    name: 'Эко Папа',
    address: 'ул.Абазинская, дом 30, Гудаута',
    addressLink: 'https://yandex.ru/maps/-/CDBKZOzO',
    contacts: '+7 (940) 730-00-04',
    price: '8800р за ночь для двух гостей',
    image: '/assets/HotelsGudauta4.jpg',
  },
  {
    id: 5,
    name: 'Мини-отель Bambora House',
    address: 'Гудаутский район, посёлок Бамбора',
    addressLink: 'https://yandex.ru/maps/-/CDBWBMz6',
    contacts: '+7 (940) 937-07-88',
    price: '3700 за ночь для двух гостей',
    image: '/assets/HotelsGudauta5.jpg',
  },
  {
    id: 6,
    name: 'Золотой Якорь',
    address: 'Ул.Трапш 2',
    addressLink: 'https://yandex.ru/maps/-/CDBWBFnH',
    contacts: '+7 (940) 731-48-48\n+7 (940) 710-24-44',
    price: '4000р за ночь для двух гостей',
    image: '/assets/HotelsGudauta6.jpg',
  },
  {
    id: 7,
    name: 'Отель Россия',
    address: 'просп. Героев, 49',
    addressLink: 'https://yandex.ru/maps/-/CDBWBDma',
    contacts: '+7 (940) 723-00-55',
    price: '3800р за ночь для двух гостей',
    image: '/assets/HotelsGudauta7.png',
  },
];

const HotelsGudauta: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гудаута: отели</h1>
        </section>

        <section className={styles.cardsSection}>
          {hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className={styles.hotelImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.hotelName}>{hotel.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${hotel.addressLink ? styles.addressLink : ''}`}>
                      {hotel.addressLink ? (
                        <a href={hotel.addressLink} target="_blank" rel="noopener noreferrer">{hotel.address}</a>
                      ) : (
                        hotel.address
                      )}
                    </span>
                  </div>
                  
                  {hotel.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{hotel.contacts}</span>
                    </div>
                  )}

                  {hotel.price && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Цена:</span>
                      <span className={styles.infoValue}>{hotel.price}</span>
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

export default HotelsGudauta; 