'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';
import config from '@/config';
import { useTranslations, useLocale } from '@/i18n/LocaleContext';
import { getApiUrl } from '@/utils/api';

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

const Footer = () => {
  const { locale } = useLocale();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('footer');

  const defaultQuickLinks = [
    { label: t('cities'), href: '/cities' },
    { label: t('communication'), href: '/mobile-communication' },
    { label: t('taxi'), href: '/taxi' },
    { label: t('yourDoctor'), href: '/your-doctor' },
    { label: t('importantToKnow'), href: '/important' },
    { label: t('historyAndCulture'), href: '/history-and-culture' },
    { label: t('entertainment'), href: '/parties' },
    { label: t('banks'), href: '/banks' },
  ];

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        const url = getApiUrl('/api/footer/footer/footer_data/', locale);
        const res = await fetch(url, { cache: 'no-store' });
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
  }, [locale]);

  const quickLinks = footerData?.links.filter(link => link.category === 'quick_links') || defaultQuickLinks.map((link, idx) => ({
    id: idx,
    category: 'quick_links',
    label: link.label,
    url: link.href,
    order: idx
  }));

  const legalLinks = footerData?.links.filter(link => link.category === 'legal') || [
    { id: 1, category: 'legal', label: t('accessibilityAndTerms'), url: '/accessibility-and-terms', order: 1 },
    { id: 2, category: 'legal', label: t('privacyPolicy'), url: '/privacy-policy', order: 2 }
  ];

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
          <h3 className={styles.brandSubtitle}>{t('aboutService')}</h3>
          <p className={styles.brandDescription}>
            {footerData?.description || t('defaultDescription')}
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
          <h3 className={styles.quickLinksTitle}>{t('quickLinks')}</h3>
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
          <h3 className={styles.contactTitle}>{t('contactUs')}</h3>
          <div className={styles.contactInfo}>
            {footerData?.contact_info ? (
              <div style={{ whiteSpace: 'pre-line' }}>
                {footerData.contact_info}
              </div>
            ) : (
              <div>
                <strong>{t('workingHours')}</strong><br/>
                {t('mondayToSaturday')}<br/>
                {t('workingTime')}<br/>
                {t('sundayOff')}
              </div>
            )}
            {footerData?.email && (
              <div style={{ marginTop: 8 }}>
                <strong>{t('corporateEmail')}</strong><br/>
                <a href={`mailto:${footerData.email}`} className={styles.contactEmail}>
                  {footerData.email}
                </a>
              </div>
            )}
            {!footerData?.email && (
              <div style={{ marginTop: 8 }}>
                <strong>{t('corporateEmail')}</strong><br/>
                <a href="mailto:landofsoulweb@yandex.com" className={styles.contactEmail}>
                  landofsoulweb@yandex.com
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Download badges block */}
        <div className={styles.appBlock}>
          <h3 className={styles.appBlockTitle}>{t('downloadApp')}</h3>
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
          {footerData?.copyright_text || t('copyright')}
        </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
