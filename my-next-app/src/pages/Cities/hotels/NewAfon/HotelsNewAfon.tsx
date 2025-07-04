'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsNewAfon.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Отель Azanta',
    address: 'улица Лакоба, д.16, Новый Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKR8J6',
    contacts: '+7 (940) 733-22-55',
    price: '6300р за ночь для двух гостей',
    image: '/assets/HotelsNewAfon1.jpg',
  },
  {
    id: 2,
    name: 'Отель Историческая Гостиница Санаторий Абхазия',
    address: 'Лакоба 20, Новый Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKRD22',
    contacts: '+7 (940) 710-40-59',
    price: '4300р за ночь для двух гостей',
    image: '/assets/HotelsNewAfon2.jpg',
  },
  {
    id: 3,
    name: 'Отель Loft',
    address: 'переулок Ладария, д.5 Н.Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKRLyL',
    contacts: '+7 (940)722-72-20',
    price: '4750р за ночь для двух гостей',
    image: '/assets/HotelsNewAfon3.jpg',
  },
  {
    id: 4,
    name: 'Отель Никополи',
    address: 'улица Водопадная 21А, Новый Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKR-JH',
    contacts: '+7 (940) 990-00-81\n+7 (940) 995-73-75',
    price: '2000р за ночь для двух гостей',
    image: '/assets/HotelsNewAfon4.jpg',
  },
  {
    id: 5,
    name: 'Abaash Afon (Абааш Афон)',
    address: 'улица Эшба, д. 2/10, Новый Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKVA2-',
    contacts: '+7 (940) 715-11-11',
    price: '3000р за ночь для двух гостей',
    image: '/assets/HotelsNewAfon5.jpg',
  },
  {
    id: 6,
    name: 'Гранд Афон',
    address: 'Водопадный переулок, д.3, Новый Афон',
    addressLink: 'https://yandex.ru/maps/-/CDBKVQJC',
    contacts: '+7 (940) 990-11-11',
    price: '4300 за ночь для двух гостей',
    image: '/assets/HotelsNewAfon6.jpg',
  },
  {
    id: 7,
    name: 'VILLA SOVA',
    address: 'г.Новый Афон, Сухумское шоссе 30',
    addressLink: 'https://yandex.ru/maps/37188/new-athos/house/YEkYcQNjS0cDQFppfXx5eXtkbA==/',
    contacts: 'sovahotel@gmail.com\nТел / WhatsApp/Telegram\n+7(940)773-62-69\n+7(940)714-12-13',
    price: null,
    image: '/assets/HotelsNewAfon7.jpg',
  },
];

const HotelsNewAfon: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Новый Афон: отели</h1>
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
                  {hotel.address && (
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
                  )}
                  
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

export default HotelsNewAfon; 