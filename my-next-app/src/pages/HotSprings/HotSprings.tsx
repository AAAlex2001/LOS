'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './HotSprings.module.scss';
import HotSpringsCard from './HotSpringsCard';
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

        {/* Banner with background image */}
        <section className={styles.bannerSection}>
          <div className={styles.bannerContent}>
            <div className={styles.bannerTextContainer}>
              <p className={styles.bannerText}>
                Абхазия – уникальная по своей красоте страна. В Абхазии и оздоровительные достопримечательности – природные сероводородные, радоновые и грязевые источники.
              </p>
              <p className={styles.bannerText}>
                Всего на территории региона насчитывается около 30 горячих ключей, и хорошая новость — горячие источники Абхазии действуют и зимой. Рассмотрим 7 самых популярных терм региона.
              </p>
            </div>
          </div>

          {/* Background Image */}
          <Image
            src="/assets/IMG_1932.jpg"
            alt="Hot Springs Banner"
            fill
            priority
            className={styles.bannerBackground}
          />
        </section>

        {/* Hot Springs Cards Container */}
        <div className={styles.cardsContainer}>
          <HotSpringsCard />
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