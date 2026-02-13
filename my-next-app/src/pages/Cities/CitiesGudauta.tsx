"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGudauta.module.scss';
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

// списки и описания берутся из API

const CitiesGudauta: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const cityName = t('cities.gudauta');
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

  // обработчик ниже использует категории из API

  if (loading) {
    return (
      <div className={styles.gudautaWrapper}>
        <main className={styles.gudautaContent}>
          <h1 className={styles.gudautaTitle}>{t('common.loading')}</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.gudautaWrapper}>
        <main className={styles.gudautaContent}>
          <h1 className={styles.gudautaTitle}>{error || t('common.error')}</h1>
        </main>
      </div>
    );
  }

  const categories: Category[] = (data?.city?.categories || []).slice().sort((a, b) => a.order - b.order || a.id - b.id);
  const handleItemClick = (category: Category) => {
    if (!category.is_active || !category.url) return;
    router.push(category.url);
  };

  return (
    <div className={styles.gudautaWrapper}>
      <main className={styles.gudautaContent}>
        <h1 className={styles.gudautaTitle}>{data?.title || t('cities.gudautaTitle')}</h1>

        <section className={styles.gudautaBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : ''}
            alt={t('cities.viewCity')}
            className={styles.gudautaImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.gudautaDescription}>
          {(data?.city?.description || '').split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.gudautaParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.gudautaListSection}>
          <ul className={styles.gudautaList}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.gudautaListItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.gudautaArrow} />
                <span className={styles.gudautaItemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGudauta; 