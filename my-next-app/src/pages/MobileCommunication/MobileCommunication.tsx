"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './MobileCommunication.module.scss';
import config from '@/config';

interface ProviderCard {
  id: number;
  name: string;
  description?: string;
  website_url?: string;
  logo_image?: string;
  order: number;
}

interface MobileCommunicationPageData {
  id: number;
  main_title: string;
  intro_text: string;
  background_image?: string;
  mobile_section_title: string;
  internet_section_title: string;
  mobile_providers: ProviderCard[];
  internet_providers: ProviderCard[];
}

const API_BASE = config.API_BASE;

const MobileCommunication: React.FC = () => {
  const [data, setData] = useState<MobileCommunicationPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/mobile-communication/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load mobile communication page');
        const json = (await res.json()) as MobileCommunicationPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
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
          <h1 className={styles.mainTitle}>Загрузка...</h1>
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
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const mobileProviders = (data.mobile_providers || []).slice().sort((a, b) => a.order - b.order);
  const internetProviders = (data.internet_providers || []).slice().sort((a, b) => a.order - b.order);

  const backgroundImageUrl = data.background_image 
    ? (data.background_image.startsWith('http') ? data.background_image : `${API_BASE}${data.background_image}`)
    : '/assets/IMG_1932.jpg'; // fallback к старому изображению

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{data.main_title}</h1>
        
        <div className={styles.fullWidthSection}>
          <div 
            className={styles.backgroundImageSection}
            style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
          >
            <div className={styles.introOverlay}>
              <p className={styles.introText}>
                {data.intro_text}
              </p>
            </div>
          </div>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{data.mobile_section_title}</h2>
          <div className={styles.providersContainer}>
            {mobileProviders.map((provider) => (
              <article key={provider.id} className={styles.card}>
                {provider.logo_image && (
                  <img
                    className={styles.cardImg}
                    src={provider.logo_image.startsWith('http') ? provider.logo_image : `${API_BASE}${provider.logo_image}`}
                    alt={`${provider.name} logo`}
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardDescription}>{provider.description}</p>
                  {provider.website_url && (
                    <a
                      href={provider.website_url}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      САЙТ: {provider.website_url}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{data.internet_section_title}</h2>
          <div className={styles.providersContainer}>
            {internetProviders.map((provider) => (
              <article key={provider.id} className={styles.card}>
                {provider.logo_image && (
                  <img
                    className={styles.cardImg}
                    src={provider.logo_image.startsWith('http') ? provider.logo_image : `${API_BASE}${provider.logo_image}`}
                    alt={`${provider.name} logo`}
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardDescription}>{provider.description}</p>
                  {provider.website_url && (
                    <a
                      href={provider.website_url}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      САЙТ: {provider.website_url}
                    </a>
                  )}
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

export default MobileCommunication; 