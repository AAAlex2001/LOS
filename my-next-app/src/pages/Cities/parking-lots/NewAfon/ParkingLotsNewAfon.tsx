'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ParkingLotsNewAfon.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from 'next-intl';

type City = { id: number; name: string; title?: string; order: number };
type ParkingLot = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
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
  parking_lots: ParkingLot[];
};

const API_BASE = config.API_BASE;

const ParkingLotsNewAfon: React.FC = () => {
  const t = useTranslations('ParkingLots');
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/parking-lots/page/city_page/${encodeURIComponent('Новый Афон')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
          if (res.status === 404) {
            const errorData = await res.json();
            throw new Error(errorData.error || t('common.pageNotFound'));
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
          <h1 className={styles.mainTitle}>{t('loading')}</h1>
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
          <h1 className={styles.mainTitle}>{error || t('loadingError')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const parkingLots = data?.parking_lots || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || 'Новый Афон: парковки для автомобилей'}</h1>
          </section>

          {/* Карточки парковок */}
          <section className={styles.cardsSection}>
          {parkingLots.map((lot) => (
            <div key={lot.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {lot.image_url && (
                  <img
                    src={`${API_BASE}/media/${lot.image_url}`}
                    alt={lot.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {lot.name_link ? (
                    <a href={lot.name_link} target="_blank" rel="noopener noreferrer">
                      {lot.name}
                    </a>
                  ) : (
                    lot.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('address')}</span>
                    <span className={`${styles.infoValue} ${lot.address_link ? styles.addressLink : ''}`}>
                      {lot.address_link ? (
                        <a href={lot.address_link} target="_blank" rel="noopener noreferrer">{lot.address}</a>
                      ) : (
                        lot.address
                      )}
                    </span>
                  </div>
                  
                  {lot.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('workingHours')}</span>
                      <span className={styles.infoValue}>{lot.working_hours}</span>
                    </div>
                  )}
                  
                  {lot.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('contacts')}</span>
                      <span className={styles.infoValue}>{lot.contacts}</span>
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

export default ParkingLotsNewAfon;
