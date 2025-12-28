'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './AbkhazianCuizine.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';

type CuisineSection = {
  id: number;
  title: string;
  text: string;
  order: number;
};

type MainDish = {
  id: number;
  name: string;
  description: string;
  order: number;
};

type CuisinePageData = {
  main_title: string;
  hero_image_url: string;
  sections: CuisineSection[];
  main_dishes: MainDish[];
};

const API_BASE = config.API_BASE;

const AbkhazianCuizine = () => {
  const { locale } = useLocale();  const t = useTranslations();  const [data, setData] = useState<CuisinePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const url = getApiUrl('/api/abkhazian-cuisine/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading cuisine data:', e);
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
          <h1 className={styles.mainTitle}>Загрузка...</h1>
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

  // Источник изображения (как в HistoryAndCulture: API возвращает путь без /media/)
  const heroImageSrc = data.hero_image_url
    ? `${API_BASE}/media/${data.hero_image_url}`
    : '';

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{data.main_title || 'Абхазская кухня'}</h1>
        {heroImageSrc && (
          <div className={styles.heroImageContainer}>
            <img
              src={heroImageSrc}
              alt="Абхазская кухня"
              className={styles.heroImage}
            />
          </div>
        )}

        <article className={styles.textContent}>
          {data.sections.map((section) => (
            <section key={section.id} className={styles.textBlock}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}

          <section className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>{t('abkhazianCuisine.mainDishesTitle')}</h2>
            <div className={styles.mainDishesList}>
              {data.main_dishes && data.main_dishes.length > 0 ? (
                data.main_dishes.map((dish, idx) => (
                  <p key={dish.id}>
                    <strong>{dish.name}</strong> — {dish.description}
                    {idx < data.main_dishes.length - 1 ? ';' : '.'}
                  </p>
                ))
              ) : (
                <p>{t('abkhazianCuisine.noDishesData')}</p>
              )}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AbkhazianCuizine; 