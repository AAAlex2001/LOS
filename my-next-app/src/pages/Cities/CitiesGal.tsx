"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGal.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type Category = { id: number; name: string; url: string; is_active: boolean; order: number };
type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number; categories?: Category[] };

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesGal: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Гал')}/`, { cache: 'no-store' });
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

  if (loading) {
    return (
      <div className={styles.galWrapper}>
        <main className={styles.galContent}>
          <h1 className={styles.galTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.galWrapper}>
        <main className={styles.galContent}>
          <h1 className={styles.galTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';
  const categories: Category[] = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);

  const handleItemClick = (category: Category) => {
    if (!category.is_active || !category.url) return;
    router.push(category.url);
  };

  return (
    <div className={styles.galWrapper}>
      <main className={styles.galContent}>
        <h1 className={styles.galTitle}>ГАЛ</h1>

        <section className={styles.galBanner}>
          <img
            src={bannerSrc}
            alt="Вид на город Гал"
            className={styles.galImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.galDescription}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.galParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.galListSection}>
          <ul className={styles.galList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.galListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.galArrow} />
                <span className={styles.galItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGal; 