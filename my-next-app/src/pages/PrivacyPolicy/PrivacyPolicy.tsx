'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './PrivacyPolicy.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

interface PrivacyPolicyData {
  title: string;
  content: string;
}

const PrivacyPolicy: React.FC = () => {
  const [data, setData] = useState<PrivacyPolicyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/privacy-policy/privacy-policy/page_content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Error loading privacy policy:', e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.title}>Ошибка загрузки данных</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{data.title || 'Политика конфиденциальности сайта'}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }} />
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 