'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './BeachesGudauta.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';

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

const BeachesGudauta: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/beaches/page/city_page/${encodeURIComponent('Гудаута')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const cityName = "Гудаута";
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: "Гудаута",
  beaches: [] });
            return;
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const json = (await res.json()) as CityPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : t('common.error'));
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
          <h1 className={styles.mainTitle}>{t('common.loading')}</h1>
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
          <h1 className={styles.mainTitle}>{error || t('common.error')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const beaches = data?.beaches || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || t('categoryPages.beaches')}</h1>
          </section>

          {/* Карточки пляжей */}
          <section className={styles.cardsSection}>
          {beaches.map((beach) => (
            <div key={beach.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {beach.image_url && (
                  <img
                    src={`${API_BASE}/media/${beach.image_url}`}
                    alt={beach.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {beach.name_link ? (
                    <a href={beach.name_link} target="_blank" rel="noopener noreferrer">
                      {beach.name}
                    </a>
                  ) : (
                    beach.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
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
                      <span className={styles.infoLabel}>{t('common.phone')}:</span>
                      <span className={styles.infoValue}>{beach.phone}</span>
                    </div>
                  )}
                  
                  {beach.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('categoryPages.description')}:</span>
                      <span className={styles.infoValue}>{beach.description}</span>
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

export default BeachesGudauta;