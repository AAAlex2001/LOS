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
    nameLink: 'http://presidentofabkhazia.org/',
    workingHours: 'с 09:00 до 18:00',
    address: 'Сухум, наб. Махаджиров, 32',
    addressLink: 'https://yandex.com/maps/-/CDTxuCIy',
    contacts: '+7 840 229-70-14',
    image: '/assets/AdministrativeBuildingsSukhum1.jpg'
  },
  {
    id: 2,
    name: 'Администрация Города',
    nameLink: 'https://www.sukhumcity.ru/',
    workingHours: 'с 09:00 до 18:00',
    address: 'Сухум, просп. Леона, 17',
    contacts: '8 840 226-42-66',
    image: '/assets/AdministrativeBuildingsSukhum2.jpg'
  },
  {
    id: 3,
    name: 'МВД Абхазии',
    workingHours: 'пн-пт 10:00-18:00, перерыв 13:00-14:00',
    address: 'Сухум, ул. Академика Марра, 35',
    addressLink: 'https://yandex.com/maps/-/CDT3EMoK',
    contacts: '+7 (840) 222-53-79\n+7 (840) 229-73-00',
    image: '/assets/AdministrativeBuildingsSukhum3.jpg'
  },
  {
    id: 4,
    name: 'Городская Прокуратура',
    nameLink: 'https://genproc.apsny.land/',
    address: 'Сухум, Абазинская ул., 5',
    addressLink: 'https://yandex.com/maps/-/CDT3Q4zY',
    contacts: '+7 (940) 992-22-20',
    image: '/assets/AdministrativeBuildingsSukhum4.jpg'
  },
  {
    id: 5,
    name: 'Генеральная прокуратура Республики Абхазия',
    nameLink: 'https://genproc.apsny.land/',
    address: 'Сухум, ул. Гулиа, 38',
    addressLink: 'https://yandex.com/maps/-/CDT34Cnt',
    contacts: '+7 (840) 226‒37‒86',
    image: '/assets/AdministrativeBuildingsSukhum5.jpg'
  },
  {
    id: 6,
    name: 'Государственный таможенный комитет Республики Абхазия',
    nameLink: 'http://customsra.com/',
    address: 'Сухум, ул. Конфедератов, 4',
    addressLink: 'https://yandex.com/maps/-/CDT~qLik',
    contacts: '+7 (940) 999-94-00',
    image: '/assets/AdministrativeBuildingsSukhum6.png'
  },
  {
    id: 7,
    name: 'Посольство Российской Федерации в Республики Абхазия',
    workingHours: 'понедельник – четверг с 09:00 до 18:00\nпятница – с 09:00 до 16:45',
    address: 'г. Сухум, ул. Лакоба, д. 45',
    contacts: 'тел. +78402263693, факс +78402265693\nЭл. почта rusembsukhum@mid.ru',
    image: '/assets/AdministrativeBuildingsSukhum7.jpg'
  },
  {
    id: 8,
    name: 'УВД по г. Сухум',
    address: 'г. Сухум проспект Леона, 29',
    addressLink: 'https://yandex.ru/maps/10281/suhum/geo/2474961838/',
    contacts: 'Тел. +78402297300',
    image: '/assets/AdministrativeBuildingsSukhum8.jpg'
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

export default AdministrativeBuildingsSukhum; 