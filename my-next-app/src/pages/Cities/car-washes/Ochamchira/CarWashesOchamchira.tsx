'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CarWashesOchamchira.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

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

const CarWashesOchamchira: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/car-washes/page/city_page/${encodeURIComponent('Очамчыра')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        
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
  }, [locale]);

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

  const carWashes = data?.car_washes || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || 'Очамчыра: мойки машин'}</h1>
          </section>

          {/* Карточки моек */}
          <section className={styles.cardsSection}>
          {carWashes.map((carWash) => (
            <div key={carWash.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {carWash.image_url && (
                  <img
                    src={`${API_BASE}/media/${carWash.image_url}`}
                    alt={carWash.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
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
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default CarWashesOchamchira;