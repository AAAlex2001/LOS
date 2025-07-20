'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ClothingRepairSukhum.module.scss';

// Данные ремонта одежды
const clothingRepair = [
  {
    id: 1,
    name: 'Мода Текс',
    workingHours: 'с 09:00 до 18:00',
    address: 'Сухум, ул. Генерала В.Г. Аршба, 50',
    addressLink: 'https://yandex.com/maps/-/CDtH6P5B',
    contacts: '+7 (840) 226-33-47',
    image: '/assets/ClothingRepairSukhum1.png'
  },
  {
    id: 2,
    name: 'Ремонт обуви',
    address: 'г.Сухум , пр.Аиааира',
    addressLink: 'https://maps.app.goo.gl/toT2ouzgPTpBdDiJ9',
    image: '/assets/ClothingRepairSukhum2.jpg'
  },
  {
    id: 3,
    name: 'Ремонт обуви',
    address: 'г.Сухум , пр.Аиааира 105',
    addressLink: 'https://go.2gis.com/My6pU',
    image: '/assets/ClothingRepairSukhum3.jpg'
  }
];

const ClothingRepairSukhum: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Сухум: ремонт одежды и обуви</h1>
        </section>

        {/* Карточки мастерских */}
        <section className={styles.cardsSection}>
          {clothingRepair.map((repair) => (
            <div key={repair.id} className={styles.clothingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                <Image
                  src={repair.image}
                  alt={repair.name}
                  fill
                  className={styles.clothingImage}
                />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.clothingName}>
                  {repair.name}
                </h2>
                
                <div className={styles.infoBlock}>
                  {repair.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{repair.workingHours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${repair.addressLink ? styles.addressLink : ''}`}>
                      {repair.addressLink ? (
                        <a href={repair.addressLink} target="_blank" rel="noopener noreferrer">{repair.address}</a>
                      ) : (
                        repair.address
                      )}
                    </span>
                  </div>
                  
                  {repair.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{repair.contacts}</span>
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

export default ClothingRepairSukhum; 