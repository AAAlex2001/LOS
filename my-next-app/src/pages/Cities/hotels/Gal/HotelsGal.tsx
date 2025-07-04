'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsSukhum.module.scss';

// Данные отелей
const hotels = [
  {
    id: 1,
    name: 'Отель Диоскурия',
    address: 'ул. Генерала В.Г. Аршба, 45',
    addressLink: 'https://yandex.ru/maps/-/CDBWJJMn',
    contacts: '+7(940)934-41-41',
    price: '4500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum1.jpg',
  },
  {
    id: 2,
    name: 'Garuda Boutique Hotel',
    address: 'ул. Бубновой, 33',
    addressLink: 'https://yandex.ru/maps/-/CDBWJC36',
    contacts: '+7 (940) 799-00-00',
    price: '6000р за ночь для двух гостей',
    image: '/assets/HotelsSukhum2.jpg',
  },
  {
    id: 3,
    name: 'Leon Boutique Hotel',
    address: 'Читанава, 6',
    addressLink: 'https://yandex.ru/maps/-/CDBWNE6N',
    contacts: '+7 (940) 720-11-00\n+7 (940) 962-11-00',
    price: '3500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum3.jpg',
  },
  {
    id: 4,
    name: 'Anana Hotel',
    address: 'г. Сухум, ул.Пате-Ипа 14',
    addressLink: 'https://yandex.ru/maps/-/CDBWNXzW',
    contacts: '+7 (940) 764-44-46',
    price: '11000р за ночь для двух гостей',
    image: '/assets/HotelsSukhum4.jpg',
  },
  {
    id: 5,
    name: 'Отель ДЭМ',
    address: 'набережная Махаджиров, 4',
    addressLink: 'https://yandex.ru/maps/-/CDBWV4lm',
    contacts: '+7 (940) 911-99-00\n+7 (940) 999-39-59',
    price: '9900р за ночь для двух гостей',
    image: '/assets/HotelsSukhum5.jpg',
  },
  {
    id: 6,
    name: 'Boutigue hotel Amra',
    address: 'ул. Конфедератов, 28',
    addressLink: 'https://yandex.ru/maps/-/CDBWV6OY',
    contacts: '+7 (940) 935-00-55',
    price: '5500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum6.jpg',
  },
  {
    id: 7,
    name: 'Дом Москвы',
    address: 'ул. Когония, 63',
    addressLink: 'https://yandex.ru/maps/-/CDBWVO4q',
    contacts: '+7 (940) 721-88-00',
    price: '5800р за ночь для двух гостей',
    image: '/assets/HotelsSukhum7.png',
  },
  {
    id: 8,
    name: 'Отель Рица',
    address: 'просп. Леона, 2',
    addressLink: 'https://yandex.ru/maps/-/CDBWVD3l',
    contacts: '+7 (940) 915-32-42 (WhatsApp)',
    price: '5500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum8.png',
  },
  {
    id: 9,
    name: 'Hotel & Suite AinLan',
    address: 'ул. Агумава, 44, Сухум',
    addressLink: 'https://yandex.ru/maps/-/CDBWV-PE',
    contacts: '+7 (940) 990-28-49',
    price: '10000р за ночь для двух гостей',
    image: '/assets/HotelsSukhum9.jpg',
  },
  {
    id: 10,
    name: 'Мини-отель Rodnik Village&Spa',
    address: 'Гулрыпшский район, село Пщап',
    addressLink: 'https://yandex.ru/maps/-/CDBWZS4P',
    contacts: '+7 (940) 700-26-26\n+7 (940) 711-07-20',
    price: '5000р за ночь для двух гостей',
    image: '/assets/HotelsSukhum10.jpg',
  },
  {
    id: 11,
    name: 'Отель Апсилиа',
    address: 'село Мачара, 124',
    addressLink: 'https://yandex.ru/maps/-/CDBWZHop',
    contacts: '+79409595444 (WhatsApp)',
    price: '6500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum11.jpg',
  },
  {
    id: 12,
    name: 'Black Sea',
    address: 'Погрузочный тупик, 21, Сухум',
    addressLink: 'https://yandex.ru/maps/-/CDBWZXZx',
    contacts: '+7 (940) 714-65-55',
    price: '8500р за ночь для двух гостей',
    image: '/assets/HotelsSukhum12.jpg',
  },
  {
    id: 13,
    name: 'Спа – отель Грейс Аква Вилла',
    address: 'г. Сухум , ул.Казачья,пр.1 дом 30',
    contacts: 'тел.  +78007078566',
    price: '6513р за ночь для двух гостей',
    image: '/assets/HotelsSukhum13.jpg',
  },
];

const HotelsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: отели</h1>
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

export default HotelsSukhum; 