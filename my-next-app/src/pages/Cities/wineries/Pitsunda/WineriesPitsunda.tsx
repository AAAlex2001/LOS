'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesPitsunda.module.scss';

// Данные виноделен
const wineries = [
  {
    id: 1,
    name: 'Дегустационный зал Леон',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гагрский район, Пицунда, Кипарисовая аллея',
    addressLink: 'https://yandex.com/maps/-/CDHbRZiP',
    contacts: '+7 (940) 991-27-97',
    image: '/assets/WineriesPitsunda1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'У моря',
    workingHours: 'с 09:00 до 22:00',
    address: 'Пицунда, Кипарисовая аллея, 47',
    addressLink: 'https://yandex.com/maps/-/CDHbV4Jf',
    contacts: '+7 (940) 910-23-01',
    image: '/assets/WineriesPitsunda2.jpg',
    name_link: null,
  },
  {
    id: 3,
    name: 'Вина и воды Абхазии',
    workingHours: null,
    address: 'Гагрский район, Пицунда',
    addressLink: 'https://yandex.com/maps/-/CDHbV20j',
    contacts: null,
    image: '/assets/WineriesPitsunda3.jpg',
    name_link: null,
  },
  {
    id: 4,
    name: 'Вино',
    workingHours: 'с 09:00 до 21:00',
    address: 'Гагрский район, село Лдзаа, Рыбзаводская улица',
    addressLink: 'https://yandex.com/maps/-/CDHbZE5O',
    contacts: null,
    image: '/assets/WineriesPitsunda4.jpg',
    name_link: null,
  },
  {
    id: 5,
    name: 'Фирменный магазин Шато Абхаз',
    workingHours: 'с 09:00 до 17:00',
    address: 'Гагрский район, село Алахадзы',
    addressLink: 'https://yandex.com/maps/-/CDHbZI23',
    contacts: null,
    image: '/assets/WineriesPitsunda5.jpg',
    name_link: null,
  }
];

const WineriesPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: винодельни</h1>
        </section>

        <section className={styles.cardsSection}>
          {wineries.map((winery) => (
            <div key={winery.id} className={styles.wineryCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={winery.image}
                  alt={winery.name}
                  fill
                  className={styles.wineryImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.wineryName}>
                  {winery.name_link ? (
                    <a href={winery.name_link} target="_blank" rel="noopener noreferrer">
                      {winery.name}
                    </a>
                  ) : (
                    winery.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {winery.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{winery.workingHours}</span>
                    </div>
                  )}
                  
                  {winery.address && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Адрес:</span>
                      <span className={`${styles.infoValue} ${winery.addressLink ? styles.addressLink : ''}`}>
                        {winery.addressLink ? (
                          <a href={winery.addressLink} target="_blank" rel="noopener noreferrer">{winery.address}</a>
                        ) : (
                          winery.address
                        )}
                      </span>
                    </div>
                  )}
                  
                  {winery.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{winery.contacts}</span>
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

export default WineriesPitsunda;