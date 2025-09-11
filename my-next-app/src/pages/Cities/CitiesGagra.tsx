"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGagra.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};

const CitiesGagra: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Гагра')}/`, { cache: 'no-store' });
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

// Список категорий для Гагры
const gagraItems: string[] = [
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
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Парковки',
  'Пляжи',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

  if (loading) {
    return (
      <div className={styles.gagraWrapper}>
        <main className={styles.gagraContent}>
          <h1 className={styles.gagraTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.gagraWrapper}>
        <main className={styles.gagraContent}>
          <h1 className={styles.gagraTitle}>{error || 'Ошибка загрузки данных'}</h1>
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
        router.push('/administrative-buildings/Gagra');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Gagra');
        break;
      case 'Винодельни':
        router.push('/wineries/Gagra');
        break;
      case 'Заправки':
        router.push('/gas-stations/Gagra');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gagra');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gagra');
        break;
      case 'Мойки':
        router.push('/car-washes/Gagra');
        break;
      case 'Отели':
        router.push('/hotels/Gagra');
        break;
      case 'Парковки':
        router.push('/parking-lots/Gagra');
        break;
      case 'Пляжи':
        router.push('/beaches/Gagra');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gagra');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Gagra');
        break;
      case 'Церкви':
        router.push('/churches/Gagra');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.gagraWrapper}>
      <main className={styles.gagraContent}>
        <h1 className={styles.gagraTitle}>ГАГРА</h1>

        <section className={styles.gagraBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '/assets/city_gagra.jpg'}
            alt="Вид на город Гагра"
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
            {gagraItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.gagraListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.gagraArrow} />
                  <span className={styles.gagraItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGagra; 