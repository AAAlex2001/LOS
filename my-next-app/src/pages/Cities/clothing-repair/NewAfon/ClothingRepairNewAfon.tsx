'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './ClothingRepairNewAfon.module.scss';
import config from '@/config';

type City = { id: number; name: string; title?: string; order: number };
type ClothingRepair = {
  id: number;
  city: number;
  name: string;
  name_link?: string;
  address: string;
  address_link?: string;
  working_hours?: string;
  contacts?: string;
  description?: string;
  services?: string;
  image_url: string;
  order: number;
};

type CityPageData = {
  title: string;
  city?: City;
  repairs: ClothingRepair[];
};

const API_BASE = config.API_BASE;

const ClothingRepairNewAfon: React.FC = () => {
  const [data, setData] = React.useState<CityPageData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/clothing-repair/page/city_page/${encodeURIComponent('Новый Афон')}/`, { cache: 'no-store' });
        
        if (!res.ok) {
          if (res.status === 404) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Страница не найдена');
          }
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const json = (await res.json()) as CityPageData;
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

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const repairs = data?.repairs || [];

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <div className={styles.buildingsWrapper}>
          {/* Заголовок */}
          <section className={styles.titleSection}>
            <h1 className={styles.mainTitle}>{data?.title || 'Новый Афон: ремонт одежды и обуви'}</h1>
          </section>

          {/* Карточки ремонта */}
          <section className={styles.cardsSection}>
          {repairs.map((repair) => (
            <div key={repair.id} className={styles.buildingCard}>
              {/* Изображение */}
              <div className={styles.imageContainer}>
                {repair.image_url && (
                  <img
                    src={`${API_BASE}/media/${repair.image_url}`}
                    alt={repair.name}
                    className={styles.buildingImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>

              {/* Информация */}
              <div className={styles.infoContainer}>
                <h2 className={styles.buildingName}>
                  {repair.name_link ? (
                    <a href={repair.name_link} target="_blank" rel="noopener noreferrer">
                      {repair.name}
                    </a>
                  ) : (
                    repair.name
                  )}
                </h2>
                
                <div className={styles.infoBlock}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Адрес:</span>
                    <span className={`${styles.infoValue} ${repair.address_link ? styles.addressLink : ''}`}>
                      {repair.address_link ? (
                        <a href={repair.address_link} target="_blank" rel="noopener noreferrer">{repair.address}</a>
                      ) : (
                        repair.address
                      )}
                    </span>
                  </div>
                  
                  {repair.working_hours && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Режим работы:</span>
                      <span className={styles.infoValue}>{repair.working_hours}</span>
                    </div>
                  )}
                  
                  {repair.contacts && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{repair.contacts}</span>
                    </div>
                  )}
                  
                  {repair.description && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Описание:</span>
                      <span className={styles.infoValue}>{repair.description}</span>
                    </div>
                  )}
                  
                  {repair.services && (
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Услуги:</span>
                      <span className={styles.infoValue}>{repair.services}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          </section>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ClothingRepairNewAfon;

