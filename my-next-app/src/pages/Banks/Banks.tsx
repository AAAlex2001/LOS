'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './Banks.module.scss';

// Данные банков (добавьте соответствующие изображения в папку /assets)
const banks = [
  {
    id: 1,
    name: 'АВРОРА БАНК',
    nameLink: 'https://www.aurora-bank.com/',
    workingHours: 'пн–пт 9:00–16:30\nперерыв 13:00–14:00',
    address: 'Республика Абхазия, г. Сухум, ул. Званба, д. 70, лит. «А»',
    addressLink: null,
    contacts: '+7 (940) 940–09–40',
    email: 'info@aurora-bank.com',
    image: '/assets/banks1.jpg'
  },
  {
    id: 2,
    name: 'АМРА-БАНК',
    nameLink: 'https://amra-bank.com/ru',
    workingHours: 'пн–пт 9:00–17:00 (перерыв 13:00–14:00),\nсб–вс 10:00–15:00 (без перерыва)',
    address: 'Республика Абхазия, г. Сухум, ул. Лакоба-Конфедератов, 70/27',
    addressLink: null,
    contacts: '+7 840 227–73–35 / WAPP, Tg +7(940) 727–73–35',
    email: 'info@amra-bank.com',
    image: '/assets/banks2.jpg'
  },
  {
    id: 3,
    name: 'КИБИТ БАНК',
    nameLink: 'https://cibit-bank.com/',
    workingHours: 'пн–пт 9:30–17:00, сб–вс – выходной\nперерыв 13:00–14:00',
    address: 'Республика Абхазия, г. Сухум, пр. Леона, 9',
    addressLink: null,
    contacts: '+7(840) 229–41–82 / +7(940) 799–77–79',
    email: 'info@cibit-bank.com',
    image: '/assets/banks3.jpg'
  },
  {
    id: 4,
    name: 'НАЦИОНАЛЬНЫЙ БАНК РЕСПУБЛИКИ АБХАЗИЯ',
    nameLink: 'https://nb-ra.org',
    workingHours: 'пн–пт 9:00–18:00, сб–вс – выходные',
    address: 'Республика Абхазия, г. Сухум, проспект Леона, 14',
    addressLink: null,
    contacts: '+7(840) 229–76–23',
    email: 'info@nb-ra.org',
    image: '/assets/banks4.jpg'
  },
  {
    id: 5,
    name: 'СберБанк РЕСПУБЛИКИ АБХАЗИЯ',
    nameLink: 'https://www.sbra.su/',
    workingHours: 'не указан',
    address: 'Республика Абхазия, г. Сухум, ул. Айдгылара 10,12',
    addressLink: null,
    contacts: '+7 (840) 229–43–32',
    email: 'info@sbra.su',
    image: '/assets/banks5.jpg'
  },
  {
    id: 6,
    name: 'СУХУМ БАНК',
    nameLink: 'https://sukhumbank.ru/ru/',
    workingHours: 'не указан',
    address: 'Республика Абхазия, г. Сухум, Проспект Леона, 31-А',
    addressLink: null,
    contacts: '+7 (840) 226–52–85 / +7(840)226–79–13',
    email: 'info@sukhumbank.ru',
    image: '/assets/banks6.jpg'
  }
];

const Banks: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Банки</h1>
        </section>

        {/* Карточки банков */}
        <section className={styles.cardsSection}>
          {banks.map((bank) => (
            <div key={bank.id} className={styles.buildingCard}>
              {/* Изображение (логотип банка) */}
              <div className={styles.imageContainer}>
                <img src={bank.image} alt={bank.name} className={styles.buildingImage} />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {bank.nameLink ? (
                    <a href={bank.nameLink} target="_blank" rel="noopener noreferrer">
                      {bank.name}
                    </a>
                  ) : (
                    bank.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {bank.workingHours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{bank.workingHours}</span>
                    </div>
                  )}

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Контакты:</span>
                    <span className={styles.infoValue}>{bank.contacts}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Почта:</span>
                    <a href={`mailto:${bank.email}`} className={`${styles.infoValue} ${styles.link}`}>{bank.email}</a>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={styles.infoValue}>{bank.address}</span>
                  </div>

                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Сайт:</span>
                    <a href={bank.nameLink} target="_blank" rel="noopener noreferrer" className={`${styles.infoValue} ${styles.link}`}>{bank.nameLink}</a>
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

export default Banks; 