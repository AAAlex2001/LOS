'use client';

import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ScrollToTop from '@/components/ScrollToTop/ScrollToTop';
import ImportantPublicBehavior from './ImportantPublicBehavior';
import styles from './Important.module.scss';
import tabStyles from './MainTabs.module.scss';

const Important: React.FC = () => {
  const tabs = [
    { id: 'tourist-pharmacy', name: 'Туристическая аптечка' },
    { id: 'emergency-phones', name: 'Телефоны экстренной помощи' },
    { id: 'public-behavior', name: 'Правила поведения в общественных местах' },
    { id: 'taxi-etiquette', name: 'Такси-этикет' },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <section className={styles.titleSection}>
          <div className={styles.titleTextContainer}>
            <h1 className={styles.mainTitle}>Важно знать</h1>
          </div>
        </section>

        <section className={tabStyles.mainTabs}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={tabStyles.tabItem}
              onClick={() => scrollToSection(tab.id)}
            >
              <div className={tabStyles.tabLabel}>
                <span>{tab.name}</span>
              </div>
            </div>
          ))}
        </section>

        <div id="tourist-pharmacy" className={styles.tabContent}>
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Туристическая аптечка</h2>
            <div className={styles.sectionText}>
              <p>
                Перевязочный материал и антисептики:<br />
                Стерильный бинт для перевязки (большой и маленький), медицинский 
                пластырь (фиксирующий и бактерицидный), эластичный бинт для фиксации 
                при переломе и ушибе, вата, ватные диски и/или тампоны, жгут для остановки 
                кровотечения, перекись водорода, «Пантенол», йод, «Зелёнка», хлоргексилин, 
                «Мирамистин».
              </p>
              <div className={styles.spacer}></div>
              <p className={styles.medicineTitle}>
                НЕОБХОДИМЫЕ ЛЕКАРСТВЕННЫЕ ПРЕПАРАТЫ:
              </p>
              <p>
                — Нурафен (для детей и взрослых);<br />
                — Лоперамид<br />
                — Регидрон А/Б:<br />
                — Лотран:<br />
                — Энтеросгель.
              </p>
            </div>
          </div>
        </div>

        <div id="emergency-phones" className={styles.tabContent}>
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>Телефоны экстренной помощи</h2>
            <div className={styles.emergencyNotice}>
              Вызовы с местных операторов связи в экстренные службы бесплатны.
            </div>
            <div className={styles.emergencyPhones}>
              <p>Экстренные службы УЧС РА — 911, 112</p>
              <p>Пожарная охрана — 001, 010</p>
              <p>Милиция — 020</p>
              <p>Скорая помощь — 030</p>
              <p>Служба газа — 040</p>
            </div>
          </div>
        </div>

        <div id="public-behavior" className={styles.tabContent}>
          <ImportantPublicBehavior />
        </div>

        <div id="taxi-etiquette" className={styles.tabContent}>
          <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h2>Контент для раздела "Такси-этикет" будет здесь.</h2>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Important; 