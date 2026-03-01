"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesTkuarchal.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { useTranslations } from '@/i18n/TranslationsContext';
import { getApiUrl } from '@/utils/api';
import { saveScrollPosition } from '@/hooks/useScrollRestoration';

const API_BASE = config.API_BASE;

type Category = { id: number; name: string; url: string; is_active: boolean; order: number };
type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number; categories?: Category[] };

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesTkuarchal: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cityName = t('cities.tkuarchal');
        const url = getApiUrl(`/api/cities/page/city_page/${encodeURIComponent(cityName)}/`, locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          if (res.status === 404) {
            // Treat 404 as empty page: set minimal data so UI shows empty lists
            setData({ title: cityName });
            return;
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

  if (loading) {
    return (
      <div className={styles.tkuarchalWrapper}>
        <main className={styles.tkuarchalContent}>
          <h1 className={styles.tkuarchalTitle}>{t('common.loading')}</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.tkuarchalWrapper}>
        <main className={styles.tkuarchalContent}>
          <h1 className={styles.tkuarchalTitle}>{error || t('common.error')}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';
  const categories: Category[] = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);

  const handleItemClick = (category: Category) => {
    if (!category.is_active || !category.url) return;
    saveScrollPosition('tkuarchal');
    router.push(category.url);
  };

  return (
    <div id="city-tkuarchal" className={styles.tkuarchalWrapper}>
      <main className={styles.tkuarchalContent}>
        <h1 className={styles.tkuarchalTitle}>{data?.title || t('cities.tkuarchalTitle')}</h1>

        <section className={styles.tkuarchalBanner}>
          <img
            src={bannerSrc}
            alt={t('cities.viewCity')}
            className={styles.tkuarchalImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.tkuarchalDescription}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.tkuarchalParagraph}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.tkuarchalListSection}>
          <ul className={styles.tkuarchalList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.tkuarchalListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.tkuarchalArrow} />
                <span className={styles.tkuarchalItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesTkuarchal; 