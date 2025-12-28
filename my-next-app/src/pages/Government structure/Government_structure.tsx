"use client";

import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Government_structure.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

type GovernmentBlock = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

type GovernmentPageData = {
  blocks: GovernmentBlock[];
};

const API_BASE = config.API_BASE;

const GovernmentStructure = () => {
  const { locale } = useLocale();
  const t = useTranslations();
  const [pageData, setPageData] = useState<GovernmentPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/government-structure/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load government structure');
        const json = (await res.json()) as GovernmentPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError(t('common.error'));
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

  if (error || !pageData) {
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

  const blocks = (pageData.blocks || []).slice().sort((a, b) => a.order - b.order);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{t('governmentStructure.title')}</h1>

        {blocks.map((b) => (
          <React.Fragment key={b.id}>
            {b.image_url ? (
              <div className={styles.imageContainer}>
                <img
                  src={`${API_BASE}/media/${b.image_url}`}
                  alt={b.title}
                  className={`${styles.image} ${
                    b.title.toLowerCase().includes('флаг') ? styles.flag :
                    b.title.toLowerCase().includes('герб') ? styles.coatOfArms :
                    styles.image
                  }`}
                />
              </div>
            ) : null}

            <section className={styles.textSection}>
              <h2 className={styles.sectionTitle}>{b.title}</h2>
              {b.content ? (
                b.content.split('\n\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : null}
            </section>
          </React.Fragment>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentStructure; 