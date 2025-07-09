'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './HotSprings.module.scss';
import KyndykCard from './KyndykCard';
import TskuaraCard from './TskuaraCard';
import BabusharaCard from './BabusharaCard';
import MarkheulCard from './MarkheulCard';
import GagraCard from './GagraCard';
import BesletkaCard from './BesletkaCard';
import TkuarchalCard from './TkuarchalCard';

const HotSprings: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Горячие источники</h1>

        <div className={styles.fullWidthSection}>
          <div className={styles.backgroundImageSection}>
            <div className={styles.introOverlay}>
              <p className={styles.introText}>
                Абхазия – уникальная по своей красоте страна. В Абхазии и
                оздоровительные достопримечательности – природные сероводородные,
                радоновые и грязевые источники.
                <br />
                <br />
                Всего на территории региона насчитывается около 30 горячих ключей, и
                хорошая новость — горячие источники Абхазии действуют и зимой.
                Рассмотрим 7 самых популярных терм региона.
              </p>
            </div>
          </div>
        </div>

        {/* Hot Springs Cards Container */}
        <div className={styles.cardsContainer}>
          <KyndykCard />
          <TskuaraCard />
          <BabusharaCard />
          <MarkheulCard />
          <GagraCard />
          <BesletkaCard />
          <TkuarchalCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotSprings; 