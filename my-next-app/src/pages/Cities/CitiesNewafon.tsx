"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesNewafon.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

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

// Список категорий для Нового Афона
const newafonItems: string[] = [
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
  'Административные здания',
  'Аптеки',
  'Пляжи',
  'Мойки',
  'Культурные достопримечательности',
  'Отели',
  'Парковки',
  'Рестораны',
  'Салоны красоты',
  'Магазины и рынки',
  'Церкви',
];

  if (loading) {
    return (
      <div className={styles.newafonWrapper}>
        <main className={styles.newafonContent}>
          <h1 className={styles.newafonTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.newafonWrapper}>
        <main className={styles.newafonContent}>
          <h1 className={styles.newafonTitle}>{error || 'Ошибка загрузки данных'}</h1>
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
        router.push('/administrative-buildings/NewAfon');
        break;
      case 'Аптеки':
        router.push('/pharmacy/NewAfon');
        break;
      case 'Пляжи':
        router.push('/beaches/NewAfon');
        break;
      case 'Мойки':
        router.push('/car-washes/NewAfon');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/NewAfon');
        break;
      case 'Отели':
        router.push('/hotels/NewAfon');
        break;
      case 'Парковки':
        router.push('/parking-lots/NewAfon');
        break;
      case 'Рестораны':
        router.push('/restaurants/NewAfon');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/NewAfon');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/NewAfon');
        break;
      case 'Церкви':
        router.push('/churches/NewAfon');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.newafonWrapper}>
      <main className={styles.newafonContent}>
        <h1 className={styles.newafonTitle}>{data?.title || 'НОВЫЙ АФОН'}</h1>

        <section className={styles.newafonBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '/assets/city_newafon.jpg'}
            alt="Вид на город Новый Афон"
            className={styles.newafonImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.newafonDescription}>
          {(data?.city?.description || '').split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.newafonParagraph}>
              {para}
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.newafonListSection}>
          <ul className={styles.newafonList}>
            {newafonItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.newafonListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.newafonArrow} />
                  <span className={styles.newafonItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesNewafon; 