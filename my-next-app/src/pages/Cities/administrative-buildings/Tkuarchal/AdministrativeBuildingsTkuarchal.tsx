'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './AdministrativeBuildingsTkuarchal.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';

type City = { id: number; name: string; title?: string; order: number };
type Building = {
  id: number;
  city: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  buildings: Building[];
};

const API_BASE = config.API_BASE;

const AdministrativeBuildingsTkuarchal: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/administrative-buildings/page/city_page/${encodeURIComponent('Ткуарчал')}/`, locale);
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
  
  const buildings = data?.buildings || [];

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

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || t('categoryPages.administrativeBuildings')}</h1>
          </section>

          {/* Карточки зданий */}
          <section className={styles.cardsSection}>
          {buildings.map((building) => (
            <div key={building.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {building.image_url && (
                  <img
                    src={`${API_BASE}/media/${building.image_url}`}
                    alt={building.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {building.name_link ? (
                    <a href={building.name_link} target="_blank" rel="noopener noreferrer">
                      {building.name}
                    </a>
                  ) : (
                    building.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  {building.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                      <span className={styles.infoValue}>{building.working_hours}</span>
                    </div>
                  )}
                  
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
                    <span className={`${styles.infoValue} ${building.address_link ? styles.addressLink : ''}`}>
                      {building.address_link ? (
                        <a href={building.address_link} target="_blank" rel="noopener noreferrer">{building.address}</a>
                      ) : (
                        building.address
                      )}
                    </span>
                  </div>
                  
                  {building.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.contacts')}:</span>
                      <span className={styles.infoValue}>{building.contacts}</span>
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

export default AdministrativeBuildingsTkuarchal; 