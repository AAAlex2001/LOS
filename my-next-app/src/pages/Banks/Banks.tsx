'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './Banks.module.scss';
import config from '@/config';

type BankData = {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string;
  contacts: string;
  email: string;
  image_url: string;
  order: number;
};

type BanksPageData = {
  banks: BankData[];
};

const API_BASE = config.API_BASE;

const Banks: React.FC = () => {
  const [pageData, setPageData] = useState<BanksPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/banks/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load banks');
        const json = (await res.json()) as BanksPageData;
        setPageData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
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

  if (error || !pageData) {
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

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.titleSection}>
          <h1 className={styles.mainTitle}>Банки</h1>
        </section>

        {/* Карточки банков */}
        <section className={styles.cardsSection}>
          {(!pageData.banks || pageData.banks.length === 0) ? (
            <div className={styles.noData}>Нет данных о банках</div>
          ) : (
            pageData.banks.map((bank) => (
              <div key={bank.id} className={styles.buildingCard}>
                {/* Изображение (логотип банка) */}
                <div className={styles.imageContainer}>
                  <img src={`${API_BASE}/media/${bank.image_url}`} alt={bank.name} className={styles.buildingImage} />
                </div>

                {/* Информация */}
                <div className={styles.infoContainer}>
                  <h2 className={styles.buildingName}>
                    {bank.name_link ? (
                      <a href={bank.name_link} target="_blank" rel="noopener noreferrer">
                        {bank.name}
                      </a>
                    ) : (
                      bank.name
                    )}
                  </h2>
                  
                  <div className={styles.infoBlock}>
                    {bank.working_hours && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Режим работы:</span>
                        <span className={styles.infoValue}>{bank.working_hours}</span>
                      </div>
                    )}

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Контакты:</span>
                      <span className={styles.infoValue}>{bank.contacts}</span>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Почта:</span>
                      <a href={`mailto:${bank.email}`} className={`${styles.infoValue} ${styles.link}`}>{bank.email}</a>
                    </div>

                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Адрес:</span>
                      <span className={styles.infoValue}>{bank.address}</span>
                    </div>

                    {bank.name_link && (
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Сайт:</span>
                        <a href={bank.name_link} target="_blank" rel="noopener noreferrer" className={`${styles.infoValue} ${styles.link}`}>{bank.name_link}</a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Banks; 