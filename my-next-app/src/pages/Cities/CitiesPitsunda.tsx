"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesPitsunda.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};

const pitsundaItems: string[] = [
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
  'Пляжи',
  'Рестораны',
  'Салоны красоты',
  'Церкви',
];

const CitiesPitsunda: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Пицунда')}/`, { cache: 'no-store' });
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
        router.push('/administrative-buildings/Pitsunda');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Pitsunda');
        break;
      case 'Винодельни':
        router.push('/wineries/Pitsunda');
        break;
      case 'Заправки':
        router.push('/gas-stations/Pitsunda');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Pitsunda');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Pitsunda');
        break;
      case 'Мойки':
        router.push('/car-washes/Pitsunda');
        break;
      case 'Отели':
        router.push('/hotels/Pitsunda');
        break;
      case 'Пляжи':
        router.push('/beaches/Pitsunda');
        break;
      case 'Рестораны':
        router.push('/restaurants/Pitsunda');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Pitsunda');
        break;
      case 'Церкви':
        router.push('/churches/Pitsunda');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={styles.pitsundaWrapper}>
        <main className={styles.pitsundaContent}>
          <h1 className={styles.pitsundaTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pitsundaWrapper}>
        <main className={styles.pitsundaContent}>
          <h1 className={styles.pitsundaTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '';
  const description = data?.city?.description || '';

  return (
    <div className={styles.pitsundaWrapper}>
      <main className={styles.pitsundaContent}>
        <h1 className={styles.pitsundaTitle}>{data?.title || 'ПИЦУНДА'}</h1>

        <section className={styles.pitsundaBanner}>
          <img
            src={bannerSrc}
            alt="Вид на город Пицунда"
            className={styles.pitsundaImage}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className={styles.pitsundaDescription}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.pitsundaParagraph}>
              {para}
            </p>
          ))}
        </section>

        <section className={styles.pitsundaListSection}>
          <ul className={styles.pitsundaList}>
            {pitsundaItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.pitsundaListItem} ${isClickable ? styles.clickable : styles.disabled}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.pitsundaArrow} />
                  <span className={styles.pitsundaItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesPitsunda; 