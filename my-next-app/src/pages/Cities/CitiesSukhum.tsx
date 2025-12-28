'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesSukhum.module.scss';
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

const CitiesSukhum: React.FC = () => {
  const router = useRouter();
  const t = useTranslations();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const { locale } = useLocale();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl(`/api/cities/page/city_page/${encodeURIComponent('Сухум')}/`, locale);
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
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{t('common.loading')}</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{error || t('common.error')}</h1>
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
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{data?.title || t('cities.sukhumTitle')}</h1>

        <section className={styles.bannerSection}>
          <img
            src={bannerSrc}
            alt="Вид на город Сухум"
            className={styles.bannerBackground}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.descriptionSection}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.descriptionParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.listSection}>
          <ul className={styles.list}>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`${styles.listItem} ${cat.is_active ? styles.clickable : styles.disabled}`}
                onClick={() => handleItemClick(cat)}
              >
                <span className={styles.arrowIcon} />
                <span className={styles.itemText}>{cat.name}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesSukhum; 