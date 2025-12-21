'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Taxi.module.scss';
import config from '@/config';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

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
  const { locale } = useLocale();
  const [pageData, setPageData] = useState<TaxiPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('taxi');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/taxi/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load taxi');
        const json = (await res.json()) as TaxiPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError(tCommon('error'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale, tCommon]);

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
          <h1 className={styles.mainTitle}>{tCommon('loading')}</h1>
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
          <h1 className={styles.mainTitle}>{error || tCommon('error')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{t('title')}</h1>

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
                {pageData.intro_text || t('introNotConfigured')}
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
                  <p className={styles.workingHours}>{t('workingHours')} {taxi.working_hours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>{t('orderTaxi')}</p>
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
                  <p className={styles.workingHours}>{t('workingHours')} {taxi.working_hours}</p>
                  <div className={styles.phoneSection}>
                    <p className={styles.orderLabel}>{t('orderTaxi')}</p>
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
