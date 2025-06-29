'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './AdministrativeBuildingsSukhum.module.scss';

// Данные административных зданий
const administrativeBuildings = [
  {
    id: 1,
    name: 'Администрация Президента',
    workingHours: 'с 09:00 до 18:00',
    address: 'Сухум, наб. Махаджиров, 32',
    contacts: '+7 (840) 229-70-14',
    image: '/assets/SukhumAdministrativeBuildings1.png',
    isClickable: true
  },
  {
    id: 2,
    name: 'Администрация Города',
    workingHours: 'с 09:00 до 18:00',
    address: 'Сухум, пр-кт Леона, 17',
    contacts: '+7 (840) 226-42-66',
    image: '/assets/SukhumAdministrativeBuildings2.png',
    isClickable: true
  },
  {
    id: 3,
    name: 'МВД Абхазии',
    workingHours: 'пн-пт 10:00-18:00, перерыв 13:00-14:00',
    address: 'Сухум, ул. Академика Марра, 35',
    contacts: '+7 (840) 222-53-79 / +7 (840) 229-73-00',
    image: '/assets/SukhumAdministrativeBuildings3.png',
    isClickable: false
  },
  {
    id: 4,
    name: 'Городская Прокуратура',
    workingHours: 'не указан',
    address: 'Сухум, Абазинская ул., 5',
    contacts: '+7 (840) 992-22-20',
    image: '/assets/SukhumAdministrativeBuildings4.png',
    isClickable: false
  },
  {
    id: 5,
    name: 'Генеральная прокуратура Республики Абхазия',
    workingHours: 'не указан',
    address: 'Сухум, ул. Гулиа, 38',
    contacts: '+7 (840) 226-37-86',
    image: '/assets/SukhumAdministrativeBuildings5.png',
    isClickable: true
  },
  {
    id: 6,
    name: 'Государственный таможенный комитет Республики Абхазия',
    workingHours: 'не указан',
    address: 'Сухум, ул. Конфедератов, 4',
    contacts: '+7 (940) 999-94-00',
    image: '/assets/SukhumAdministrativeBuildings6.png',
    isClickable: true
  },
  {
    id: 7,
    name: 'Посольство Российской Федерации в Республики Абхазия',
    workingHours: 'пн-чт 9:00-18:00, пт 9:00-16:45',
    address: 'г. Сухум, ул. Лакоба, д. 45',
    contacts: 'тел. +78402263693, факс +78402265693\nЭл. почта: rusembsukhum@mid.ru',
    image: '/assets/SukhumAdministrativeBuildings7.png',
    isClickable: true
  },
  {
    id: 8,
    name: 'УВД по г. Сухум',
    workingHours: 'не указан',
    address: 'г. Сухум, пр-кт Леона, д. 29',
    contacts: '+7 (840) 229-73-00',
    image: '/assets/SukhumAdministrativeBuildings8.png',
    isClickable: false
  }
];

const AdministrativeBuildingsSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: административные здания, правоохранительный блок</h1>
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
                <h2 className={`${styles.buildingName} ${building.isClickable ? styles.clickable : ''}`}>
                  {building.name}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Режим работы:</span>
                    <span className={styles.infoValue}>{building.workingHours}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${styles.addressLink}`}>{building.address}</span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Контакты:</span>
                    <span className={styles.infoValue}>{building.contacts}</span>
                  </div>
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

export default AdministrativeBuildingsSukhum; 