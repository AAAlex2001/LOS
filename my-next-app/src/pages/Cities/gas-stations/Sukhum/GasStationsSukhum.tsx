'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './GasStationsSukhum.module.scss';
import config from '@/config';

type GasStation = {
  id: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  contacts?: string;
  image_url?: string;
  order: number;
};

type CityPayload = {
  title: string;
  gas_stations: GasStation[];
};

const API_BASE = config.API_BASE;

const GasStationsSukhum: React.FC = () => {
  const [data, setData] = React.useState<CityPayload | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gas-stations/page/city/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
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
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>{data.title || 'Сухум: автозаправочные станции'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.gas_stations.map((station) => (
            <div key={station.id} className={styles.gasStationCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={station.image_url ? `${API_BASE}/media/${station.image_url}` : '/assets/placeholder.png'}
                  alt={station.name}
                  fill
                  className={styles.gasStationImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.gasStationName}>
                  {station.name_link ? (
                    <a href={station.name_link} target="_blank" rel="noopener noreferrer">
                      {station.name}
                    </a>
                  ) : (
                    station.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${station.address_link ? styles.addressLink : ''}`}>
                      {station.address_link ? (
                        <a href={station.address_link} target="_blank" rel="noopener noreferrer">{station.address}</a>
                      ) : (
                        station.address
                      )}
                    </span>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Контакты:</span>
                    <span className={styles.infoValue}>{station.contacts || ''}</span>
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

export default GasStationsSukhum; 