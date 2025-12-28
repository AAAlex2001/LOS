'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './PrivacyPolicy.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

const API_BASE = config.API_BASE;

interface AccessibilityAndTermsData {
  title: string;
  content: string;
}

const AccessibilityAndTerms: React.FC = () => {
  const { locale } = useLocale();
  const t = useTranslations();
  const [data, setData] = useState<AccessibilityAndTermsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = getApiUrl('/api/privacy-policy/accessibility-and-terms/page_content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading accessibility and terms:', e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [locale]);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.title}>{t('common.loading')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.title}>{t('common.error')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{data.title || t('accessibilityAndTerms.defaultTitle')}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }} />
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilityAndTerms; 