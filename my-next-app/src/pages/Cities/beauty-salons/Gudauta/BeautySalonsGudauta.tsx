'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeautySalonsGudauta.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type BeautySalon = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  phone?: string;
  working_hours?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  beauty_salons: BeautySalon[];
};

const API_BASE = config.API_BASE;

const BeautySalonsGudauta: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/beauty-salons/page/city/${encodeURIComponent('Гудаута')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load beauty salons');
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
          <h1 className={styles.mainTitle}>{data?.title || 'Гудаута: салоны красоты'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.beauty_salons.map((salon) => (
            <div key={salon.id} className={styles.beautySalonCard}>
              <div className={styles.imageContainer}>
                {salon.image_url && (
                  <img
                    src={`${API_BASE}/media/${salon.image_url}`}
                    alt={salon.name}
                    className={styles.beautySalonImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.beautySalonName}>
                  {salon.name_link ? (
                    <a href={salon.name_link} target="_blank" rel="noopener noreferrer">
                      {salon.name}
                    </a>
                  ) : (
                    salon.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${salon.address_link ? styles.addressLink : ''}`}>
                      {salon.address_link ? (
                        <a href={salon.address_link} target="_blank" rel="noopener noreferrer">{salon.address}</a>
                      ) : (
                        salon.address
                      )}
                    </span>
                  </div>
                  
                  {salon.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{salon.phone}</span>
                    </div>
                  )}
                  
                  {salon.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{salon.working_hours}</span>
                    </div>
                  )}
                  
                  {salon.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Услуги:</span>
                      <span className={styles.infoValue}>{salon.services}</span>
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

export default BeautySalonsGudauta;