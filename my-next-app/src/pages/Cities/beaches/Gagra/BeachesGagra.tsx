'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesGagra.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type Beach = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  description?: string;
  phone?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  beaches: Beach[];
};

const API_BASE = config.API_BASE;

const BeachesGagra: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/beaches/page/city_page/${encodeURIComponent('Гагра')}/`, { cache: 'no-store' });
        
        if (!res.ok) {
          if (res.status === 404) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Страница не найдена');
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const json = (await res.json()) as CityPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'Ошибка загрузки данных');
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
          <h1 className={styles.mainTitle}>{data?.title || 'Гагра: пляжи'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.beaches.map((beach) => (
            <div key={beach.id} className={styles.beachCard}>
              <div className={styles.imageContainer}>
                {beach.image_url && (
                  <img
                    src={`${API_BASE}/media/${beach.image_url}`}
                    alt={beach.name}
                    className={styles.beachImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={`${styles.beachName} ${beach.name_link ? styles.clickable : ''}`}>
                  {beach.name_link ? (
                    <a href={beach.name_link} target="_blank" rel="noopener noreferrer">{beach.name}</a>
                  ) : (
                    beach.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${beach.address_link ? styles.addressLink : ''}`}>
                      {beach.address_link ? (
                        <a href={beach.address_link} target="_blank" rel="noopener noreferrer">{beach.address}</a>
                      ) : (
                        beach.address
                      )}
                    </span>
                  </div>

                  {beach.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{beach.phone}</span>
                    </div>
                  )}

                  {beach.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Информация:</span>
                      <span className={styles.infoValue} style={{whiteSpace: 'pre-line'}}>{beach.description}</span>
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

export default BeachesGagra;