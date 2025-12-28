"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './TransportCommunications.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

interface TransportBlock {
  id: number;
  title: string;
  location_link?: string;
  image_1?: string;
  image_2?: string;
  order: number;
}

interface TransportCommunicationsPageData {
  id: number;
  main_title: string;
  transport_blocks: TransportBlock[];
}

const API_BASE = config.API_BASE;

const TransportCommunications = () => {
  const { locale } = useLocale();
  const t = useTranslations();
  const [data, setData] = useState<TransportCommunicationsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/transport-communications/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load transport communications');
        const json = (await res.json()) as TransportCommunicationsPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError('error');
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
          <h1 className={styles.mainTitle}>{error ? t('transportCommunications.errorLoading') : t('transportCommunications.errorLoading')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const transportBlocks = (data.transport_blocks || []).slice().sort((a, b) => a.order - b.order);

  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>
          {data.main_title}
        </h1>

        {transportBlocks.map((block) => (
          <section key={block.id} className={styles.transportBlock}>
            {block.location_link ? (
              <h2 className={styles.blockTitle}>
                <a href={block.location_link} target="_blank" rel="noopener noreferrer" className={styles.titleLink}>
                  {block.title}
                </a>
              </h2>
            ) : (
              <h2 className={styles.blockTitle}>{block.title}</h2>
            )}
            <div className={styles.imagesContainer}>
              {block.image_1 && (
                <div className={styles.imageWrapper}>
                  <img
                    src={toImageUrl(block.image_1)}
                    alt={block.title}
                    className={styles.image}
                  />
                </div>
              )}
              {block.image_2 && (
                <div className={styles.imageWrapper}>
                  <img
                    src={toImageUrl(block.image_2)}
                    alt={block.title}
                    className={styles.image}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default TransportCommunications;