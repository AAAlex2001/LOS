"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesNewafon.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type Category = { id: number; name: string; url: string; is_active: boolean; order: number };

type City = { 
  id: number; 
  name: string; 
  title?: string; 
  description?: string; 
  image_url?: string; 
  order: number;
  categories?: Category[];
};

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesNewafon: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Новый Афон')}/`, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Страница не найдена');
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const json = (await res.json()) as CitiesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : 'Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleItemClick = (category: Category) => {
    if (category.is_active) {
      router.push(category.url);
    }
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';
  const categories = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{data?.title || 'НОВЫЙ АФОН'}</h1>

        <section className={styles.bannerSection}>
          {bannerSrc && (
            <img
              src={bannerSrc}
              alt={`Вид на город ${data?.city?.name || 'Новый Афон'}`}
              className={styles.bannerBackground}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </section>

        <section className={styles.descriptionSection}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.newafonParagraph}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.newafonListSection}>
          <ul className={styles.newafonList}>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${styles.newafonListItem} ${category.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(category)}
              >
                <span className={styles.arrowIcon} />
                <span className={styles.itemText}>{category.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesNewafon;