'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './HotSprings.module.scss';
import config from '@/config';
import { useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';
import { useTranslations } from '@/i18n/TranslationsContext';
import KyndykCard from './KyndykCard';
import TskuaraCard from './TskuaraCard';
import BabusharaCard from './BabusharaCard';
import MarkheulCard from './MarkheulCard';
import GagraCard from './GagraCard';
import BesletkaCard from './BesletkaCard';
import TkuarchalCard from './TkuarchalCard';

type Spring = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  location_link?: string;
  order: number;
};

type SpringsPage = { springs: Spring[]; hero_text?: string; hero_background_url?: string };

const API_BASE = config.API_BASE;

const formatText = (text: string) => {
  if (!text) return [];
  
  // Простая замена всех переносов на <br />
  let formatted = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n/g, '<br />');
  
  // Заменяем **текст** на <strong>текст</strong>
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  return [formatted];
};

const HotSprings: React.FC = () => {
  const { locale } = useLocale();
  const t = useTranslations();
  const [data, setData] = useState<SpringsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/hot-springs/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load hot springs');
        const json = (await res.json()) as SpringsPage;
        setData(json);
      } catch (e) {
        console.error(e);
        setError(t('common.error'));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [locale]);

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{t('common.loading')}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const springs = (data?.springs || []).slice().sort((a, b) => a.order - b.order);

  const heroBgRaw = data?.hero_background_url || '';
  const heroBg = heroBgRaw ? (heroBgRaw.startsWith('http') ? heroBgRaw : `${API_BASE}${heroBgRaw}`) : '';
  const heroParagraphs = formatText(data?.hero_text || '');

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{t('hotSprings.title')}</h1>

        {heroParagraphs.length > 0 && (
          <div className={styles.fullWidthSection}>
            <div className={styles.backgroundImageSection} style={heroBg ? { backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
              <div className={styles.introOverlay}>
                <div className={styles.introText}>
                  {heroParagraphs.map((html, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hot Springs Cards Container */}
        <div className={styles.cardsContainer}>
          {error && <h2 className={styles.mainTitle}>{error}</h2>}
          {springs.map((s) => (
            <div key={s.id}>
              {(() => {
                const props = { title: s.title, description: s.description, imageUrl: s.image_url ? `${API_BASE}/media/${s.image_url}` : undefined, locationLink: s.location_link };
                const t = (s.title || '').toLowerCase();
                if (t.includes('кныд') || t.includes('kындыг')) return <KyndykCard {...props} />;
                if (t.includes('цкуар') || t.includes('tsk')) return <TskuaraCard {...props} />;
                if (t.includes('бабуш')) return <BabusharaCard {...props} />;
                if (t.includes('мархеул')) return <MarkheulCard {...props} />;
                if (t.includes('гагр')) return <GagraCard {...props} />;
                if (t.includes('беслет')) return <BesletkaCard {...props} />;
                if (t.includes('ткуарч')) return <TkuarchalCard {...props} />;
                return <KyndykCard {...props} />;
              })()}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HotSprings; 