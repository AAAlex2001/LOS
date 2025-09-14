'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Excursions.module.scss';
import config from '@/config';

interface ExcursionCard {
  id: number;
  img?: string;
  contacts: string;
  site: string;
}

const API_BASE = config.API_BASE;

const splitRows = (items: ExcursionCard[]) => ({
  top: items.slice(0, 3),
  bottom: items.slice(3)
});

const Excursions: React.FC = () => {
  const [services, setServices] = useState<ExcursionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/excursions/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load excursions');
        const json = await res.json();
        const srv = (json?.services || []).map((s: any): ExcursionCard => ({
          id: s.id,
          img: s.image_url ? `${API_BASE}/media/${s.image_url}` : undefined,
          contacts: s.contacts,
          site: s.site,
        }));
        setServices(srv);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const { top, bottom } = splitRows(services);

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

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Экскурсии</h1>
        
        <section className={styles.excursionContainer}>
          <div className={styles.row}>
            {top.map((excursion) => (
              <article key={excursion.id} className={styles.card}>
                {excursion.img && (
                  <img
                    className={styles.cardImg}
                    src={excursion.img}
                    alt="excursion service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardContacts}>{excursion.contacts}</p>
                  <a
                    href={excursion.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {excursion.site}
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.row}>
            {bottom.map((excursion) => (
              <article key={excursion.id} className={styles.card}>
                {excursion.img && (
                  <img
                    className={styles.cardImg}
                    src={excursion.img}
                    alt="excursion service logo"
                  />
                )}
                <div className={styles.cardBody}>
                  <p className={styles.cardContacts}>{excursion.contacts}</p>
                  <a
                    href={excursion.site}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    САЙТ: {excursion.site}
                  </a>
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

export default Excursions; 