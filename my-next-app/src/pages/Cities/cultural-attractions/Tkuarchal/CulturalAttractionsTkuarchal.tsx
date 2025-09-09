'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CulturalAttractionsTkuarchal.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type CulturalAttraction = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  description: string;
  address: string;
  address_link?: string;
  working_hours?: string;
  contacts?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  attractions: CulturalAttraction[];
};

const API_BASE = config.API_BASE;

const CulturalAttractionsTkuarchal: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cultural-attractions/page/city/${encodeURIComponent('Ткуарчал')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load cultural attractions');
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
          <h1 className={styles.mainTitle}>{data?.title || 'Ткуарчал: культурные достопримечательности'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.attractions.map((attraction) => (
            <div key={attraction.id} className={styles.attractionCard}>
              <div className={styles.imageContainer}>
                {attraction.image_url && (
                  <img
                    src={`${API_BASE}/media/${attraction.image_url}`}
                    alt={attraction.name}
                    className={styles.attractionImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.attractionName}>
                  {attraction.name_link ? (
                    <a href={attraction.name_link} target="_blank" rel="noopener noreferrer">
                      {attraction.name}
                    </a>
                  ) : (
                    attraction.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${attraction.address_link ? styles.addressLink : ''}`}>
                      {attraction.address_link ? (
                        <a href={attraction.address_link} target="_blank" rel="noopener noreferrer">{attraction.address}</a>
                      ) : (
                        attraction.address
                      )}
                    </span>
                  </div>
                  
                  {attraction.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{attraction.working_hours}</span>
                    </div>
                  )}
                  
                  {attraction.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Описание:</span>
                      <span className={styles.infoValue}>{attraction.description}</span>
                    </div>
                  )}
                  
                  {attraction.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{attraction.contacts}</span>
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

export default CulturalAttractionsTkuarchal;