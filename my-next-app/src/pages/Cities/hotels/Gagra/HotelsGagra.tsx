'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsGagra.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Гранд Отель Абхазия',
    address: 'г. Гагра, просп. Ардзинба, 237, Абхазия',
    addressLink: 'https://yandex.ru/maps/-/CDBKVV35',
    contacts: '+7-940-734-65-64',
    price: '3500р За ночь для 2 гостей',
    image: '/assets/HotelsGagra1.jpg',
  },
  {
    id: 2,
    name: 'Amran(gagra), Klubny Hotel',
    address: 'Пионерская ул., 5, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDBKVG4p',
    contacts: '+7 (940) 962-54-46',
    price: '4200р За 1 ночь для двух гостей',
    image: '/assets/HotelsGagra2.jpg',
  },
  {
    id: 3,
    name: 'Отель Абаата',
    address: 'проспект Ардзинба, 115',
    addressLink: 'https://yandex.ru/maps/-/CDBKVG1e',
    contacts: '+7(940)935-72-41',
    price: '6800р За ночь для двух гостей',
    image: '/assets/HotelsGagra3.jpg',
  },
  {
    id: 4,
    name: 'Отель Garden Resort',
    address: 'просп. Ардзинба, 1, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDBKVK9v',
    contacts: '+79409328855',
    price: '17600p за 2 ночи для двух гостей',
    image: '/assets/HotelsGagra4.jpg',
  },
  {
    id: 5,
    name: 'Отель Taminik',
    address: 'улица Адыгаа, 149А',
    addressLink: 'https://yandex.ru/maps/-/CDBKVSyY',
    contacts: '+79407100044',
    price: '1800 за ночь для двух гостей',
    image: '/assets/HotelsGagra5.jpg',
  },
  {
    id: 6,
    name: 'Мини-Отель Тихий Дон',
    address: 'проспект Ардзинба, 161',
    addressLink: 'https://yandex.ru/maps/-/CDBKVW9W',
    contacts: '+7 (940) 996-15-55',
    price: '4500Р за ночь для двух гостей',
    image: '/assets/HotelsGagra6.jpg',
  },
  {
    id: 7,
    name: 'Отель Apsuana Rosе',
    address: 'ул. Апсха Леона, 33., Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDBKV0yU',
    contacts: '+7 (940) 938-27-27',
    price: '6050р за ночь для двух гостей',
    image: '/assets/HotelsGagra7.jpg',
  },
  {
    id: 8,
    name: 'Вилла Леона',
    address: 'Гагрипшское ущелье',
    addressLink: 'https://yandex.ru/maps/-/CDBKVD3z',
    contacts: '+7 (940) 779-79-67',
    price: '4500p за ночь для двух гостей',
    image: '/assets/HotelsGagra8.jpg',
  },
  {
    id: 9,
    name: 'Отель Гега',
    address: 'ул. Демерджипа, 130А, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDBKVL5I',
    contacts: '+7 (940) 710-77-00',
    price: '8400р за ночь для двух гостей',
    image: '/assets/HotelsGagra9.jpg',
  },
  {
    id: 10,
    name: 'Бутик-Отель Bazalt Club',
    address: 'улица Октябрьская, д. 271/8, Цандрыпш',
    addressLink: 'https://yandex.ru/maps/-/CDBKVPzc',
    contacts: '+7 (940)776-79-29',
    price: '10947p за ночь для двух гостей',
    image: '/assets/HotelsGagra10.jpg',
  },
  {
    id: 11,
    name: 'Гостевой дом Абхазский берег',
    address: 'ул. Горького, 15, Цандрыпш',
    addressLink: 'https://yandex.ru/maps/-/CDBKVT4r',
    contacts: '+7 (940) 935-62-80',
    price: '6500р за ночь для двух гостей',
    image: '/assets/HotelsGagra11.png',
  },
  {
    id: 12,
    name: 'Отель Европа',
    address: 'г. Гагра, ул. Авидзба, д. 1.',
    addressLink: 'https://yandex.ru/maps/-/CDBKVT8s',
    contacts: '+7 (940) 742-33-00',
    price: '4300р за ночь для двух гостей',
    image: '/assets/HotelsGagra12.png',
  },
];

const HotelsGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: отели</h1>
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

export default HotelsGagra; 