'use client';

import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Parties.module.scss';
import tabStyles from './MainTabs.module.scss';

// Import city card components
import PartyCardSuhum from './PartyCardSuhum';
import PartyCardGagra from './PartyCardGagra';
import PartyCardPitsunda from './PartyCardPitsunda';
import PartyCardGudauta from './PartyCardGudauta';
import PartyCardNewafon from './PartyCardNewafon';
import PartyCardGulripsh from './PartyCardGulripsh';
import PartyCardOchamchira from './PartyCardOchamchira';
import PartyCardTkuarchal from './PartyCardTkuarchal';
import PartyCardGal from './PartyCardGal';

const Parties: React.FC = () => {
  // Scroll to city function
  const scrollToCity = (cityId: string) => {
    const element = document.getElementById(cityId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Вечеринки и яркие впечатления</h1>

        {/* Neon party icon */}
        <div className={styles.centerIcon}>
          <Image
            src="/assets/parties1.png"
            alt="Party icon"
            width={150}
            height={150}
          />
        </div>

        {/* Banner with background image */}
        <section className={styles.bannerSection}>
          <div className={styles.bannerContent}>
            <p className={styles.bannerText}>
              <strong>Абхазия зажигает огни!</strong>
              <br />
              От атмосферных винодельческих вечеров с дегустациями местных вин до зажигательных пляжных вечеринок под открытым небом — здесь каждый найдёт свой идеальный вечер.
              <br />
              <br />
              Готовы окунуться в атмосферу беззаботного отдыха? Выбирайте событие по настроению — и вперёд за впечатлениями!
            </p>
          </div>

          {/* Decorative Images */}
          <Image
            src="/assets/IMG_1932.jpg"
            alt="Banner"
            fill
            priority
            className={styles.bannerBackground}
          />
          <Image
            src="/assets/parties2.jpg"
            alt="Decor 1"
            width={160}
            height={160}
            className={styles.decorTopLeft}
          />
          <Image
            src="/assets/parties3.jpg"
            alt="Decor 3"
            width={160}
            height={160}
            className={styles.decorBottomLeft}
          />
          <Image
            src="/assets/parties4.jpg"
            alt="Decor 4"
            width={160}
            height={160}
            className={styles.decorBottomCenter}
          />
          <Image
            src="/assets/parties5.png"
            alt="Decor 5"
            width={160}
            height={160}
            className={styles.decorTopRight}
          />
          <Image
            src="/assets/parties6.jpg"
            alt="Decor 6"
            width={160}
            height={160}
            className={styles.decorBottomRight}
          />
        </section>

        {/* Main Tabs with Navigation */}
        <section className={tabStyles.mainTabs}>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('suhum')}>
            <div className={tabStyles.tabLabel}>Сухум</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('gagra')}>
            <div className={tabStyles.tabLabel}>Гагра</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('pitsunda')}>
            <div className={tabStyles.tabLabel}>Пицунда</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('gudauta')}>
            <div className={tabStyles.tabLabel}>Гудаута</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('newafon')}>
            <div className={`${tabStyles.tabLabel} ${tabStyles.tabLabelMultiline}`}>Новый Афон</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('gulripsh')}>
            <div className={tabStyles.tabLabel}>Гулрыпш</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('ochamchira')}>
            <div className={tabStyles.tabLabel}>Очамчыра</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('tkuarchal')}>
            <div className={tabStyles.tabLabel}>Ткуарчал</div>
          </div>
          <div className={tabStyles.tabItem} onClick={() => scrollToCity('gal')}>
            <div className={tabStyles.tabLabel}>Гал</div>
          </div>
        </section>

        {/* City Cards */}
        <div id="suhum">
          <PartyCardSuhum />
        </div>
        
        <div id="gagra">
          <PartyCardGagra />
        </div>
        
        <div id="pitsunda">
          <PartyCardPitsunda />
        </div>
        
        <div id="gudauta">
          <PartyCardGudauta />
        </div>
        
        <div id="newafon">
          <PartyCardNewafon />
        </div>
        
        <div id="gulripsh">
          <PartyCardGulripsh />
        </div>
        
        <div id="ochamchira">
          <PartyCardOchamchira />
        </div>
        
        <div id="tkuarchal">
          <PartyCardTkuarchal />
        </div>
        
        <div id="gal">
          <PartyCardGal />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Parties; 