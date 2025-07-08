'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Taxi.module.scss';

interface TaxiCard {
  id: number;
  img?: string;
  title: string;
  workingHours: string;
  phones: string[];
  site: string;
}

const taxiServices: TaxiCard[] = [
  {
    id: 1,
    img: '/assets/taxi1.svg',
    title: 'Фортуна Такси',
    workingHours: 'круглосуточно',
    phones: ['+79409240024 (звонки и WhatsApp)', '+79407240024'],
    site: 'https://fortuna.abkhazia.su/',
  },
  {
    id: 2,
    img: '/assets/taxi2.svg',
    title: 'GT Abkhazia',
    workingHours: 'не указано',
    phones: ['Абхазия', '+7 (840) 22-333-22', 'Трансфер из Сочи', '+7 (862) 225-74-20'],
    site: 'https://abhtaxi.ru/contacts/',
  },
  {
    id: 3,
    img: '/assets/taxi3.svg',
    title: 'А-ТАКСИ',
    workingHours: 'круглосуточно',
    phones: ['+7 (940) 903-1-903', '+7(940) 703-1-703 (WhatsApp)'],
    site: 'https://abhtaxi.ru/contacts/',
  },
  {
    id: 4,
    img: '/assets/taxi4.svg',
    title: 'Такси GARUDA',
    workingHours: 'круглосуточно',
    phones: ['+7 940 999 00 00 / +7 940 777 00 00', '+7 940 996 00 00 / +7 940 776 00 00'],
    site: 'https://abhtaxi.ru/contacts/',
  },
  {
    id: 5,
    img: '/assets/taxi5.svg',
    title: 'RED Такси',
    workingHours: 'круглосуточно',
    phones: ['+7 (940) 700-00-00', '7000'],
    site: 'https://www.redtaxi.biz/',
  },
];

const topRowServices = taxiServices.slice(0, 3);
const bottomRowServices = taxiServices.slice(3);

const Taxi: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Такси</h1>
        
        <div className={styles.fullWidthSection}>
          <div className={styles.backgroundImageSection}>
            <div className={styles.introOverlay}>
              <p className={styles.introText}>
                Мы собрали для вас лучшие такси — просто выберите!
                Круглосуточно во всех городах Абхазии.
              </p>
            </div>
          </div>
        </div>

        <section className={styles.taxiContainer}>
          <div className={styles.row}>
            {topRowServices.map((taxi) => (
              <article key={taxi.id} className={styles.card}>
                {taxi.img && (
                  <img
                    className={styles.cardImg}
                    src={taxi.img}
                    alt="taxi service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <a href={taxi.site} className={styles.cardTitle} target="_blank" rel="noopener noreferrer">
                    {taxi.title}
                  </a>
                  <p className={styles.workingHours}>Время работы: {taxi.workingHours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>Заказать такси:</p>
                    <div className={styles.phoneList}>
                      {taxi.phones.map((phone, index) => (
                        <p key={index} className={styles.phone}>{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottomRowServices.map((taxi) => (
              <article key={taxi.id} className={styles.card}>
                {taxi.img && (
                  <img
                    className={styles.cardImg}
                    src={taxi.img}
                    alt="taxi service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <a href={taxi.site} className={styles.cardTitle} target="_blank" rel="noopener noreferrer">
                    {taxi.title}
                  </a>
                  <p className={styles.workingHours}>Время работы: {taxi.workingHours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>Заказать такси:</p>
                    <div className={styles.phoneList}>
                      {taxi.phones.map((phone, index) => (
                        <p key={index} className={styles.phone}>{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Taxi; 