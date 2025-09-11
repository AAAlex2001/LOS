"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesNewafon.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type CategoryData = {
  name: string;
  url: string;
  active: boolean;
};

type City = { 
  id: number; 
  name: string; 
  title?: string; 
  description?: string; 
  image_url?: string; 
  order: number;
  categories: CategoryData[];
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

  const handleItemClick = (category: CategoryData) => {
    if (category.active) {
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
          <h1 className={styles.pageTitle}>НОВЫЙ АФОН</h1>
          
          <section className={styles.bannerSection}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}>
              Изображение города
            </div>
          </section>

          <section className={styles.descriptionSection}>
            <p className={styles.newafonParagraph}>
              {error || 'Описание города загружается...'}
            </p>
          </section>

          <section className={styles.newafonListSection}>
            <ul className={styles.newafonList}>
              <li className={`${styles.newafonListItem} ${styles.disabled}`}>
                <span className={styles.arrowIcon} />
                <span className={styles.itemText}>Загрузка категорий...</span>
              </li>
            </ul>
          </section>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{data?.title || 'НОВЫЙ АФОН'}</h1>

        {/* Баннер с фоновым изображением */}
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

        {/* Описание города */}
        <section className={styles.descriptionSection}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.newafonParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.newafonListSection}>
          <ul className={styles.newafonList}>
            {data?.city?.categories?.map((category) => (
              <li
                key={category.name}
                className={`${styles.newafonListItem} ${category.active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(category)}
              >
                <span className={styles.arrowIcon} />
                <span className={styles.itemText}>{category.name}</span>
              </li>
            )) || []}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesNewafon;