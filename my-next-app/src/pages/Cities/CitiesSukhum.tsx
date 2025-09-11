'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesSukhum.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};


// Список ключевых преимуществ/категорий для блока с иконкой-стрелкой
const highlightItems: string[] = [
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

// Все категории для Сухума активны
const activeCategories: string[] = [...highlightItems];

const CitiesSukhum: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Сухум')}/`, { cache: 'no-store' });
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
    switch (item) {
      case 'Административные здания':
        router.push('/administrative-buildings/Sukhum');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Sukhum');
        break;
      case 'Винодельни':
        router.push('/wineries/Sukhum');
        break;
      case 'Заправки':
        router.push('/gas-stations/Sukhum');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Sukhum');
        break;
      case 'Мойки':
        router.push('/car-washes/Sukhum');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Sukhum');
        break;
      case 'Отели':
        router.push('/hotels/Sukhum');
        break;
      case 'Парковки':
        router.push('/parking-lots/Sukhum');
        break;
      case 'Пляжи':
        router.push('/beaches/Sukhum');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Sukhum');
        break;
      case 'Церкви':
        router.push('/churches/Sukhum');
        break;
      case 'Рестораны':
        router.push('/restaurants/Sukhum');
        break;
      case 'Ремонт одежды и обуви':
        router.push('/clothing-repair/Sukhum');
        break;
      // Добавить другие категории по мере необходимости
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          <h1 className={styles.pageTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  const bannerSrc = data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : '/assets/city_sukhum.jpg';
  const description = data?.city?.description || '';

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>{data?.title || 'СУХУМ'}</h1>

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
            {highlightItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.listItem} ${isClickable ? styles.clickable : styles.disabled}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.arrowIcon} />
                  <span className={styles.itemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesSukhum; 