'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './PharmacySukhum.module.scss';
import { useTranslations } from '@/i18n/TranslationsContext';
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
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cityName = t('cities.sukhum');
        const url = getApiUrl(`/api/pharmacy/page/city_page/${encodeURIComponent(cityName)}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: cityName,
  pharmacies: [] });
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
          <h1 className={styles.mainTitle}>{error || t('error')}</h1>
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
            <h1 className={styles.mainTitle}>{data?.title || t('categories.pharmacy')}</h1>
          </section>

          {/* Карточки аптек */}
          <section className={styles.cardsSection}>
          {pharmacies.length === 0 && (
            <div style={{color:'#999', fontSize:'clamp(24px, 6vw, 64px)', textAlign:'center', padding:'clamp(60px, 15vw, 200px) 20px', lineHeight:1.2}}>
              {t('noInfo')}
            </div>
          )}
          {pharmacies.length > 0 && pharmacies.map((pharmacy) => (
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
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
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
                      <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                      <span className={styles.infoValue}>{pharmacy.working_hours}</span>
                    </div>
                  )}
                  
                  {pharmacy.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.phone')}:</span>
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
