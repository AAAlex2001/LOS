'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CarWashesPitsunda.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type CarWash = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  contacts?: string;
  working_hours?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  car_washes: CarWash[];
};

const API_BASE = config.API_BASE;

const CarWashesPitsunda: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/car-washes/page/city/${encodeURIComponent('Пицунда')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load car washes');
        const json = (await res.json()) as CityPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>{data?.title || 'Пицунда: мойки машин'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.car_washes.map((carWash) => (
            <div key={carWash.id} className={styles.carWashCard}>
              <div className={styles.imageContainer}>
                {carWash.image_url && (
                  <img
                    src={`${API_BASE}/media/${carWash.image_url}`}
                    alt={carWash.name}
                    className={styles.carWashImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.carWashName}>
                  {carWash.name_link ? (
                    <a href={carWash.name_link} target="_blank" rel="noopener noreferrer">
                      {carWash.name}
                    </a>
                  ) : (
                    carWash.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${carWash.address_link ? styles.addressLink : ''}`}>
                      {carWash.address_link ? (
                        <a href={carWash.address_link} target="_blank" rel="noopener noreferrer">{carWash.address}</a>
                      ) : (
                        carWash.address
                      )}
                    </span>
                  </div>
                  
                  {carWash.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{carWash.contacts}</span>
                    </div>
                  )}
                  
                  {carWash.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{carWash.working_hours}</span>
                    </div>
                  )}
                  
                  {carWash.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Услуги:</span>
                      <span className={styles.infoValue}>{carWash.services}</span>
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

export default CarWashesPitsunda;