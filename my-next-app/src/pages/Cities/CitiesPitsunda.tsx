"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesPitsunda.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

const API_BASE = config.API_BASE;

type Category = { id: number; name: string; url: string; is_active: boolean; order: number };
type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number; categories?: Category[] };

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesPitsunda: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/cities/page/city_page/${encodeURIComponent('Пицунда')}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
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
  }, [locale]);

  if (loading) {
    return (
      <div className={styles.pitsundaWrapper}>
        <main className={styles.pitsundaContent}>
          <h1 className={styles.pitsundaTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pitsundaWrapper}>
        <main className={styles.pitsundaContent}>
          <h1 className={styles.pitsundaTitle}>{error || 'Ошибка загрузки данных'}</h1>
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
    <div className={styles.pitsundaWrapper}>
      <main className={styles.pitsundaContent}>
        <h1 className={styles.pitsundaTitle}>{data?.title || 'ПИЦУНДА'}</h1>

        <section className={styles.pitsundaBanner}>
          <img
            src={bannerSrc}
            alt="Вид на город Пицунда"
            className={styles.pitsundaImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.pitsundaDescription}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.pitsundaParagraph}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.pitsundaListSection}>
          <ul className={styles.pitsundaList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.pitsundaListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.pitsundaArrow} />
                <span className={styles.pitsundaItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesPitsunda; 