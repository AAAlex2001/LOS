'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ClothingRepairNewAfon.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';

type City = { id: number; name: string; title?: string; order: number };
type ClothingRepair = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  working_hours?: string;
  contacts?: string;
  description?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  repairs: ClothingRepair[];
};

const API_BASE = config.API_BASE;

const ClothingRepairNewAfon: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/clothing-repair/page/city_page/${encodeURIComponent('Новый Афон')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const cityName = "Новый Афон";
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: "Новый Афон",
  repairs: [] });
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

  const repairs = data?.repairs || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || t('categoryPages.clothingRepair')}</h1>
          </section>

          {/* Карточки ремонта */}
          <section className={styles.cardsSection}>
          {repairs.map((repair) => (
            <div key={repair.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {repair.image_url && (
                  <img
                    src={`${API_BASE}/media/${repair.image_url}`}
                    alt={repair.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {repair.name_link ? (
                    <a href={repair.name_link} target="_blank" rel="noopener noreferrer">
                      {repair.name}
                    </a>
                  ) : (
                    repair.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
                    <span className={`${styles.infoValue} ${repair.address_link ? styles.addressLink : ''}`}>
                      {repair.address_link ? (
                        <a href={repair.address_link} target="_blank" rel="noopener noreferrer">{repair.address}</a>
                      ) : (
                        repair.address
                      )}
                    </span>
                  </div>
                  
                  {repair.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                      <span className={styles.infoValue}>{repair.working_hours}</span>
                    </div>
                  )}
                  
                  {repair.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.contacts')}:</span>
                      <span className={styles.infoValue}>{repair.contacts}</span>
                    </div>
                  )}
                  
                  {repair.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('categories.description')}:</span>
                      <span className={styles.infoValue}>{repair.description}</span>
                    </div>
                  )}
                  
                  {repair.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.services')}:</span>
                      <span className={styles.infoValue}>{repair.services}</span>
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

export default ClothingRepairNewAfon;

