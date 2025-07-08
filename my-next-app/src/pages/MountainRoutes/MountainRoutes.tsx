import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './MountainRoutes.module.scss';

interface RouteCard {
  id: number;
  img?: string;
  phone?: string;
  site?: string;
  text?: string;
  title?: string;
  name?: string;
}

const routes: RouteCard[] = [
  {
    id: 1,
    img: '/assets/logoMountain.svg',
    site: 'САЙТ: https://highlandabkhazia.ru',
  },
  {
    id: 2,
    img: '/assets/MountainCar.png',
    site: 'САЙТ: https://www.instagram.com/dzhiping_abkhazia/',
  },
  {
    id: 3,
    img: '/assets/logoMountain2.png',
    site: 'САЙТ: https://apsny.world/mountain-night',
  },
  {
    id: 4,
    img: '/assets/MountainApp.png',
    text: 'Контакты: +7 (940) 932-51-51',
    site: 'САЙТ: https://apsny-travel.com/tours_catalog.php',
  },
  {
    id: 5,
    title: 'ИНДИВИДУАЛЬНЫЕ МАРШРУТЫ',
    name: 'Астамур Кация',
    phone: '+7–940–772–67–70',
    img: '/assets/activity_gornye_marshruty.jpg',
  },
];

const topRowServices = routes.slice(0, 3);
const bottomRowServices = routes.slice(3);

const MountainRoutes: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Горные маршруты</h1>
        
        <section className={styles.routesContainer}>
          <div className={styles.row}>
            {topRowServices.map((route) => (
              <article
                key={route.id}
                className={route.text ? `${styles.card} ${styles.textCard}` : styles.card}
              >
                {route.img && (
                  <img
                    className={styles.cardImg}
                    src={route.img}
                    alt={route.site || route.title || 'mountain route'}
                  />
                )}
                <div className={styles.cardBody}>
                  {route.title && <h3 className={styles.cardTitle}>{route.title}</h3>}
                  {route.name && <p className={styles.cardName}>{route.name}</p>}
                  {route.phone && !route.img && (
                    <p className={styles.cardPhone}>Тел.: {route.phone}</p>
                  )}
                  {route.phone && route.img && <p className={styles.phone}>Контакты: {route.phone}</p>}
                  {route.site && (
                    <a
                      href={route.site.includes('http') ? route.site.replace('САЙТ: ', '') : route.site}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {route.site}
                    </a>
                  )}
                  {route.text && <p className={styles.text}>{route.text}</p>}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottomRowServices.map((route) => (
              <article
                key={route.id}
                className={route.text ? `${styles.card} ${styles.textCard}` : styles.card}
              >
                {route.img && (
                  <img
                    className={styles.cardImg}
                    src={route.img}
                    alt={route.site || route.title || 'mountain route'}
                  />
                )}
                <div className={styles.cardBody}>
                  {route.title && <h3 className={styles.cardTitle}>{route.title}</h3>}
                  {route.name && <p className={styles.cardName}>{route.name}</p>}
                  {route.phone && !route.img && (
                    <p className={styles.cardPhone}>Тел.: {route.phone}</p>
                  )}
                  {route.phone && route.img && <p className={styles.phone}>Контакты: {route.phone}</p>}
                  {route.site && (
                    <a
                      href={route.site.includes('http') ? route.site.replace('САЙТ: ', '') : route.site}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {route.site}
                    </a>
                  )}
                  {route.text && <p className={styles.text}>{route.text}</p>}
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

export default MountainRoutes; 