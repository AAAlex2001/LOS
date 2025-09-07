'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Taxi.module.scss';
import config from '@/config';

// Types that reflect CMS API
type TaxiService = {
  id: number;
  name: string;
  working_hours: string;
  phones: string[];
  site: string;
  image_url: string;
  order: number;
};

type TaxiPageData = {
  services: TaxiService[];
  intro_text: string;
  hero_image_url: string;
};

const API_BASE = config.API_BASE;

const Taxi: React.FC = () => {
  const [pageData, setPageData] = useState<TaxiPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/taxi/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load taxi');
        const json = (await res.json()) as TaxiPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { topRowServices, bottomRowServices } = useMemo(() => {
    const list = pageData?.services ?? [];
    return {
      topRowServices: list.slice(0, 3),
      bottomRowServices: list.slice(3),
    };
  }, [pageData]);

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

  if (error || !pageData) {
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
        <h1 className={styles.mainTitle}>Такси</h1>
        
        <div className={styles.fullWidthSection}>
          <div
            className={styles.backgroundImageSection}
            style={pageData.hero_image_url ? {
              backgroundImage: `url(${API_BASE}/media/${pageData.hero_image_url})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : undefined}
          >
            <div className={styles.introOverlay}>
              <p className={styles.introText} style={{ whiteSpace: 'pre-line' }}>
                {pageData.intro_text || 'Вводный текст не настроен'}
              </p>
            </div>
          </div>
        </div>

        <section className={styles.taxiContainer}>
          <div className={styles.row}>
            {topRowServices.map((taxi) => (
              <article key={taxi.id} className={styles.card}>
                {taxi.image_url && (
                  <img
                    className={styles.cardImg}
                    src={`${API_BASE}/media/${taxi.image_url}`}
                    alt="taxi service logo"
                    style={{ background: 'transparent' }}
                  />
                )}
                <div className={styles.cardBody}>
                  <a href={taxi.site} className={styles.cardTitle} target="_blank" rel="noopener noreferrer">
                    {taxi.name}
                  </a>
                  <p className={styles.workingHours}>Время работы: {taxi.working_hours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>Заказать такси:</p>
                    <div className={styles.phoneList}>
                      {taxi.phones.map((phone, index) => (
                        <p key={index} className={styles.phone}>{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottomRowServices.map((taxi) => (
              <article key={taxi.id} className={styles.card}>
                {taxi.image_url && (
                  <img
                    className={styles.cardImg}
                    src={`${API_BASE}/media/${taxi.image_url}`}
                    alt="taxi service logo"
                    style={{ background: 'transparent' }}
                  />
                )}
                <div className={styles.cardBody}>
                  <a href={taxi.site} className={styles.cardTitle} target="_blank" rel="noopener noreferrer">
                    {taxi.name}
                  </a>
                  <p className={styles.workingHours}>Время работы: {taxi.working_hours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>Заказать такси:</p>
                    <div className={styles.phoneList}>
                      {taxi.phones.map((phone, index) => (
                        <p key={index} className={styles.phone}>{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Taxi; 