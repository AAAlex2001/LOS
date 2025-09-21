"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './MountainRoutes.module.scss';
import config from '@/config';

interface RouteItem {
  id: number;
  title?: string;
  name?: string;
  image?: string;
  site_url?: string;
  phone?: string;
  order: number;
}

interface MountainRoutesPageData {
  id: number;
  main_title: string;
  section_title: string;
  routes: RouteItem[];
}

const API_BASE = config.API_BASE;

const MountainRoutes: React.FC = () => {
  const [data, setData] = useState<MountainRoutesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/mountain-routes/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load mountain routes');
        const json = (await res.json()) as MountainRoutesPageData;
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

  const routes = (data.routes || []).slice().sort((a, b) => a.order - b.order);
  const topRowServices = routes.slice(0, 3);
  const bottomRowServices = routes.slice(3);

  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{data.main_title}</h1>
        
        <section className={styles.routesContainer}>
          <div className={styles.row}>
            {topRowServices.map((route) => (
              <article
                key={route.id}
                className={styles.card}
              >
                {route.image && (
                  <img
                    className={styles.cardImg}
                    src={toImageUrl(route.image)}
                    alt={route.title || route.name || 'mountain route'}
                  />
                )}
                <div className={styles.cardBody}>
                  {route.title && <h3 className={styles.cardTitle}>{route.title}</h3>}
                  {route.name && <p className={styles.cardName}>{route.name}</p>}
                  {route.phone && !route.image && (
                    <p className={styles.cardPhone}>Тел.: {route.phone}</p>
                  )}
                  {route.phone && route.image && <p className={styles.phone}>Контакты: {route.phone}</p>}
                  {route.site_url && (
                    <a
                      href={route.site_url}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {'САЙТ: '}{route.site_url}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottomRowServices.map((route) => (
              <article
                key={route.id}
                className={styles.card}
              >
                {route.image && (
                  <img
                    className={styles.cardImg}
                    src={toImageUrl(route.image)}
                    alt={route.title || route.name || 'mountain route'}
                  />
                )}
                <div className={styles.cardBody}>
                  {route.title && <h3 className={styles.cardTitle}>{route.title}</h3>}
                  {route.name && <p className={styles.cardName}>{route.name}</p>}
                  {route.phone && !route.image && (
                    <p className={styles.cardPhone}>Тел.: {route.phone}</p>
                  )}
                  {route.phone && route.image && <p className={styles.phone}>Контакты: {route.phone}</p>}
                  {route.site_url && (
                    <a
                      href={route.site_url}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {'САЙТ: '}{route.site_url}
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

export default MountainRoutes; 