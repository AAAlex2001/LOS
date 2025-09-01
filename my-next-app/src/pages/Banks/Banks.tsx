'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import styles from './Banks.module.scss';

// Типы данных
interface Bank {
  id: number;
  name: string;
  name_link: string;
  working_hours: string;
  address: string;
  address_link: string | null;
  contacts: string;
  email: string;
  image: string;
  order: number;
}

const Banks: React.FC = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        // Исправляем URL - используем /list/ для получения списка банков
        const response = await fetch('/api/cms/banks/list/');
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных');
        }
        const data = await response.json();
        setBanks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.loading}>Загрузка...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <div className={styles.error}>Ошибка: {error}</div>
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
          {banks.length === 0 ? (
            <div className={styles.noData}>Нет данных о банках</div>
          ) : (
            banks.map((bank) => (
              <div key={bank.id} className={styles.buildingCard}>
                {/* Изображение (логотип банка) */}
                <div className={styles.imageContainer}>
                  <img src={bank.image} alt={bank.name} className={styles.buildingImage} />
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