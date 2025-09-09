'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesGagra.module.scss';

// Данные виноделен
const wineries = [
  {
    id: 1,
    name: 'Домашняя винодельня',
    workingHours: 'круглосуточно',
    address: 'Кольцевая ул., 10, корп. 1, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDSLuMp1',
    contacts: '+7 (940) 717-01-54',
    image: '/assets/WineriesGagra1.jpg',
    name_link: null,
  },
  {
    id: 2,
    name: 'Винный погребок Бахус',
    workingHours: null,
    address: 'просп. Ардзинба, 88',
    addressLink: 'https://yandex.ru/maps/-/CDSLuBom',
    contacts: '+7940 9652626; +79407652626',
    image: '/assets/WineriesGagra2.jpg',
    name_link: null,
  },
  {
    id: 3,
    name: 'Винный погреб',
    workingHours: '09:00-22:00',
    address: 'Гагра, Шапсугская улица',
    addressLink: 'https://yandex.ru/maps/-/CDSLuHKR',
    contacts: '+7 (940) 964-30-39\n+7 (940) 921-61-58',
    image: '/assets/WineriesGagra3.jpg',
    name_link: null,
  },
  {
    id: 4,
    name: 'Винный двор',
    workingHours: 'круглосуточно',
    address: 'Гагрский район, посёлок городского типа Бзыпта, село Арасадзых',
    addressLink: 'https://yandex.ru/maps/-/CDSLyE06',
    contacts: null,
    image: '/assets/WineriesGagra4.jpg',
    name_link: null,
  },
  {
    id: 5,
    name: 'Ярмарка Абхазских вин',
    workingHours: '07:00- 22:00',
    address: 'п.г.т. Бзыпта, Гагрский район, Абхазия',
    addressLink: 'https://go.2gis.com/1jqhd',
    contacts: '+7 940‒712‒65‒01',
    image: '/assets/WineriesGagra5.jpg',
    name_link: null,
  },
  {
    id: 6,
    name: 'Винный двор у Ромы',
    workingHours: null,
    address: 'п.г.т. Бзыпта, Гагрский район, Абхазия',
    addressLink: 'https://yandex.com/maps/-/CDHbRPZb',
    contacts: '+7 (940) 993-25-32',
    image: '/assets/WineriesGagra6.jpg',
    name_link: null,
  }
];

const WineriesGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: винодельни</h1>
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

export default WineriesGagra;