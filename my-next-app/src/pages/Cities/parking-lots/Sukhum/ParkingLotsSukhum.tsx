'use client';

import React from 'react';
// next/image убираем; используем <img> как в банках
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ParkingLotsSukhum.module.scss';
import config from '@/config';

type ParkingLot = {
  id: number;
  name: string;
  address: string;
  address_link?: string;
  image_url?: string;
  order: number;
};

type CityPayload = {
  title: string;
  parking_lots: ParkingLot[];
};

const API_BASE = config.API_BASE;

const ParkingLotsSukhum: React.FC = () => {
  const [data, setData] = React.useState<CityPayload | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/parking-lots/page/city/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
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
          <h1 className={styles.mainTitle}>{data.title || 'Сухум: парковки для автомобилей'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.parking_lots.map((lot) => (
            <div key={lot.id} className={styles.parkingLotCard}>
              <div className={styles.imageContainer}>
                <img
                  src={lot.image_url ? `${API_BASE}/media/${lot.image_url}` : '/assets/placeholder.png'}
                  alt={lot.name}
                  className={styles.parkingLotImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.parkingLotName}>{lot.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${lot.address_link ? styles.addressLink : ''}`}>
                      {lot.address_link ? (
                        <a href={lot.address_link} target="_blank" rel="noopener noreferrer">{lot.address}</a>
                      ) : (
                        lot.address
                      )}
                    </span>
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

export default ParkingLotsSukhum; 