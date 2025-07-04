'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsPitsunda.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Отель Costa d\'Ora',
    address: 'г.Пицунда, Фабричная 21а',
    addressLink: 'https://yandex.ru/maps/-/CDB7BFmg',
    contacts: '+79409527281',
    price: '7500 за ночь для двух гостей',
    image: '/assets/HotelsPitsunda1.jpg',
  },
  {
    id: 2,
    name: 'Отель Freedom',
    address: 'Тополёвая ул., 5, Пицунда',
    addressLink: 'https://yandex.ru/maps/-/CDB7B4ik',
    contacts: '+79409002277',
    price: '6060Р За ночь для двух гостей',
    image: '/assets/HotelsPitsunda2.jpg',
  },
  {
    id: 3,
    name: 'Отель Freedom3',
    address: 'ул. Монашеское Ущелье, 9, село Амжикухуа',
    addressLink: 'https://yandex.ru/maps/-/CDB7FULA',
    contacts: '+7 (940) 925-17-62',
    price: '9500р за ночь для двух гостей',
    image: '/assets/HotelsPitsunda3.jpg',
  },
  {
    id: 4,
    name: 'Отель Kiaraz Start',
    address: 'ул. Гицба, 1А, Пицунда',
    addressLink: 'https://yandex.ru/maps/-/CDB7FR1v',
    contacts: '+7 (940) 707-90-99',
    price: '7500р за ночь для двух гостей',
    image: '/assets/HotelsPitsunda4.jpg',
  },
  {
    id: 5,
    name: 'Lucette Guest House',
    address: 'Рыбзаводская ул., 43, село Лдзаа',
    addressLink: 'https://yandex.ru/maps/-/CDB7FCkC',
    contacts: '+7 (940) 735-11-55',
    price: '9760р за ночь для 2 гостей',
    image: '/assets/HotelsPitsunda5.jpg',
  },
  {
    id: 6,
    name: 'Самшитовая роща',
    address: 'ул. Гочуа, 7, Пицунда',
    addressLink: 'https://yandex.ru/maps/-/CDB7FP5~',
    contacts: '+79409223094 только для текстовых сообщений',
    price: '6550 за ночь для двух гостей',
    image: '/assets/HotelsPitsunda6.jpg',
  },
  {
    id: 7,
    name: 'Оазис Клаб Резорт Отель',
    address: 'Морская ул., 7А, село Алахадзы',
    addressLink: 'https://yandex.ru/maps/-/CDB7JQlB',
    contacts: '+7 (940) 915-77-77',
    price: '5300р за ночь для двух гостей',
    image: '/assets/HotelsPitsunda7.jpg',
  },
];

const HotelsPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: отели</h1>
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

export default HotelsPitsunda; 