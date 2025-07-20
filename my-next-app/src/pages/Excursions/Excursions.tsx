'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Excursions.module.scss';

interface ExcursionCard {
  id: number;
  img?: string;
  contacts: string;
  site: string;
}

const excursionServices: ExcursionCard[] = [
  {
    id: 1,
    img: '/assets/Excursions1.svg',
    contacts: 'Контакты: +7 (940) 910-70-70',
    site: 'https://welcome-abkhazia.com/',
  },
  {
    id: 2,
    img: '/assets/Excursions2.svg',
    contacts: 'Контакты: +7 (940) 771-62-84',
    site: 'https://new.sukhum-travel.ru/',
  },
  {
    id: 3,
    img: '/assets/Excursions3.svg',
    contacts: 'Контакты: +7 (940) 932-51-51',
    site: 'https://apsny-travel.com/tours_catalog.php',
  },
  {
    id: 4,
    img: '/assets/Excursions4.svg',
    contacts: 'Контакты: +7 (940) 770-22-20',
    site: 'https://kruizgagra.ru/ekskursii',
  },
  {
    id: 5,
    img: '/assets/Excursions5.svg',
    contacts: 'Контакты: +7 (940) 996-72-76,\nWhatsapp +7 (940) 996-72-76',
    site: 'https://continent-gagra.ru/excursionsabkhazia',
  },
];

const topRowServices = excursionServices.slice(0, 3);
const bottomRowServices = excursionServices.slice(3);

const Excursions: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Экскурсии</h1>
        
        <section className={styles.excursionContainer}>
          <div className={styles.row}>
            {topRowServices.map((excursion) => (
              <article key={excursion.id} className={styles.card}>
                {excursion.img && (
                  <img
                    className={styles.cardImg}
                    src={excursion.img}
                    alt="excursion service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardContacts}>{excursion.contacts}</p>
                  <a
                    href={excursion.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {excursion.site}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottomRowServices.map((excursion) => (
              <article key={excursion.id} className={styles.card}>
                {excursion.img && (
                  <img
                    className={styles.cardImg}
                    src={excursion.img}
                    alt="excursion service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardContacts}>{excursion.contacts}</p>
                  <a
                    href={excursion.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {excursion.site}
                  </a>
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

export default Excursions; 