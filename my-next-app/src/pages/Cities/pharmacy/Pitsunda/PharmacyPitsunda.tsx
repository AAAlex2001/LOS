'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacyPitsunda.module.scss';

// Данные аптек
const pharmacies = [
  {
    id: 1,
    name: 'Аптека',
    workingHours: 'с 09:00 до 20:00',
    address: 'Гагрский район, село Лдзаа, Рыбзаводская улица',
    addressLink: 'https://yandex.com/maps/-/CDD0QDon',
    contacts: null,
    image: '/assets/PharmacyPitsunda1.jpg'
  },
  {
    id: 2,
    name: 'Ракета Маркет',
    workingHours: 'с 09:00 до 22:00',
    address: 'Гагрский район, посёлок Псахара',
    addressLink: 'https://yandex.com/maps/-/CDD0U4PD',
    contacts: '+7 (940) 750-21-21',
    image: '/assets/PharmacyPitsunda2.jpg'
  },
  {
    id: 3,
    name: 'Аптека',
    workingHours: 'с 09:00 до 21:00',
    address: 'Гагрский район, квартал Чернобыль',
    addressLink: 'https://yandex.com/maps/-/CDD0UT5w',
    contacts: null,
    image: '/assets/PharmacyPitsunda3.jpg'
  },
  {
    id: 4,
    name: 'Аптека',
    workingHours: 'с 09:00 до 21:00',
    address: 'Гагрский район, посёлок Птицефабрика, Приморская улица 2',
    addressLink: 'https://yandex.com/maps/-/CDHbNKI6',
    contacts: '+7 (940) 722-66-88',
    image: '/assets/PharmacyPitsunda4.jpg'
  }
];

const PharmacyPitsunda: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Пицунда: аптеки</h1>
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

export default PharmacyPitsunda; 