"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGal.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

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

// Список категорий для Гала
const galItems: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Парковки',
  'Пляжи',
  'Ремонт одежды и обуви',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const activeCategories: string[] = [
  'Магазины и рынки',
  'Рестораны',
  'Культурные достопримечательности',
  'Церкви',
  'Административные здания',
];

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

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }

    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Gal');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gal');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gal');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gal');
        break;
      case 'Церкви':
        router.push('/churches/Gal');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.galWrapper}>
      <main className={styles.galContent}>
        <h1 className={styles.galTitle}>ГАЛ</h1>

        <section className={styles.galBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '/assets/city_gal2.png'}
            alt="Вид на город Гал"
            className={styles.galImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.galDescription}>
          {(data?.city?.description || '').split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.galParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.galListSection}>
          <ul className={styles.galList}>
            {galItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.galListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.galArrow} />
                  <span className={styles.galItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGal; 