"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesTkuarchal.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};

const tkuarchalItems: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Заправки',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Мойки',
  'Отели',
  'Парковки',
  'Ремонт одежды и обуви',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const activeCategories: string[] = [
  'Административные здания',
  'Аптеки',
  'Винодельни',
  'Культурные достопримечательности',
  'Магазины и рынки',
  'Отели',
  'Рестораны',
  'Церкви',
];

const CitiesTkuarchal: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Ткуарчал')}/`, { cache: 'no-store' });
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
        router.push('/administrative-buildings/Tkuarchal');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Tkuarchal');
        break;
      case 'Винодельни':
        router.push('/wineries/Tkuarchal');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Tkuarchal');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Tkuarchal');
        break;
      case 'Отели':
        router.push('/hotels/Tkuarchal');
        break;
      case 'Рестораны':
        router.push('/restaurants/Tkuarchal');
        break;
      case 'Церкви':
        router.push('/churches/Tkuarchal');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={styles.tkuarchalWrapper}>
        <main className={styles.tkuarchalContent}>
          <h1 className={styles.tkuarchalTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.tkuarchalWrapper}>
        <main className={styles.tkuarchalContent}>
          <h1 className={styles.tkuarchalTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';

  return (
    <div className={styles.tkuarchalWrapper}>
      <main className={styles.tkuarchalContent}>
        <h1 className={styles.tkuarchalTitle}>{data?.title || 'ТКУАРЧАЛ'}</h1>

        <section className={styles.tkuarchalBanner}>
          <img
            src={bannerSrc}
            alt="Вид на город Ткуарчал"
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
            {tkuarchalItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.tkuarchalListItem} ${isClickable ? styles.clickable : styles.disabled}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.tkuarchalArrow} />
                  <span className={styles.tkuarchalItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesTkuarchal; 