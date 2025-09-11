"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './CitiesGudauta.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

type City = { id: number; name: string; title?: string; description?: string; image_url?: string; order: number };

type CitiesPageData = {
  title: string;
  city?: City;
};

// Полное описание города Гудаута
const gudautaDescription = `Гудаута — уютный город на черноморском побережье Абхазии, расположенный в 37 км от Сухума и 43 км от Гагры. Он раскинулся у подножия Кавказских гор, в окружении субтропической зелени, что создаёт мягкий и комфортный климат. Зима здесь тёплая, с январской температурой около +6°C, а лето жаркое и влажное, с июльскими показателями около +26°C. Морская вода летом прогревается до +27°C, привлекая любителей пляжного отдыха.

Гудаута известна своей историей, уходящей корнями в древность. На её территории сохранились следы средневековых укреплений, а в окрестностях находятся руины крепости Абахваца, датируемой X–XII веками. Город также стал важным центром во время Отечественной войны народа Абхазии 1992-1993 годов: здесь располагалось законное правительство Абхазии, и Гудаута избежала серьёзных разрушений, став временной административной базой республики. Сегодня это спокойный курортный город, сохранивший свой исторический облик.

Природа вокруг Гудауты впечатляет: песчано-галечные пляжи, чистое море и горные пейзажи. Рядом протекает река Хыпста, а в окрестностях можно посетить карстовые пещеры и водопады. Гудаута славится своими мандариновыми и виноградными садами, а местные рынки изобилуют свежими фруктами и домашним вином. В городе есть небольшие пансионаты, гостевые дома и кафе, где подают традиционные абхазские блюда, такие как мамалыга и ачаш.

Одно из любимых мест для прогулок — центральная набережная, окружённая эвкалиптовыми деревьями, с видом на море и закаты. В Гудауте действует краеведческий музей, где можно узнать о местной истории и культуре, а в центре города сохранился памятник героям войны. Неподалёку находится село Лыхны с древним храмом Успения Пресвятой Богородицы X века, популярное среди туристов.

Из Гудауты можно доехать до Сухума, Гагры или Нового Афона на автобусе или маршрутке. Город связан с Россией через Сочи, куда ходят регулярные рейсы, а ближайший аэропорт — Международный аэропорт Сухум имени В.Г. Ардзинба. Внутри Гудауты передвигаться удобно пешком или на такси, так как город небольшой и компактный.`;

// Список ключевых преимуществ/категорий для блока с иконкой-стрелкой
const gudautaItems: string[] = [
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

const CitiesGudauta: React.FC = () => {
  const router = useRouter();
  const [data, setData] = React.useState<CitiesPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/cities/page/city_page/${encodeURIComponent('Гудаута')}/`, { cache: 'no-store' });
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
        router.push('/administrative-buildings/Gudauta');
        break;
      case 'Аптеки':
        router.push('/pharmacy/Gudauta');
        break;
      case 'Винодельни':
        router.push('/wineries/Gudauta');
        break;
      case 'Заправки':
        router.push('/gas-stations/Gudauta');
        break;
      case 'Культурные достопримечательности':
        router.push('/cultural-attractions/Gudauta');
        break;
      case 'Магазины и рынки':
        router.push('/shops-and-markets/Gudauta');
        break;
      case 'Мойки':
        router.push('/car-washes/Gudauta');
        break;
      case 'Отели':
        router.push('/hotels/Gudauta');
        break;
      case 'Пляжи':
        router.push('/beaches/Gudauta');
        break;
      case 'Рестораны':
        router.push('/restaurants/Gudauta');
        break;
      case 'Салоны красоты':
        router.push('/beauty-salons/Gudauta');
        break;
      case 'Церкви':
        router.push('/churches/Gudauta');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className={styles.gudautaWrapper}>
        <main className={styles.gudautaContent}>
          <h1 className={styles.gudautaTitle}>Загрузка...</h1>
        </main>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.gudautaWrapper}>
        <main className={styles.gudautaContent}>
          <h1 className={styles.gudautaTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.gudautaWrapper}>
      <main className={styles.gudautaContent}>
        <h1 className={styles.gudautaTitle}>{data?.title || 'ГУДАУТА'}</h1>

        <section className={styles.gudautaBanner}>
          <img
            src={data?.city?.image_url ? `${API_BASE}/media/${data.city.image_url}` : ''}
            alt="Вид на город Гудаута"
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
            {gudautaItems.map((item) => {
              const isClickable = activeCategories.includes(item);
              return (
                <li
                  key={item}
                  className={`${styles.gudautaListItem} ${
                    isClickable ? styles.clickable : styles.disabled
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className={styles.gudautaArrow} />
                  <span className={styles.gudautaItemText}>{item}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesGudauta; 