'use client';
import React, { useRef, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './HistoryAndCulture.module.scss';
import config from '@/config';
import { useTranslations } from '@/i18n/LocaleContext';

type HistorySection = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

type CultureSection = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  order: number;
};

const API_BASE = config.API_BASE;

const TextBlock = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className={styles.textSection}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    <p>{children}</p>
  </section>
);

const ImageBlock = ({ src, alt }: { src: string; alt: string }) => (
    <div className={styles.imageContainer}>
        <img src={src} alt={alt} className={styles.image} />
    </div>
);


const HistoryAndCulture = () => {
  const historyRef = useRef<HTMLHeadingElement>(null);
  const cultureRef = useRef<HTMLHeadingElement>(null);

  const [historySections, setHistorySections] = useState<HistorySection[]>([]);
  const [cultureSections, setCultureSections] = useState<CultureSection[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('historyAndCulture');
  const tCommon = useTranslations('common');

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const historyRes = await fetch(`${API_BASE}/api/history-and-culture/history-sections/`, { cache: 'no-store' });
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          setHistorySections(historyData);
        }

        const cultureRes = await fetch(`${API_BASE}/api/history-and-culture/culture-sections/`, { cache: 'no-store' });
        if (cultureRes.ok) {
          const cultureData = await cultureRes.json();
          setCultureSections(cultureData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            {tCommon('loading')}
          </div>
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

        <nav className={styles.tabsContainer}>
            <button
              onClick={() => scrollToSection(historyRef)}
              className={styles.tabItem}
            >
              {t('historyTab')}
            </button>
            <button
              onClick={() => scrollToSection(cultureRef)}
              className={styles.tabItem}
            >
              {t('cultureTab')}
            </button>
        </nav>

        <h2 id="history" ref={historyRef} className={styles.contentTitle}>{t('historyTitle')}</h2>

        {historySections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            {t('noHistoryData')}
          </div>
        ) : (
          historySections.map((section) => (
            <div key={section.id}>
              {section.image_url && (
                <ImageBlock
                  src={`${API_BASE}/media/${section.image_url}`}
                  alt={section.title}
                />
              )}
              <TextBlock title={section.title}>
                {section.content}
              </TextBlock>
            </div>
          ))
        )}

        <h2 id="culture" ref={cultureRef} className={`${styles.contentTitle} ${styles.spacedTitle}`}>{t('cultureTitle')}</h2>

        {cultureSections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            {t('noCultureData')}
          </div>
        ) : (
          cultureSections.map((section) => (
            <div key={section.id}>
              {section.image_url && (
                <ImageBlock
                  src={`${API_BASE}/media/${section.image_url}`}
                  alt={section.title}
                />
              )}
              <TextBlock title={section.title}>
                {section.content}
              </TextBlock>
            </div>
          ))
        )}

      </main>
      <Footer />
    </div>
  );
};

export default HistoryAndCulture;
