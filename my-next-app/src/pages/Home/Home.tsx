"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import Popup from '@/components/Popup/Popup';
import AdSlider from '@/components/AdSlider/AdSlider';
import styles from './Home.module.scss';
import config from '@/config';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

type HomeData = {
  hero_text_primary: string;
  hero_text_secondary: string;
  hero_bg_image_url?: string;
  tab_about_label: string;
  tab_activities_label: string;
  tab_booking_label: string;
  tab_essentials_label: string;
  cities_section_title?: string;
  activities_section_title?: string;
  actions_section_title?: string;
  cta_title?: string;
  cta_hero_text?: string;
  cta_bg_image_url?: string;
  cta_overlay_image_url?: string;
  cta_card_title?: string;
  cta_card_description?: string;
  cta_button_label?: string;
  cta_button_href?: string;
  cta_card_image_url?: string;
  activities_bg_image_url?: string;
  slider_items: { media_type: 'video' | 'image'; url: string; alt: string; order: number }[];
  cities: { image_url: string; title: string; description: string; order: number }[];
  activities: { image_url: string; title: string; href: string; order: number }[];
  action_buttons: { label: string; href: string; order: number }[];
  popup_items: { group: 'about' | 'activities' | 'booking' | 'essentials'; label: string; href: string; order: number }[];
  tabs?: { group: 'about' | 'activities' | 'booking' | 'essentials'; label: string; href?: string; order: number }[];
};

const API_BASE = (config.API_BASE || '').replace(/\/+$/, '');
const toMedia = (p?: string) => (p ? `${API_BASE}/media/${p}` : '');

