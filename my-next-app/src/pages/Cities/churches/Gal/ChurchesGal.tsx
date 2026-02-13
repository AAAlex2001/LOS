'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ChurchesGal.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

type City = { id: number; name: string; title?: string; order: number };
type Church = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  working_hours?: string;
  description?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  churches: Church[];
};

const API_BASE = config.API_BASE;

const ChurchesGal: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/churches/page/city_page/${encodeURIComponent('Гал')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const cityName = "Гал";
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: "Гал",
  churches: [] });
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

  const churches = data?.churches || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || t('categoryPages.churches')}</h1>
          </section>

          {/* Карточки церквей */}
          <section className={styles.cardsSection}>
          {churches.map((church) => (
            <div key={church.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {church.image_url && (
                  <img
                    src={`${API_BASE}/media/${church.image_url}`}
                    alt={church.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {church.name_link ? (
                    <a href={church.name_link} target="_blank" rel="noopener noreferrer">
                      {church.name}
                    </a>
                  ) : (
                    church.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
                    <span className={`${styles.infoValue} ${church.address_link ? styles.addressLink : ''}`}>
                      {church.address_link ? (
                        <a href={church.address_link} target="_blank" rel="noopener noreferrer">{church.address}</a>
                      ) : (
                        church.address
                      )}
                    </span>
                  </div>
                  
                  {church.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                      <span className={styles.infoValue}>{church.working_hours}</span>
                    </div>
                  )}
                  
                  {church.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('categories.description')}:</span>
                      <span className={styles.infoValue}>{church.description}</span>
                    </div>
                  )}
                  
                  {church.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('categories.services')}:</span>
                      <span className={styles.infoValue}>{church.services}</span>
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

export default ChurchesGal;