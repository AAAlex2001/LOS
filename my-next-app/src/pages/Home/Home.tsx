"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Popup from '@/components/Popup/Popup';
import styles from './Home.module.scss';

const cities = [
  { img: '/assets/city_gagra.jpg', title: 'Гагра', desc: 'Жемчужина Абхазии с пальмовой набережной, замками и крепостями' },
  { img: '/assets/city_sukhum.jpg', title: 'Сухум', desc: 'Солнечная столица с Ботаническим садом и колониальными особняками' },
  { img: '/assets/city_gudauta.jpg', title: 'Гудаута', desc: 'Уютный городок с мандариновыми садами и чистейшими пляжами' },
  { img: '/assets/city_newafon.jpg', title: 'Новый Афон', desc: 'Духовный центр с древними пещерами и Несторовой горой' },
  { img: '/assets/city_pitsunda.jpg', title: 'Пицунда', desc: 'Царство реликтовых сосен и золотистых галечных пляжей' },
  { img: '/assets/city_ochamchira.jpg', title: 'Очамчыра', desc: 'Тихий приморский город с атмосферой старинного порта' },
  { img: '/assets/city_gal.png', title: 'Гал', desc: 'Край чайных плантаций, зелёных холмов и гостеприимных жителей' },
  { img: '/assets/city_gulripsh.jpg', title: 'Гулрыпш', desc: 'Горное селение с водопадами и панорамными видами' },
  { img: '/assets/city_tkuarchal.jpg', title: 'Ткуарчал', desc: 'Город шахтёров в окружении живописных горных хребтов' },
];

const activities = [
    { img: '/assets/activity_vecherinki.png', title: 'вечеринки' },
    { img: '/assets/activity_gornye_marshruty.jpg', title: 'горные маршруты' },
    { img: '/assets/activity_ekskursii.jpg', title: 'экскурсии' },
    { img: '/assets/activity_goryachie_istochniki.png', title: 'горячие источники' },
];

const actionButtons = ['Ваш доктор', 'Связь и интернет', 'Службы такси', 'Банки', 'Важно знать'];

const popupData = {
  about: [
    { label: 'Государственное устройство', href: '/government-structure' },
    { label: 'Транспортное сообщение', href: '/transport-communications' },
    { label: 'История и культура', href: '/history-and-culture' },
    { label: 'Абхазская кухня', href: '/abkhazian-cuizine' },
    { label: 'Абхазские обычаи', href: '#' },
    { label: 'Элементарный словарь', href: '#' }
  ],
  activities: [
    { label: 'Вечеринки и яркие впечатления', href: '#' },
    { label: 'Горные маршруты', href: '#' },
    { label: 'Экскурсии', href: '#' },
    { label: 'Горячие источники', href: '#' }
  ],
  booking: [
    { label: 'Города Абхазии', href: '#' },
    { label: 'Аренда жилья', href: '#' },
    { label: 'Связь', href: '#' },
    { label: 'Такси', href: '#' },
    { label: 'Банки', href: '#' }
  ],
  essentials: [
    { label: 'Ваш доктор', href: '#' },
    { label: 'Важно знать', href: '#' }
  ],
};

const HomePage = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>

        {/* Section 1: Main Tabs and Hero */}
        <section className={styles.heroSection}>
            <nav className={styles.tabsContainer}>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('about')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    Об Абхазии
                    {activePopup === 'about' && <Popup items={popupData.about} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('activities')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    Чем заняться
                    {activePopup === 'activities' && <Popup items={popupData.activities} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('booking')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    Запланируйте поездку
                    {activePopup === 'booking' && <Popup items={popupData.booking} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('essentials')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    Необходимо в поездке
                    {activePopup === 'essentials' && <Popup items={popupData.essentials} />}
                  </div>
                </div>
            </nav>
            <div className={styles.heroVideo}>
                <span>Видеоряд сменяющийся</span>
            </div>
            <div className={styles.fullWidthSection}>
                <div className={styles.backgroundImageSection}>
                    <div className={styles.introOverlay}>
                        <p className={styles.introText}>
                            Пейзажи, которые захватывают дух, богатая история и&nbsp;вкусная еда, Абхазия не&nbsp;просто удивит&nbsp;— она&nbsp;покорит&nbsp;вас!
                            <br /><br />
                            Готовы к&nbsp;путешествию, которое останется в&nbsp;сердце навсегда?
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: Cities */}
        <section id="about" className={styles.citiesSection}>
            <h2 className={styles.sectionTitle}>Незабываемые виды Абхазии</h2>
            <div className={styles.citiesGrid}>
                {cities.map((city) => (
                    <div key={city.title} className={styles.cityCard}>
                        <div className={styles.cityImage} style={{ backgroundImage: `url(${city.img})` }} />
                        <div className={styles.cityInfo}>
                            <h3>{city.title}</h3>
                            <p>{city.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 3: CTA */}
        <section id="booking" className={styles.ctaSection}>
            <h2 className={styles.sectionTitle}>Отдых в Абхазии — с комфортом!</h2>
            
            <div className={styles.promoBannerWrapper}>
                <Image src="/assets/Mand3.png" alt="Mandarin" width={326} height={326} className={styles.promoMandarin}/>
                <div className={styles.fullWidthSection}>
                    <div className={styles.promoBackgroundImageSection}>
                        <div className={styles.introOverlay}>
                            <div className={styles.promoBannerText}>
                                <p className={styles.introText}>Вы уже вдохновились горными пейзажами, лазурным морем и гостеприимством Абхазии?</p>
                                <p className={styles.introText}>Пора забронировать уютное жильё через <span className={styles.highlight}>«Мандарин»</span> — проверенный сервис аренды с лучшими вариантами!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bookingCardWrapper}>
                <div className={styles.bookingCard}>
                     <div className={styles.bookingCardImage} style={{ backgroundImage: `url(/assets/big_image.jpg)`}}/>
                     <div className={styles.bookingCardInfo}>
                        <h3>Частный сектор</h3>
                        <p>Гостевые дома в горах или аутентичные домики с национальным колоритом</p>
                     </div>
                </div>
                <button className={styles.bookingButton}>
                    Подобрать жильё
                    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <p className={styles.bookingFinePrint}>Без&nbsp;комиссий · Поддержка 24/7 · Гарантия заселения</p>
             </div>
        </section>

        {/* Section 4: Activities */}
        <section id="activities" className={styles.activitiesSection}>
            <div className={styles.activitiesHeader}>
                <h2 className={styles.sectionTitle}>Развлечения в Абхазии: создайте свой идеальный отдых!</h2>
                <div className={styles.fullWidthSection}>
                    <div className={styles.backgroundImageSection}>
                        <div className={styles.introOverlay}>
                            <div className={styles.activitiesBannerText}>
                                <p className={styles.introText}>Не просто отдых — эмоции, которые запомнятся навсегда.</p>
                                <p className={styles.introText}>От горных троп до шумных вечеринок — каждый день будет особенным!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.activitiesGrid}>
                {activities.map((activity) => (
                    <div key={activity.title} className={styles.activityCard}>
                        <div className={styles.activityImage} style={{ backgroundImage: `url(${activity.img})` }} />
                        <div className={styles.activityInfo}>
                            <h3>{activity.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 5: Action Buttons */}
        <section id="essentials" className={styles.actionsSection}>
            <h2 className={styles.sectionTitle}>Здесь собрано всё, что избавит вас от лишних переживаний в поездке</h2>
            <div className={styles.actionsGrid}>
                {actionButtons.map((label) => (
                    <button key={label} className={styles.actionButton}>{label}</button>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;