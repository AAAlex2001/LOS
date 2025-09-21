"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './Parties.module.scss';
import tabStyles from './MainTabs.module.scss';
import config from '@/config';

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

interface PartyEvent {
  id: number;
  title: string;
  date_info?: string;
  location?: string;
  description?: string;
  event_url?: string;
  order: number;
  city: number;
  city_name: string;
  city_slug: string;
}

interface PartySliderItem {
  id: number;
  media_type: 'video' | 'image';
  media_file: string;
  order: number;
  city: number;
  city_name: string;
  city_slug: string;
}

interface PartyCity {
  id: number;
  name: string;
  slug: string;
  city_image?: string;
  events: PartyEvent[];
  order: number;
}

interface PartiesPageData {
  id: number;
  main_title: string;
  background_image?: string;
  center_icon?: string;
  decor_image_1?: string;
  decor_image_2?: string;
  decor_image_3?: string;
  decor_image_4?: string;
  decor_image_5?: string;
  intro_text?: string;
  cities: PartyCity[];
  events: PartyEvent[];
  slider_items: PartySliderItem[];
}

const API_BASE = config.API_BASE;

const Parties: React.FC = () => {
  const [data, setData] = useState<PartiesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/parties/page/content/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load parties page');
        const json = (await res.json()) as PartiesPageData;
        setData(json);
      } catch (e) {
        console.error(e);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

  const toImageUrl = (p?: string) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  if (loading) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Загрузка...</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.pageWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>{error || 'Ошибка загрузки данных'}</h1>
        </main>
        <Footer />
      </div>
    );
  }

  const cities = (data.cities || []).slice().sort((a, b) => a.order - b.order);
  const events = (data.events || []).slice().sort((a, b) => a.order - b.order);
  const sliderItems = (data.slider_items || []).slice().sort((a, b) => a.order - b.order);

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>{data.main_title}</h1>

        {/* Banner with background image */}
        <div className={styles.fullWidthSection}>
          <div 
            className={styles.backgroundImageSection}
            style={{ 
              backgroundImage: data.background_image 
                ? `url('${toImageUrl(data.background_image)}')` 
                : `url('/assets/IMG_1932.jpg')` 
            }}
          >
            {/* Neon party icon */}
            {data.center_icon && (
              <div className={styles.centerIcon}>
                <div className={styles.centerIconWrapper}>
                  <img
                    src={toImageUrl(data.center_icon)}
                    alt="Party icon"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}
            
            <div className={styles.introOverlay}>
              <div className={styles.introTextContainer}>
                {data.intro_text && (
                  <p className={styles.introText} style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: data.intro_text }} />
                )}
              </div>
            </div>
          </div>

          {/* Decorative Images */}
          {data.decor_image_1 && (
            <img
              src={toImageUrl(data.decor_image_1)}
              alt="Decor 1"
              className={styles.decorTopLeft}
            />
          )}
          {data.decor_image_2 && (
            <img
              src={toImageUrl(data.decor_image_2)}
              alt="Decor 2"
              className={styles.decorBottomLeft}
            />
          )}
          {data.decor_image_3 && (
            <img
              src={toImageUrl(data.decor_image_3)}
              alt="Decor 3"
              className={styles.decorBottomCenter}
            />
          )}
          {data.decor_image_4 && (
            <img
              src={toImageUrl(data.decor_image_4)}
              alt="Decor 4"
              className={styles.decorTopRight}
            />
          )}
          {data.decor_image_5 && (
            <img
              src={toImageUrl(data.decor_image_5)}
              alt="Decor 5"
              className={styles.decorBottomRight}
            />
          )}
        </div>

        {/* Main Tabs with Navigation */}
        <section className={tabStyles.mainTabs}>
          {cities.map((city) => (
            <div key={city.id} className={tabStyles.tabItem} onClick={() => scrollToCity(city.slug)}>
              <div className={`${tabStyles.tabLabel} ${city.name.includes(' ') ? tabStyles.tabLabelMultiline : ''}`}>
                {city.name}
              </div>
            </div>
          ))}
        </section>

        {/* City Cards */}
        {cities.map((city) => {
          // Определяем какой компонент использовать по slug города
          let CityComponent;
          switch (city.slug) {
            case 'suhum':
              CityComponent = PartyCardSuhum;
              break;
            case 'gagra':
              CityComponent = PartyCardGagra;
              break;
            case 'pitsunda':
              CityComponent = PartyCardPitsunda;
              break;
            case 'gudauta':
              CityComponent = PartyCardGudauta;
              break;
            case 'newafon':
              CityComponent = PartyCardNewafon;
              break;
            case 'gulripsh':
              CityComponent = PartyCardGulripsh;
              break;
            case 'ochamchira':
              CityComponent = PartyCardOchamchira;
              break;
            case 'tkuarchal':
              CityComponent = PartyCardTkuarchal;
              break;
            case 'gal':
              CityComponent = PartyCardGal;
              break;
            default:
              CityComponent = PartyCardSuhum;
          }
          
          return (
            <div key={city.id} id={city.slug} className={styles.cityCardContainer}>
              <CityComponent city={city} events={events} sliderItems={sliderItems} />
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
};

export default Parties; 