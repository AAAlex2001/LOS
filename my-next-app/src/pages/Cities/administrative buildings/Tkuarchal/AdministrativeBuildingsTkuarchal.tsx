'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './AdministrativeBuildingsTkuarchal.module.scss';

// Данные административных зданий
const administrativeBuildings = [
  {
    id: 1,
    name: 'Администрация города',
    nameLink: null,
    workingHours: 'с 09:00 до 18:00',
    address: 'Ткуарчал, ул. Апсилов, 6',
    addressLink: 'https://yandex.com/maps/-/CDxd606P',
    contacts: null,
    image: '/assets/AdministrativeBuildingsTkaurchal1.jpg'
  }
];

const AdministrativeBuildingsTkuarchal: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Ткуарчал: административные здания, правоохранительный блок</h1>
        </section>

        {/* Карточки зданий */}
        <section className={styles.cardsSection}>
          {administrativeBuildings.map((building) => (
            <div key={building.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                <Image
                  src={building.image}
                  alt={building.name}
                  fill
                  className={styles.buildingImage}
                />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {building.nameLink ? (
                    <a href={building.nameLink} target="_blank" rel="noopener noreferrer">
                      {building.name}
                    </a>
                  ) : (
                    building.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {building.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{building.workingHours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${building.addressLink ? styles.addressLink : ''}`}>
                      {building.addressLink ? (
                        <a href={building.addressLink} target="_blank" rel="noopener noreferrer">{building.address}</a>
                      ) : (
                        building.address
                      )}
                    </span>
                  </div>
                  
                  {building.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{building.contacts}</span>
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

export default AdministrativeBuildingsTkuarchal; 