const HomePage = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [data, setData] = useState<HomeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const t = useTranslations('home');
  const tCommon = useTranslations('common');

  const { locale } = useLocale();

  useEffect(() => {
    const load = async () => {
      try {
        const url = getApiUrl('/api/home/page/content/', locale);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load homepage');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
        setError(tCommon('error'));
      }
    };
    load();
  }, [locale, tCommon]);

  const sliderItems = data?.slider_items?.map(i => ({ type: i.media_type, src: toMedia(i.url) })) || [];
  const cities = data?.cities || [];
  const activities = data?.activities || [];
  const actionButtons = data?.action_buttons || [];

  const tabsByGroup = (() => {
    const tabs = data?.tabs || [];
    return {
      about: tabs.filter(t => t.group === 'about').sort((a,b)=>a.order-b.order),
      activities: tabs.filter(t => t.group === 'activities').sort((a,b)=>a.order-b.order),
      booking: tabs.filter(t => t.group === 'booking').sort((a,b)=>a.order-b.order),
      essentials: tabs.filter(t => t.group === 'essentials').sort((a,b)=>a.order-b.order),
    };
  })();

  const popupData = {
    about: (data?.popup_items || []).filter(i => i.group === 'about').map(i => ({ label: i.label, href: i.href })),
    activities: (data?.popup_items || []).filter(i => i.group === 'activities').map(i => ({ label: i.label, href: i.href })),
    booking: (data?.popup_items || []).filter(i => i.group === 'booking').map(i => ({ label: i.label, href: i.href })),
    essentials: (data?.popup_items || []).filter(i => i.group === 'essentials').map(i => ({ label: i.label, href: i.href })),
  };

  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (!data) return null; // не рендерим до загрузки

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
                    <Link href={tabsByGroup.about[0]?.href || '#'}>
                      {tabsByGroup.about[0]?.label}
                    </Link>
                    {activePopup === 'about' && <Popup items={popupData.about} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('activities')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    <Link href={tabsByGroup.activities[0]?.href || '#'}>
                      {tabsByGroup.activities[0]?.label}
                    </Link>
                    {activePopup === 'activities' && <Popup items={popupData.activities} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('booking')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    <Link href={tabsByGroup.booking[0]?.href || '#'}>
                      {tabsByGroup.booking[0]?.label}
                    </Link>
                    {activePopup === 'booking' && <Popup items={popupData.booking} />}
                  </div>
                </div>
                <div 
                  className={styles.tabItemWrapper}
                  onMouseEnter={() => setActivePopup('essentials')}
                  onMouseLeave={() => setActivePopup(null)}
                >
                  <div className={styles.tabItem}>
                    <Link href={tabsByGroup.essentials[0]?.href || '#'}>
                      {tabsByGroup.essentials[0]?.label}
                    </Link>
                    {activePopup === 'essentials' && <Popup items={popupData.essentials} />}
                  </div>
                </div>
            </nav>
            {!!sliderItems.length && (
            <div className={styles.sliderContainer}>
                <AdSlider items={sliderItems} />
            </div>
            )}
            <div className={styles.fullWidthSection}>
                <div className={styles.backgroundImageSection} style={{ backgroundImage: data.hero_bg_image_url ? `url(${toMedia(data.hero_bg_image_url)})` : undefined }}>
                    <div className={styles.introOverlay}>
                        <p className={styles.introText}>
                          {data.hero_text_primary.split('\n').map((line, idx) => (
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
            {data.cities_section_title && <h2 className={styles.sectionTitle}>{data.cities_section_title}</h2>}
            <div className={styles.citiesGrid}>
                {cities.map((city) => (
                    <div key={city.title} className={styles.cityCard}>
                        <div className={styles.cityImage} style={{ backgroundImage: `url(${toMedia(city.image_url)})` }} />
                        <div className={styles.cityInfo}>
                            <h3>{city.title}</h3>
                            <p>{city.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 3: CTA */}
        {/* <section id="booking" className={styles.ctaSection}>
            {data.cta_title && <h2 className={styles.sectionTitle}>{data.cta_title}</h2>}
            <div className={styles.promoBannerWrapper}>
                {data.cta_overlay_image_url && (
                  <Image src={toMedia(data.cta_overlay_image_url)} alt="Overlay" width={326} height={326} className={styles.promoMandarin} unoptimized />
                )}
                <div className={styles.fullWidthSection}>
                    <div className={styles.promoBackgroundImageSection} style={{ backgroundImage: data.cta_bg_image_url ? `url(${toMedia(data.cta_bg_image_url)})` : undefined }}>
                        <div className={styles.introOverlay}>
                            <div className={styles.promoBannerText}>
                                {data.cta_hero_text?.split('\n').map((line, idx) => (
                                  <p key={idx} className={styles.introText}>{line}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bookingCardWrapper}>
                <div className={styles.bookingCard}>
                     <div className={styles.bookingCardImage} style={{ backgroundImage: data.cta_card_image_url ? `url(${toMedia(data.cta_card_image_url)})` : undefined }}/>
                     <div className={styles.bookingCardInfo}>
                        {data.cta_card_title && <h3>{data.cta_card_title}</h3>}
                        {data.cta_card_description && <p>{data.cta_card_description}</p>}
                     </div>
                </div>
                {data.cta_button_label && (
                  <Link href={data.cta_button_href || '#'} className={styles.bookingButton}>
                    {data.cta_button_label}
                    <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4L12 20M12 4L18 10M12 4L6 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                )}
                <p className={styles.bookingFinePrint}>{t('home.noFees')}</p>
             </div>
        </section> */}

        {/* Section 4: Activities */}
        <section id="activities" className={styles.activitiesSection}>
            <div className={styles.activitiesHeader}>
                {data.activities_section_title && <h2 className={styles.sectionTitle}>{data.activities_section_title}</h2>}
                <div className={styles.fullWidthSection}>
                    <div className={styles.backgroundImageSection} style={{ backgroundImage: data.activities_bg_image_url ? `url(${toMedia(data.activities_bg_image_url)})` : undefined }}>
                        <div className={styles.introOverlay}>
                            <div className={styles.activitiesBannerText}>
                                {data.hero_text_secondary.split('\n').map((line, idx) => (
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
                        <div className={styles.activityImage} style={{ backgroundImage: `url(${toMedia(activity.image_url)})` }} />
                        <div className={styles.activityInfo}>
                            <h3>{activity.title}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Section 5: Action Buttons */}
        <section id="essentials" className={styles.actionsSection}>
            {data.actions_section_title && <h2 className={styles.sectionTitle}>{data.actions_section_title}</h2>}
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