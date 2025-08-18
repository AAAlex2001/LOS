"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import Popup from '@/components/Popup/Popup';
import AdSlider from '@/components/AdSlider/AdSlider';
import styles from './Home.module.scss';

type HomeData = {
  hero_text_primary: string;
  hero_text_secondary: string;
  tab_about_label: string;
  tab_activities_label: string;
  tab_booking_label: string;
  tab_essentials_label: string;
  cta_title: string;
  cta_hero_text: string;
  cta_card_title: string;
  cta_card_description: string;
  cta_button_label: string;
  cta_button_href: string;
  slider_items: { media_type: 'video' | 'image'; url: string; alt: string; order: number }[];
  cities: { image_url: string; title: string; description: string; order: number }[];
  activities: { image_url: string; title: string; href: string; order: number }[];
  action_buttons: { label: string; href: string; order: number }[];
  popup_items: { group: 'about' | 'activities' | 'booking' | 'essentials'; label: string; href: string; order: number }[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

const HomePage = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/home/`);
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const sliderItems = useMemo(() => (
    data?.slider_items?.map(i => ({ type: i.media_type, src: i.url })) || undefined
  ), [data]);

  const cities = useMemo(() => (
    data?.cities || []
  ), [data]);

  const activities = useMemo(() => (
    data?.activities || []
  ), [data]);

  const actionButtons = useMemo(() => (
    (data?.action_buttons || [])
  ), [data]);

  const popupData = useMemo(() => ({
    about: (data?.popup_items || []).filter(i => i.group === 'about').map(i => ({ label: i.label, href: i.href })),
    activities: (data?.popup_items || []).filter(i => i.group === 'activities').map(i => ({ label: i.label, href: i.href })),
    booking: (data?.popup_items || []).filter(i => i.group === 'booking').map(i => ({ label: i.label, href: i.href })),
    essentials: (data?.popup_items || []).filter(i => i.group === 'essentials').map(i => ({ label: i.label, href: i.href })),
  }), [data]);


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
                    {data?.tab_about_label || 'Об Абхазии'}
                    {activePopup === 'about' && <Popup items={popupData.about} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('activities')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    {data?.tab_activities_label || 'Чем заняться'}
                    {activePopup === 'activities' && <Popup items={popupData.activities} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('booking')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    {data?.tab_booking_label || 'Запланируйте поездку'}
                    {activePopup === 'booking' && <Popup items={popupData.booking} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('essentials')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    {data?.tab_essentials_label || 'Необходимо в поездке'}
                    {activePopup === 'essentials' && <Popup items={popupData.essentials} />}
                  </div>
                </div>
            </nav>
            <div className={styles.sliderContainer}>
              <AdSlider items={sliderItems} />
            </div>
            <div className={styles.fullWidthSection}>
                <div className={styles.backgroundImageSection} style={{ backgroundImage: (data as any)?.hero_bg_image_url ? `url(${(data as any).hero_bg_image_url})` : undefined }}>
                    <div className={styles.introOverlay}>
                        <p className={styles.introText}>
                          {(data?.hero_text_primary || `Пейзажи, которые захватывают дух, богатая история и вкусная еда, Абхазия не просто удивит — она покорит вас!\n\nГотовы к путешествию, которое останется в сердце навсегда?`).split('\n').map((line, idx) => (
                            <>
                              {idx > 0 && <><br/><br/></>}
                              {line}
                            </>
                          ))}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: Cities */}
        <section id="about" className={styles.citiesSection}>
            <h2 className={styles.sectionTitle}>{(data as any)?.cities_section_title || 'Незабываемые виды Абхазии'}</h2>
            <div className={styles.citiesGrid}>
                {cities.map((city) => (
                    <div key={city.title} className={styles.cityCard}>
                        <div className={styles.cityImage} style={{ backgroundImage: `url(${city.image_url})` }} />
                        <div className={styles.cityInfo}>
                            <h3>{city.title}</h3>
                            <p>{city.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 3: CTA */}
        <section id="booking" className={styles.ctaSection}>
            <h2 className={styles.sectionTitle}>{data?.cta_title || 'Отдых в Абхазии — с комфортом!'}</h2>
            <div className={styles.promoBannerWrapper}>
                {(data as any)?.cta_overlay_image_url && (
                  <Image src={(data as any).cta_overlay_image_url} alt="Overlay" width={326} height={326} className={styles.promoMandarin} unoptimized />
                )}
                <div className={styles.fullWidthSection}>
                    <div className={styles.promoBackgroundImageSection} style={{ backgroundImage: (data as any)?.cta_bg_image_url ? `url(${(data as any).cta_bg_image_url})` : undefined }}>
                        <div className={styles.introOverlay}>
                            <div className={styles.promoBannerText}>
                                {(data?.cta_hero_text || 'Вы уже вдохновились горными пейзажами, лазурным морем и гостеприимством Абхазии?\nПора забронировать уютное жильё через «Мандарин» — проверенный сервис аренды с лучшими вариантами!')
                                  .split('\n').map((line, idx) => (
                                    <p key={idx} className={styles.introText}>{line}</p>
                                  ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bookingCardWrapper}>
                <div className={styles.bookingCard}>
                     <div className={styles.bookingCardImage} style={{ backgroundImage: `url(${(data as any)?.cta_card_image_url || ''})`}}/>
                     <div className={styles.bookingCardInfo}>
                        <h3>{data?.cta_card_title || 'Частный сектор'}</h3>
                        <p>{data?.cta_card_description || 'Гостевые дома в горах или аутентичные домики с национальным колоритом'}</p>
                     </div>
                </div>
                {data?.cta_button_label ? (
                  <Link href={data?.cta_button_href || '#'} className={styles.bookingButton}>
                    {data?.cta_button_label}
                    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                ) : (
                  <button className={styles.bookingButton}>
                    Подобрать жильё
                    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                )}
                <p className={styles.bookingFinePrint}>Без&nbsp;комиссий · Поддержка 24/7 · Гарантия заселения</p>
             </div>
        </section>

        {/* Section 4: Activities */}
        <section id="activities" className={styles.activitiesSection}>
            <div className={styles.activitiesHeader}>
                <h2 className={styles.sectionTitle}>{(data as any)?.activities_section_title || 'Развлечения в Абхазии: создайте свой идеальный отдых!'}</h2>
                <div className={styles.fullWidthSection}>
                    <div className={styles.backgroundImageSection} style={{ backgroundImage: (data as any)?.activities_bg_image_url ? `url(${(data as any).activities_bg_image_url})` : undefined }}>
                        <div className={styles.introOverlay}>
                            <div className={styles.activitiesBannerText}>
                                {(data?.hero_text_secondary || 'Не просто отдых — эмоции, которые запомнятся навсегда.\n\nОт горных троп до шумных вечеринок — каждый день будет особенным!')
                                  .split('\n').map((line, idx) => (
                                    <p key={idx} className={styles.introText}>{line}</p>
                                  ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.activitiesGrid}>
                {activities.map((activity) => (
                    <Link key={activity.title} href={activity.href} className={styles.activityCard}>
                        <div className={styles.activityImage} style={{ backgroundImage: `url(${activity.image_url})` }} />
                        <div className={styles.activityInfo}>
                            <h3>{activity.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Section 5: Action Buttons */}
        <section id="essentials" className={styles.actionsSection}>
            <h2 className={styles.sectionTitle}>{(data as any)?.actions_section_title || 'Здесь собрано всё, что избавит вас от лишних переживаний в поездке'}</h2>
            <div className={styles.actionsGrid}>
                {actionButtons.map(({label, href}) => (
                    <Link key={label} href={href} className={styles.actionButton}>{label}</Link>
                ))}
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;