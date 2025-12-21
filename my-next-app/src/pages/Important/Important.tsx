'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import ImportantPublicBehavior from './ImportantPublicBehavior';
import ImportantTaxiEtiquette from './ImportantTaxiEtiquette';
import styles from './Important.module.scss';
import tabStyles from './MainTabs.module.scss';
import config from '@/config';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

type ImportantRule = {
  id: number;
  rule_type?: string;
  title: string;
  description: string;
  order: number;
};

type ImportantImage = {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
  alt_text: string;
  order: number;
};

type ImportantSection = {
  id: number;
  section_type: string;
  title: string;
  subtitle: string;
  content: string;
  image_url: string;
  order: number;
  rules: ImportantRule[];
  images: ImportantImage[];
  // Поля для такси-этикета
  passenger_intro_text: string;
  passenger_background_url: string;
  passenger_conclusion_text: string;
  driver_intro_text: string;
  driver_background_url: string;
  driver_description_text: string;
  driver_conclusion_text: string;
};

type ImportantPage = {
  id: number;
  title: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  canonical_url: string;
  robots_index: boolean;
  robots_follow: boolean;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  sections: ImportantSection[];
};

const API_BASE = config.API_BASE;

const formatText = (text: string) => {
  if (!text) return '';
  
  // Простая замена всех переносов на <br />
  let formatted = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  return formatted;
};

const Important: React.FC = () => {
  const [data, setData] = useState<ImportantPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLocale();
  const t = useTranslations('important');
  const tCommon = useTranslations('common');

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/important/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load important page');
        const json = (await res.json()) as ImportantPage;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(tCommon('error'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale, tCommon]);

  const scrollToSection = (sectionId: string) => {
    const targetId = sectionId === 'public-behavior' ? 'public-behavior-text' : sectionId;
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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

  const sections = (data?.sections || []).slice().sort((a, b) => a.order - b.order);
  
  // Создаем табы из данных API
  const tabs = sections.map(section => ({
    id: section.section_type,
    name: section.title
  }));

  const renderSectionContent = (section: ImportantSection) => {
    switch (section.section_type) {
      case 'public-behavior':
        return <ImportantPublicBehavior section={section} />;
      case 'taxi-etiquette':
        return <ImportantTaxiEtiquette section={section} />;
      case 'emergency-phones':
        return (
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.subtitle && (
              <h3 className={styles.sectionSubtitle}>{section.subtitle}</h3>
            )}
            <div className={styles.sectionText}>
              {section.content && (
                <div dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
              )}
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionText}>
              {section.content && (
                <div dangerouslySetInnerHTML={{ __html: formatText(section.content) }} />
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <div className={styles.titleTextContainer}>
            <h1 className={styles.mainTitle}>{data?.title || t('title')}</h1>
          </div>
        </section>

        {error && <h2 className={styles.mainTitle}>{error}</h2>}

        <section className={tabStyles.mainTabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={tabStyles.tabItem}
              onClick={() => scrollToSection(tab.id)}
            >
              <div className={tabStyles.tabLabel}>
                <span>{tab.name}</span>
              </div>
            </div>
          ))}
        </section>

        {sections.map((section) => (
          <div key={section.id} id={section.section_type} className={styles.tabContent}>
            {renderSectionContent(section)}
          </div>
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Important; 