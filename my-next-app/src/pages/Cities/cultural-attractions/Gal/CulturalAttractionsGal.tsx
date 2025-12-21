'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './CulturalAttractionsGal.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

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

const CulturalAttractionsGal: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/cultural-attractions/page/city_page/${encodeURIComponent('Гал')}/`, locale);
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

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>{data?.title || 'Гал: культурные достопримечательности'}</h1>
        </section>

        <section className={styles.attractionsSection}>
          {data.attractions.map((attraction) => (
            <div key={attraction.id} className={styles.attractionItem}>
              <div className={styles.imageContainer}>
                {attraction.image_url && (
                  <img
                    src={`${API_BASE}/media/${attraction.image_url}`}
                    alt={attraction.name}
                    className={styles.attractionImage}
                  />
                )}
              </div>

              <h2 className={styles.attractionTitle}>
                {attraction.name_link ? (
                  <a href={attraction.name_link} target="_blank" rel="noopener noreferrer">
                    {attraction.name}
                  </a>
                ) : (
                  attraction.name
                )}
              </h2>
              
              {attraction.description && (
                <div className={styles.attractionDescription}>
                  {attraction.description}
                </div>
              )}
              
              {attraction.working_hours && (
                <div className={styles.attractionWorkingHours}>
                  <span className={styles.workingHoursLabel}>Режим работы:</span>
                  <span className={styles.workingHoursValue}>{attraction.working_hours}</span>
                </div>
              )}
              
              <div className={styles.attractionAddress}>
                <span className={styles.addressLabel}>Адрес:</span>
                <span className={styles.addressValue}>
                  {attraction.address_link ? (
                    <a href={attraction.address_link} target="_blank" rel="noopener noreferrer">{attraction.address}</a>
                  ) : (
                    attraction.address
                  )}
                </span>
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

export default CulturalAttractionsGal;