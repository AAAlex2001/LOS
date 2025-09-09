'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './HotelsSukhum.module.scss';
import config from '@/config';

type Hotel = {
  id: number;
  name: string;
  address: string;
  address_link?: string;
  contacts?: string;
  price?: string;
  image_url?: string;
  order: number;
};

type CityPayload = {
  title: string;
  hotels: Hotel[];
};

const API_BASE = config.API_BASE;

const HotelsSukhum: React.FC = () => {
  const [data, setData] = React.useState<CityPayload | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hotels/page/city/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
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
          <h1 className={styles.mainTitle}>{data.title || 'Сухум: отели'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.hotels.map((hotel) => (
            <div key={hotel.id} className={styles.hotelCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={hotel.image_url ? `${API_BASE}/media/${hotel.image_url}` : '/assets/placeholder.png'}
                  alt={hotel.name}
                  fill
                  className={styles.hotelImage}
                />
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.hotelName}>{hotel.name}</h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${hotel.address_link ? styles.addressLink : ''}`}>
                      {hotel.address_link ? (
                        <a href={hotel.address_link} target="_blank" rel="noopener noreferrer">{hotel.address}</a>
                      ) : (
                        hotel.address
                      )}
                    </span>
                  </div>
                  
                  {hotel.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{hotel.contacts}</span>
                    </div>
                  )}

                  {hotel.price && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Цена:</span>
                      <span className={styles.infoValue}>{hotel.price}</span>
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

export default HotelsSukhum; 