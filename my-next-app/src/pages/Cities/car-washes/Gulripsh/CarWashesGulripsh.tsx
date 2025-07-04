'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CarWashesSukhum.module.scss';

// Данные автомоек
const carWashes = [
  {
    id: 1,
    name: 'М-1',
    nameLink: 'https://instagram.com/mo1ka_m1?igshid=MWZjMTM2ODFkZg==',
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Аидгылара, 2',
    addressLink: 'https://yandex.com/maps/-/CDhUn-~H',
    contacts: '+7 (940) 945-01-01',
    image: '/assets/CarWashesGulripsh1.jpg'
  },
  {
    id: 2,
    name: 'Автомойка АЗИД',
    workingHours: 'с 09:00 до 21:00',
    address: 'Сухум, Маяцкий район',
    addressLink: 'https://yandex.com/maps/-/CDhUvY4z',
    contacts: '+7 (940) 226-34-04',
    image: '/assets/CarWashesSukhum2.png'
  },
  {
    id: 3,
    name: 'Мойка AquaRalli',
    workingHours: 'круглосуточно',
    address: 'Сухум, ул. Эшба, 147',
    addressLink: 'https://yandex.com/maps/-/CDhUvL0U',
    contacts: '+7 (940) 772-39-33',
    image: '/assets/CarWashesSukhum3.png'
  },
  {
    id: 4,
    name: 'Автомойка Сухум',
    workingHours: '09:00 до 21:00',
    address: 'улица Бейгуа',
    addressLink: 'https://yandex.com/maps/-/CDhUzUIi',
    image: '/assets/CarWashesSukhum4.png'
  }
];

const CarWashesSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: автомойки</h1>
        </section>

        <section className={styles.cardsSection}>
          {carWashes.map((wash) => (
            <div key={wash.id} className={styles.carWashCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={wash.image}
                  alt={wash.name}
                  fill
                  className={styles.carWashImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.carWashName}>
                  {wash.nameLink ? (
                    <a href={wash.nameLink} target="_blank" rel="noopener noreferrer">
                      {wash.name}
                    </a>
                  ) : (
                    wash.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {wash.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{wash.workingHours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${wash.addressLink ? styles.addressLink : ''}`}>
                      {wash.addressLink ? (
                        <a href={wash.addressLink} target="_blank" rel="noopener noreferrer">{wash.address}</a>
                      ) : (
                        wash.address
                      )}
                    </span>
                  </div>
                  
                  {wash.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{wash.contacts}</span>
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

export default CarWashesSukhum; 