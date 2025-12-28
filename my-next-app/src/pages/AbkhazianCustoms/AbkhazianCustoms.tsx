'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './AbkhazianCustoms.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

type CustomSection = {
  id: number;
  title: string;
  text: string;
  order: number;
};

type CustomsPageData = {
  main_title: string;
  intro_text: string;
  hero_image_url: string;
  sections: CustomSection[];
};

const API_BASE = config.API_BASE;

// Компонент для секций с заголовком и текстом (для DRY кода)
const TextSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className={styles.textSection}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <p>{children}</p>
  </section>
);

const AbkhazianCustoms = () => {
  const { locale } = useLocale();  const t = useTranslations();  const [data, setData] = useState<CustomsPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = getApiUrl('/api/abkhazian-customs/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading customs data:', e);
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
          <h1 className={styles.mainTitle}>{t('common.loading')}</h1>
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
          <h1 className={styles.mainTitle}>{t('common.error')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  // Источник изображения (API возвращает путь без /media/)
  const heroImageSrc = data.hero_image_url
    ? `${API_BASE}/media/${data.hero_image_url}`
    : '';

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{data.main_title || 'Абхазские национальные обычаи'}</h1>
        
        <div className={styles.fullWidthSection}>
          <div className={styles.backgroundImageSection}>
            <div className={styles.introOverlay}>
              <div className={styles.introTextContainer}>
                {data.intro_text ? (
                  data.intro_text.split(/\r?\n\r?\n/).map((paragraph, index) => (
                    <p key={index} className={styles.introText}>
                      {paragraph.trim()}
                    </p>
                  ))
                ) : (
                  <p className={styles.introText}>{t('abkhazianCustoms.introNotConfigured')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Основное изображение */}
        {heroImageSrc && (
        <div className={styles.mainImage}>
            <img 
              src={heroImageSrc}
            alt="Абхазские традиции" 
            className={styles.image}
          />
        </div>
        )}
        
        {/* Контейнер для текстовых секций */}
        <div className={styles.textSectionsContainer}>
          {data.sections && data.sections.length > 0 ? (
            data.sections.map((section) => (
              <TextSection key={section.id} title={section.title}>
                {section.text}
          </TextSection>
            ))
          ) : (
            <div className={styles.noData}>{t('abkhazianCustoms.noData')}</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AbkhazianCustoms;
