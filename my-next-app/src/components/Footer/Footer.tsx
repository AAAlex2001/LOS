'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import config from '@/config';

const API_BASE = config.API_BASE;

interface FooterLink {
  id: number;
  category: string;
  label: string;
  url: string;
  order: number;
}

interface SocialLink {
  id: number;
  network: string;
  url: string;
  order: number;
}

interface FooterData {
  description: string;
  contact_info: string;
  email: string;
  copyright_text: string;
  links: FooterLink[];
  social_links: SocialLink[];
}

const socialIconsMap: Record<string, { src: string; alt: string; w: number; h: number }> = {
  telegram: { src: '/assets/telegram.svg', alt: 'Telegram', w: 42, h: 42 },
  instagram: { src: '/assets/instagram.svg', alt: 'Instagram', w: 42, h: 42 },
  twitter: { src: '/assets/twitter.svg', alt: 'Twitter', w: 42, h: 42 },
  facebook: { src: '/assets/facebook.svg', alt: 'Facebook', w: 42, h: 42 },
  youtube: { src: '/assets/youtube.svg', alt: 'YouTube', w: 42, h: 42 },
  rutube: { src: '/assets/rutube.svg', alt: 'Rutube', w: 42, h: 42 },
};

const defaultSocialIcons = [
  { src: '/assets/telegram.svg', alt: 'Telegram', w: 42, h: 42, href: '#' },
  { src: '/assets/instagram.svg', alt: 'Instagram', w: 42, h: 42, href: '#' },
  { src: '/assets/twitter.svg', alt: 'Twitter', w: 42, h: 42, href: '#' },
  { src: '/assets/facebook.svg', alt: 'Facebook', w: 42, h: 42, href: '#' },
  { src: '/assets/youtube.svg', alt: 'YouTube', w: 42, h: 42, href: '#' },
  { src: '/assets/rutube.svg', alt: 'Rutube', w: 42, h: 42, href: '#' },
];

const defaultQuickLinks = [
  { label: 'Города', href: '/cities' },
  { label: 'Связь', href: '/mobile-communication' },
  { label: 'Такси', href: '/taxi' },
  { label: 'Ваш доктор', href: '/your-doctor' },
  { label: 'Важно знать', href: '/important' },
  { label: 'История и культура Абхазии', href: '/history-and-culture' },
  { label: 'Развлечения', href: '/parties' },
  { label: 'Банки', href: '/banks' },
];

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/footer/footer/footer_data/`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load footer data');
        const json = await res.json();
        setFooterData(json);
      } catch (e) {
        console.error('Error loading footer data:', e);
        setFooterData(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadFooterData();
  }, []);

  // Получаем ссылки из бэкенда или используем дефолтные
  const quickLinks = footerData?.links.filter(link => link.category === 'quick_links') || defaultQuickLinks.map((link, idx) => ({
    id: idx,
    category: 'quick_links',
    label: link.label,
    url: link.href,
    order: idx
  }));

  const legalLinks = footerData?.links.filter(link => link.category === 'legal') || [
    { id: 1, category: 'legal', label: 'Доступность и правила пользования сайтом', url: '/accessibility-and-terms', order: 1 },
    { id: 2, category: 'legal', label: 'Политика конфиденциальности сайта', url: '/privacy-policy', order: 2 }
  ];

  // Получаем социальные ссылки из бэкенда или используем дефолтные
  const socialIcons: Array<{ src: string; alt: string; w: number; h: number; href: string; id?: number }> = 
    footerData?.social_links && footerData.social_links.length > 0
      ? footerData.social_links.map(link => ({
          ...socialIconsMap[link.network],
          href: link.url,
          id: link.id
        }))
      : defaultSocialIcons;
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Top area */}
        <div className={styles.topRow}>
        {/* Branding */}
        <div className={styles.brand}>
          <h2 className={styles.brandTitle}>Land of Soul Abkhazia</h2>
          <h3 className={styles.brandSubtitle}>О сервисе</h3>
          <p className={styles.brandDescription}>
            {footerData?.description || 'Ваш гид по Абхазии с проверенными рекомендациями и эксклюзивными маршрутами.'}
          </p>
          <div className={styles.socials}>
            {socialIcons.map((icon, idx) => (
              <Link href={icon.href} key={icon.id ?? idx} aria-label={icon.alt} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                <Image src={icon.src} width={icon.w} height={icon.h} alt={icon.alt} />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links block */}
        <div className={styles.quickLinksBlock}>
          <h3 className={styles.quickLinksTitle}>Быстрые ссылки</h3>
          <nav className={styles.quickLinks}>
            {quickLinks.map((link) => (
              <Link href={link.url} key={link.id} className={styles.quickLinkItem}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact block */}
        <div className={styles.contactBlock}>
          <h3 className={styles.contactTitle}>Связаться с нами</h3>
          <div className={styles.contactInfo}>
            {footerData?.contact_info ? (
              <div style={{ whiteSpace: 'pre-line' }}>
                {footerData.contact_info}
              </div>
            ) : (
              <div>
                <strong>Часы работы:</strong><br/>
                Понедельник – суббота<br/>
                9:00 – 18:00<br/>
                Воскресенье – выходной
              </div>
            )}
            {footerData?.email && (
              <div style={{ marginTop: 8 }}>
                <strong>Корпоративная почта:</strong><br/>
                <a href={`mailto:${footerData.email}`} className={styles.contactEmail}>
                  {footerData.email}
                </a>
              </div>
            )}
            {!footerData?.email && (
              <div style={{ marginTop: 8 }}>
                <strong>Корпоративная почта:</strong><br/>
                <a href="mailto:landofsoulweb@yandex.com" className={styles.contactEmail}>
                  landofsoulweb@yandex.com
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Download badges block */}
        <div className={styles.appBlock}>
          <h3 className={styles.appBlockTitle}>Скачайте мобильное приложение</h3>
          <div className={styles.appBadges}>
            <Image
              src="/assets/appstore.svg"
              alt="Download on App Store"
              width={180}
              height={52}
              style={{ width: '100%', height: 'auto', maxWidth: '180px' }}
            />
            <Image
              src="/assets/googleplay.svg"
              alt="Get it on Google Play"
              width={180}
              height={52}
              style={{ width: '100%', height: 'auto', maxWidth: '180px' }}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom line */}
      <div className={styles.bottomRow}>
        <nav className={styles.legalLinks}>
          {legalLinks.map((link) => (
            <Link href={link.url} key={link.id} className={styles.legalLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <span className={styles.rights}>
          {footerData?.copyright_text || '© 2025 Land of soul Abkhazia. Все права защищены.'}
        </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 