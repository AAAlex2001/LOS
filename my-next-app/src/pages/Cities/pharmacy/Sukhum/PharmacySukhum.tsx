'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacySukhum.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

type City = { id: number; name: string; title?: string; order: number };
type Pharmacy = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  phone?: string;
  working_hours?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  pharmacies: Pharmacy[];
};

const API_BASE = config.API_BASE;

const PharmacySukhum: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/pharmacy/page/city_page/${encodeURIComponent('Сухум')}/`, locale);
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

  const pharmacies = data?.pharmacies || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || 'Сухум: аптеки'}</h1>
          </section>

          {/* Карточки аптек */}
          <section className={styles.cardsSection}>
          {pharmacies.map((pharmacy) => (
            <div key={pharmacy.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {pharmacy.image_url && (
                  <img
                    src={`${API_BASE}/media/${pharmacy.image_url}`}
                    alt={pharmacy.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {pharmacy.name_link ? (
                    <a href={pharmacy.name_link} target="_blank" rel="noopener noreferrer">
                      {pharmacy.name}
                    </a>
                  ) : (
                    pharmacy.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${pharmacy.address_link ? styles.addressLink : ''}`}>
                      {pharmacy.address_link ? (
                        <a href={pharmacy.address_link} target="_blank" rel="noopener noreferrer">{pharmacy.address}</a>
                      ) : (
                        pharmacy.address
                      )}
                    </span>
                  </div>
                  
                  {pharmacy.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{pharmacy.working_hours}</span>
                    </div>
                  )}
                  
                  {pharmacy.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Телефон:</span>
                      <span className={styles.infoValue}>{pharmacy.phone}</span>
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

export default PharmacySukhum;
