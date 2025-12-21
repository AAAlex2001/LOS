'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './Banks.module.scss';
import config from '@/config';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

type BankData = {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  email: string;
  image_url: string;
  order: number;
};

type BanksPageData = {
  banks: BankData[];
};

const API_BASE = config.API_BASE;

const Banks: React.FC = () => {
  const { locale } = useLocale();
  const [pageData, setPageData] = useState<BanksPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('banks');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/banks/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load banks');
        const json = (await res.json()) as BanksPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError(tCommon('error'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>{t('title')}</h1>
        </section>

        <section className={styles.cardsSection}>
          {(!pageData.banks || pageData.banks.length === 0) ? (
            <div className={styles.noData}>{t('noData')}</div>
          ) : (
            pageData.banks.map((bank) => (
              <div key={bank.id} className={styles.buildingCard}>
                <div className={styles.imageContainer}>
                  <img src={`${API_BASE}/media/${bank.image_url}`} alt={bank.name} className={styles.buildingImage} />
                </div>

                <div className={styles.infoContainer}>
                  <h2 className={styles.buildingName}>
                    {bank.name_link ? (
                      <a href={bank.name_link} target="_blank" rel="noopener noreferrer">
                        {bank.name}
                      </a>
                    ) : (
                      bank.name
                    )}
                  </h2>

                  <div className={styles.infoBlock}>
                    {bank.working_hours && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>{t('workingHours')}</span>
                        <span className={styles.infoValue}>{bank.working_hours}</span>
                      </div>
                    )}

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('contacts')}</span>
                      <span className={styles.infoValue}>{bank.contacts}</span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('email')}</span>
                      <a href={`mailto:${bank.email}`} className={`${styles.infoValue} ${styles.link}`}>{bank.email}</a>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>{t('address')}</span>
                      {bank.address_link ? (
                        <a href={bank.address_link} target="_blank" rel="noopener noreferrer" className={`${styles.infoValue} ${styles.link}`}>{bank.address}</a>
                      ) : (
                        <span className={styles.infoValue}>{bank.address}</span>
                      )}
                    </div>

                    {bank.name_link && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>{t('website')}</span>
                        <a href={bank.name_link} target="_blank" rel="noopener noreferrer" className={`${styles.infoValue} ${styles.link}`}>{bank.name_link}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Banks;
