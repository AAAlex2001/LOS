'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacyGagra.module.scss';

// Данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Аптека-Глюкоза',
    workingHours: '09:00-21:00',
    address: 'Проспект Ардзинба, 117',
    addressLink: 'https://yandex.ru/maps/-/CDSwAJLi',
    contacts: '+7 (940) 991-05-86',
    image: '/assets/PharmacyGagra1.jpg'
  },
  {
    id: 2,
    name: 'Аптека',
    workingHours: '09:00-22:00',
    address: 'просп. Ардзинба, 90А',
    addressLink: 'https://yandex.ru/maps/-/CDSwA6id',
    contacts: null,
    image: '/assets/PharmacyGagra2.jpg'
  },
  {
    id: 3,
    name: 'Аптека Ракета Маркет',
    workingHours: '09:00-22:00',
    address: 'просп. Ардзинба, 140',
    addressLink: 'https://yandex.ru/maps/-/CDSwA0n6',
    contacts: '+7 (940) 708-21-21',
    image: '/assets/PharmacyGagra3.jpg'
  },
  {
    id: 4,
    name: 'Аптека Здоровье',
    workingHours: '08:00-22:00',
    address: 'ул. Султана Сосналиева, 12',
    addressLink: 'https://yandex.ru/maps/-/CDSwADl5',
    contacts: '+7(940) 751-05-05',
    image: '/assets/PharmacyGagra4.jpg'
  },
  {
    id: 5,
    name: 'Аптека Амра',
    workingHours: '09:00-00:00',
    address: 'ул. Абазгаа, 47/4',
    addressLink: 'https://yandex.ru/maps/-/CDSwEY8L',
    contacts: null,
    image: '/assets/PharmacyGagra5.jpg'
  },
  {
    id: 6,
    name: 'Аптека',
    workingHours: '07:00-23:00',
    address: 'ул. Абазгаа, 49/1',
    addressLink: 'https://yandex.ru/maps/-/CDSwEB7G',
    contacts: null,
    image: '/assets/PharmacyGagra6.webp'
  },
  {
    id: 7,
    name: 'Аптека',
    workingHours: '09:00-23:00',
    address: 'Гагра, микрорайон Новая Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDSwEJjt',
    contacts: null,
    image: '/assets/PharmacyGagra7.jpg'
  },
  {
    id: 8,
    name: 'Аптека Будь Здоров',
    workingHours: '09:00-21:00',
    address: 'ул. Абазгаа, 65',
    addressLink: 'https://yandex.ru/maps/-/CDSwE879',
    contacts: null,
    image: '/assets/PharmacyGagra8.webp'
  }
];

const PharmacyGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: аптеки</h1>
        </section>

        <section className={styles.cardsSection}>
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className={styles.pharmacyCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={pharmacy.image}
                  alt={pharmacy.name}
                  fill
                  className={styles.pharmacyImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.pharmacyName}>
                  {pharmacy.name}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${pharmacy.addressLink ? styles.addressLink : ''}`}>
                      {pharmacy.addressLink ? (
                        <a href={pharmacy.addressLink} target="_blank" rel="noopener noreferrer">{pharmacy.address}</a>
                      ) : (
                        pharmacy.address
                      )}
                    </span>
                  </div>
                  
                  {pharmacy.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{pharmacy.contacts}</span>
                    </div>
                  )}
                  
                  {pharmacy.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Часы работы:</span>
                      <span className={styles.infoValue}>{pharmacy.workingHours}</span>
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

export default PharmacyGagra; 