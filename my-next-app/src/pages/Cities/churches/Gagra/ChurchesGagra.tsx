'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ChurchesGagra.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type Church = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  working_hours?: string;
  description?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  churches: Church[];
};

const API_BASE = config.API_BASE;

const ChurchesGagra: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/churches/page/city/${encodeURIComponent('Гагра')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load churches');
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
          <h1 className={styles.mainTitle}>{data?.title || 'Гагра: церкви и храмы'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.churches.map((church) => (
            <div key={church.id} className={styles.churchCard}>
              <div className={styles.imageContainer}>
                {church.image_url && (
                  <img
                    src={`${API_BASE}/media/${church.image_url}`}
                    alt={church.name}
                    className={styles.churchImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.churchName}>
                  {church.name_link ? (
                    <a href={church.name_link} target="_blank" rel="noopener noreferrer">
                      {church.name}
                    </a>
                  ) : (
                    church.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${church.address_link ? styles.addressLink : ''}`}>
                      {church.address_link ? (
                        <a href={church.address_link} target="_blank" rel="noopener noreferrer">{church.address}</a>
                      ) : (
                        church.address
                      )}
                    </span>
                  </div>
                  
                  {church.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{church.working_hours}</span>
                    </div>
                  )}
                  
                  {church.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Описание:</span>
                      <span className={styles.infoValue}>{church.description}</span>
                    </div>
                  )}
                  
                  {church.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Богослужения:</span>
                      <span className={styles.infoValue}>{church.services}</span>
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

export default ChurchesGagra;