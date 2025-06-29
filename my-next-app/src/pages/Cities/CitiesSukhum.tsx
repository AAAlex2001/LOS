'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './CitiesSukhum.module.scss';

// Полное описание города – жирный текст согласно ТЗ
const description = `Столица Абхазии — Сухум, один из древнейших городов мира, расположен в широкой бухте, защищённой с северо-востока горными склонами. Это создаёт благоприятный климат, мягче, чем на остальном черноморском побережье. Город находится в центре республики, в 100 км от границы с Россией. Через него протекают реки Сухумка, Басла, а южную часть огибает Кяласур.

Сухум лежит в зоне влажных субтропиков: среднегодовая температура +15°C, морская вода летом прогревается до +30°C. Зима тёплая (+5°C в январе), лето жаркое и влажное (+25°C в июле). Город — культурный, административный и транспортный центр Абхазии, где сосредоточены государственные органы, Абхазский университет, музей, театры, филармония, Академия наук и учебные заведения. Здесь есть католический костёл, православная церковь, мечеть и лютеранская кирха, а также санатории, отели, рестораны и развлечения.

Архитектура Сухума, сформированная в XIX–XX веках, впечатляет: виллы, гостиницы и дома, построенные промышленниками и интеллигенцией, сохранили уникальный стиль. Просторные улицы, скверы и площади подчёркивают продуманную планировку. Однако в 90-е годы город пострадал от грузино-абхазского конфликта — некоторые здания до сих пор остаются разрушенными. Сейчас идёт активное восстановление: реставрируются памятники, строятся новые дома, ремонтируются дороги.

Популярное место для прогулок — Сухумская гора со смотровой площадкой, откуда открывается вид на набережную и центр. В городе работают краеведческий музей, драматический театр, картинная галерея, выставочный зал Союза художников и отреставрированная в 2009 году филармония. Из Сухума можно уехать на автобусе в Краснодар, Нальчик, Ростов-на-Дону, Черкесск, Сочи, а с 2004 года действует ж/д сообщение с Москвой. Рядом находится аэропорт «Бабушара», обслуживаемый «Абхазскими авиалиниями». Городской транспорт представлен автобусами и троллейбусами.`;

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

const CitiesSukhum: React.FC = () => {
  const router = useRouter();

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
      // Добавить другие категории по мере необходимости
      default:
        break;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>СУХУМ</h1>

        {/* Баннер с фоновым изображением */}
        <section className={styles.bannerSection}>
          <Image
            src="/assets/city_sukhum.jpg"
            alt="Вид на город Сухум"
            fill
            priority
            className={styles.bannerBackground}
          />
        </section>

        {/* Описание города */}
        <section className={styles.descriptionSection}>
          {description.split('\n\n').map((para, idx) => (
            <p key={idx} className={styles.descriptionParagraph}>
              <strong>{para}</strong>
            </p>
          ))}
        </section>

        {/* Список категорий */}
        <section className={styles.listSection}>
          <ul className={styles.list}>
            {highlightItems.map((item) => (
              <li 
                key={item} 
                className={`${styles.listItem} ${(item === 'Административные здания' || item === 'Аптеки' || item === 'Винодельни' || item === 'Заправки' || item === 'Культурные достопримечательности' || item === 'Мойки') ? styles.clickableItem : ''}`}
                onClick={() => handleItemClick(item)}
              >
                <span className={styles.arrowIcon} />
                <span className={styles.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default CitiesSukhum; 