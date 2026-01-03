"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGagra.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';

const API_BASE = config.API_BASE;

type Category = { id: number; name: string; url: string; is_active: boolean; order: number };
type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number; categories?: Category[] };

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesGagra: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cityName = t('cities.gagra');
        const url = getApiUrl(`/api/cities/page/city_page/${encodeURIComponent(cityName)}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            const errorData = await res.json();
            throw new Error(errorData.error || t('common.pageNotFound'));
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const json = (await res.json()) as CitiesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(e instanceof Error ? e.message : t('common.error'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale]);

const categories: Category[] = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);

  if (loading) {
    return (
      <div className={styles.gagraWrapper}>
        <main className={styles.gagraContent}>
          <h1 className={styles.gagraTitle}>{t('common.loading')}</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.gagraWrapper}>
        <main className={styles.gagraContent}>
          <h1 className={styles.gagraTitle}>{error || t('common.error')}</h1>
        </main>
      </div>
    );
  }

  const handleItemClick = (category: Category) => {
    if (!category.is_active) return;
    if (!category.url) return;
    router.push(category.url);
  };

  return (
    <div className={styles.gagraWrapper}>
      <main className={styles.gagraContent}>
        <h1 className={styles.gagraTitle}>{data?.title || t('cities.gagraTitle')}</h1>

        <section className={styles.gagraBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : ''}
            alt={t('cities.viewCity')}
            className={styles.gagraImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.gagraDescription}>
          {(data?.city?.description || '').split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.gagraParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.gagraListSection}>
          <ul className={styles.gagraList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.gagraListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.gagraArrow} />
                <span className={styles.gagraItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGagra; 