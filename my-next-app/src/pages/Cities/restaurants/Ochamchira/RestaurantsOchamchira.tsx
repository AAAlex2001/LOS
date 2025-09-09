'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './RestaurantsOchamchira.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type Restaurant = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  description?: string;
  phone?: string;
  working_hours?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  restaurants: Restaurant[];
};

const API_BASE = config.API_BASE;

const RestaurantsOchamchira: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/restaurants/page/city_page/${encodeURIComponent('Очамчыра')}/`, { cache: 'no-store' });
        
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
          <h1 className={styles.mainTitle}>{data?.title || 'Очамчыра: рестораны'}</h1>
        </section>

        <section className={styles.cardsSection}>
          {data.restaurants.map((restaurant) => (
            <div key={restaurant.id} className={styles.restaurantCard}>
              <div className={styles.imageContainer}>
                {restaurant.image_url && (
                  <img
                    src={`${API_BASE}/media/${restaurant.image_url}`}
                    alt={restaurant.name}
                    className={styles.restaurantImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              <div className={styles.infoContainer}>
                <h2 className={styles.restaurantName}>
                  {restaurant.name_link ? (
                    <a href={restaurant.name_link} target="_blank" rel="noopener noreferrer">
                      {restaurant.name}
                    </a>
                  ) : (
                    restaurant.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${restaurant.address_link ? styles.addressLink : ''}`}>
                      {restaurant.address_link ? (
                        <a href={restaurant.address_link} target="_blank" rel="noopener noreferrer">{restaurant.address}</a>
                      ) : (
                        restaurant.address
                      )}
                    </span>
                  </div>
                  
                  {restaurant.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{restaurant.phone}</span>
                    </div>
                  )}
                  
                  {restaurant.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{restaurant.working_hours}</span>
                    </div>
                  )}
                  
                  {restaurant.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Описание:</span>
                      <span className={styles.infoValue}>{restaurant.description}</span>
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

export default RestaurantsOchamchira;