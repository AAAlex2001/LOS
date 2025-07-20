'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './AdministrativeBuildingsGagra.module.scss';

// Данные административных зданий
const administrativeBuildings = [
  {
    id: 1,
    name: 'Администрация города Гагра и Гагрского района',
    nameLink: null,
    workingHours: '09:00 – 17:00',
    address: 'проспект Ардзинба, 145',
    addressLink: 'https://yandex.ru/maps/-/CDfiQKow',
    contacts: '+7(840)-234-13-55',
    image: '/assets/AdministrativeBuildingsGagra1.jpg'
  },
  {
    id: 2,
    name: 'Управление внутренних дел по Гагрскому району',
    nameLink: null,
    address: 'ул. Абазгаа, 67/4',
    addressLink: 'https://yandex.ru/maps/-/CDfimWn8',
    contacts: 'Тел.Доверия-234-10-81,  234- 22-71,  234-10-71\n+7 (940) 234-10-81',
    image: '/assets/AdministrativeBuildingsGagra2.jpg'
  },
  {
    id: 3,
    name: 'Прокуратура Гагрского района',
    nameLink: null,
    address: 'ул. Абазгаа, 67/4, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDfiuHOb',
    contacts: '+7(940) 234-39-44',
    image: '/assets/AdministrativeBuildingsGagra3.jpg'
  },
  {
    id: 4,
    name: 'Министерство по чрезвычайным ситуациям Республики Абхазия',
    nameLink: null,
    address: '4-й тупик Сухумского ш., 1А, Гагра',
    addressLink: 'https://yandex.ru/maps/-/CDfiyKpv',
    contacts: '234-60-01, +7(940) 993-37-77 (сот)',
    image: '/assets/AdministrativeBuildingsGagra4.jpg'
  }
];

const AdministrativeBuildingsGagra: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Гагра: административные здания, правоохранительный блок</h1>
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

export default AdministrativeBuildingsGagra; 