'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ShopsAndMarketsGulripsh.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';

type City = { id: number; name: string; title?: string; order: number };
type Shop = {
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
  shops: Shop[];
};

const API_BASE = config.API_BASE;

const ShopsAndMarketsGulripsh: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const t = useTranslations();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/shops-and-markets/page/city_page/${encodeURIComponent('Гулрыпш')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const cityName = "Гулрыпш";
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: "Гулрыпш",
  shops: [] });
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

  const shops = data?.shops || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || t('categories.shopsAndMarkets')}</h1>
          </section>

          {/* Карточки магазинов */}
          <section className={styles.cardsSection}>
          {shops.map((shop) => (
            <div key={shop.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {shop.image_url && (
                  <img
                    src={`${API_BASE}/media/${shop.image_url}`}
                    alt={shop.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {shop.name_link ? (
                    <a href={shop.name_link} target="_blank" rel="noopener noreferrer">
                      {shop.name}
                    </a>
                  ) : (
                    shop.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('common.address')}:</span>
                    <span className={`${styles.infoValue} ${shop.address_link ? styles.addressLink : ''}`}>
                      {shop.address_link ? (
                        <a href={shop.address_link} target="_blank" rel="noopener noreferrer">{shop.address}</a>
                      ) : (
                        shop.address
                      )}
                    </span>
                  </div>
                  
                  {shop.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.workingHours')}:</span>
                      <span className={styles.infoValue}>{shop.working_hours}</span>
                    </div>
                  )}
                  
                  {shop.phone && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('common.phone')}:</span>
                      <span className={styles.infoValue}>{shop.phone}</span>
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

export default ShopsAndMarketsGulripsh;
