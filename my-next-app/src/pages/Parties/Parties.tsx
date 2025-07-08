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
    const container = document.getElementById(cityId);
    if (!container) return;

    // Prefer the city heading inside the card (h2) to align view to text, not image
    const titleElement = container.querySelector('h2');
    const target = (titleElement as HTMLElement) || container;

    // Offset to account for fixed header height so title is not hidden
    const headerOffset = 80; // adjust if header height changes
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>Вечеринки и яркие впечатления</h1>

        {/* Banner with background image */}
        <div className={styles.fullWidthSection}>
          <div className={styles.backgroundImageSection}>
            {/* Neon party icon */}
            <div className={styles.centerIcon}>
              <div className={styles.centerIconWrapper}>
                <Image
                  src="/assets/parties1.png"
                  alt="Party icon"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            <div className={styles.introOverlay}>
              <div className={styles.introTextContainer}>
                <p className={styles.introText}>
                  <strong>Абхазия зажигает огни!</strong>
                </p>
                <p className={styles.introText}>
                  От атмосферных винодельческих вечеров с дегустациями местных вин до зажигательных пляжных вечеринок под открытым небом — здесь каждый найдёт свой идеальный вечер.
                </p>
                <p className={styles.introText}>
                  Готовы окунуться в атмосферу беззаботного отдыха? Выбирайте событие по настроению — и вперёд за впечатлениями!
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Images */}
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
        </div>

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
        <div id="suhum" className={styles.cityCardContainer}>
          <PartyCardSuhum />
        </div>
        
        <div id="gagra" className={styles.cityCardContainer}>
          <PartyCardGagra />
        </div>
        
        <div id="pitsunda" className={styles.cityCardContainer}>
          <PartyCardPitsunda />
        </div>
        
        <div id="gudauta" className={styles.cityCardContainer}>
          <PartyCardGudauta />
        </div>
        
        <div id="newafon" className={styles.cityCardContainer}>
          <PartyCardNewafon />
        </div>
        
        <div id="gulripsh" className={styles.cityCardContainer}>
          <PartyCardGulripsh />
        </div>
        
        <div id="ochamchira" className={styles.cityCardContainer}>
          <PartyCardOchamchira />
        </div>
        
        <div id="tkuarchal" className={styles.cityCardContainer}>
          <PartyCardTkuarchal />
        </div>
        
        <div id="gal" className={styles.cityCardContainer}>
          <PartyCardGal />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Parties; 