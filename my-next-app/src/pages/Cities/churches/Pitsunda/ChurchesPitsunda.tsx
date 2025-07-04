'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ChurchesPitsunda.module.scss';

const churches = [
  {
    id: 1,
    name: 'Храм-часовня Пицундских Святых',
    address: 'Гагрский район, Пицунда ул. Гицба, 8',
    addressLink: 'https://yandex.com/maps/-/CDTxUNNZ',
    phone: '+7 (940) 743-14-14',
    website: 'http://hrampitsunda.tilda.ws/',
    websiteLink: 'http://hrampitsunda.tilda.ws/',
    workingHours: 'ежедневно с 10:00 до 18:00',
    moreInfo: 'Время концертов в 17:00 (в пик сезона 20:00)\nБилеты в кассах органного зала продаются в день концерта с 13:00\nСтоимость билета: экскурсия по музею 50- 100руб., дети до 5 лет – бесплатно.\nБилет для взрослых на органный концерт – 1300руб., дети от 6 до 12 лет -500руб.',
    image: '/assets/ChurchesPitsunda1.jpg',
  },
];

const ChurchesPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: церкви и храмы</h1>
        </section>

        <section className={styles.cardsSection}>
          {churches.map((church) => (
            <div key={church.id} className={styles.churchCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={church.image}
                  alt={church.name}
                  fill
                  className={styles.churchImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.churchName}>{church.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${church.addressLink ? styles.addressLink : ''}`}>
                      {church.addressLink ? (
                        <a href={church.addressLink} target="_blank" rel="noopener noreferrer">{church.address}</a>
                      ) : (
                        church.address
                      )}
                    </span>
                  </div>

                  {church.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{church.phone}</span>
                    </div>
                  )}

                  {church.website && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Сайт:</span>
                      <span className={`${styles.infoValue} ${styles.addressLink}`}>
                        <a href={church.websiteLink} target="_blank" rel="noopener noreferrer">{church.website}</a>
                      </span>
                    </div>
                  )}

                  {church.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{church.workingHours}</span>
                    </div>
                  )}

                  {church.moreInfo && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Дополнительно:</span>
                      <span className={styles.infoValue} style={{ whiteSpace: 'pre-wrap' }}>{church.moreInfo}</span>
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

export default ChurchesPitsunda; 