"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesOchamchira.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};

const ochamchiraItems: string[] = [
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
  'Заправки',
  'Отели',
  'Рестораны',
  'Салоны красоты',
  'Магазины и рынки',
  'Церкви',
];

const CitiesOchamchira: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Очамчыра')}/`, { cache: 'no-store' });
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

  const handleItemClick = (item: string) => {
    if (!activeCategories.includes(item)) {
      return;
    }
    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Ochamchira');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Ochamchira');
        break;
      case 'Пляжи':
        router.push('/beaches/Ochamchira');
        break;
      case 'Мойки':
        router.push('/car-washes/Ochamchira');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Ochamchira');
        break;
      case 'Заправки':
        router.push('/gas-stations/Ochamchira');
        break;
      case 'Отели':
        router.push('/hotels/Ochamchira');
        break;
      case 'Рестораны':
        router.push('/restaurants/Ochamchira');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Ochamchira');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Ochamchira');
        break;
      case 'Церкви':
        router.push('/churches/Ochamchira');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={styles.ochamchiraWrapper}>
        <main className={styles.ochamchiraContent}>
          <h1 className={styles.ochamchiraTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.ochamchiraWrapper}>
        <main className={styles.ochamchiraContent}>
          <h1 className={styles.ochamchiraTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '/assets/city_ochamchira.jpg';
  const description = data?.city?.description || '';

  return (
    <div className={styles.ochamchiraWrapper}>
      <main className={styles.ochamchiraContent}>
        <h1 className={styles.ochamchiraTitle}>{data?.title || 'ОЧАМЧЫРА'}</h1>

        <section className={styles.ochamchiraBanner}>
          <img
            src={bannerSrc}
            alt="Вид на город Очамчыра"
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
            {ochamchiraItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.ochamchiraListItem} ${isClickable ? styles.clickable : styles.disabled}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.ochamchiraArrow} />
                  <span className={styles.ochamchiraItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesOchamchira; 