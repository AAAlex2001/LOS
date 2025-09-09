'use client';

import React from 'react';
// next/image убираем; используем <img> как в банках
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './WineriesSukhum.module.scss';
import config from '@/config';

type Winery = {
  id: number;
  name: string;
  working_hours?: string;
  address: string;
  address_link?: string;
  contacts?: string;
  image_url?: string;
  order: number;
};

type CityPayload = {
  title: string;
  wineries: Winery[];
};

const API_BASE = config.API_BASE;

const WineriesSukhum: React.FC = () => {
  const [data, setData] = React.useState<CityPayload | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/wineries/page/city/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = (await res.json()) as CityPayload;
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
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>Загрузка...</h1>
          </section>
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
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>{data.title || 'Сухум: винодельни'}</h1>
        </section>

        {/* Карточки виноделен */}
        <section className={styles.cardsSection}>
          {data.wineries.map((winery) => (
            <div key={winery.id} className={styles.wineryCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                <img
                  src={winery.image_url ? `${API_BASE}/media/${winery.image_url}` : '/assets/placeholder.png'}
                  alt={winery.name}
                  className={styles.wineryImage}
                />
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.wineryName}>{winery.name}</h2>
                
                <div className={styles.infoBlock}>
                  {winery.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{winery.working_hours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${winery.address_link ? styles.addressLink : ''}`}>
                      {winery.address_link ? (
                        <a href={winery.address_link} target="_blank" rel="noopener noreferrer">{winery.address}</a>
                      ) : (
                        winery.address
                      )}
                    </span>
                  </div>

                  {winery.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{winery.contacts}</span>
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

export default WineriesSukhum; 