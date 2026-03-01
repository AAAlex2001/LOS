"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesOchamchira.module.scss';
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

const CitiesOchamchira: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cityName = t('cities.ochamchira');
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
      <div className={styles.ochamchiraWrapper}>
        <main className={styles.ochamchiraContent}>
          <h1 className={styles.ochamchiraTitle}>{t('common.loading')}</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.ochamchiraWrapper}>
        <main className={styles.ochamchiraContent}>
          <h1 className={styles.ochamchiraTitle}>{error || t('common.error')}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';
  const categories: Category[] = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);

  const handleItemClick = (category: Category) => {
    if (!category.is_active || !category.url) return;
    saveScrollPosition('ochamchira');
    router.push(category.url);
  };

  return (
    <div id="city-ochamchira" className={styles.ochamchiraWrapper}>
      <main className={styles.ochamchiraContent}>
        <h1 className={styles.ochamchiraTitle}>{data?.title || t('cities.ochamchiraTitle')}</h1>

        <section className={styles.ochamchiraBanner}>
          <img
            src={bannerSrc}
            alt={t('cities.viewCity')}
            className={styles.ochamchiraImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.ochamchiraDescription}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.ochamchiraParagraph}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.ochamchiraListSection}>
          <ul className={styles.ochamchiraList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.ochamchiraListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.ochamchiraArrow} />
                <span className={styles.ochamchiraItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesOchamchira; 