'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

const socialIcons = [
  { src: '/assets/telegram.svg', alt: 'Telegram', w: 42, h: 42 },
  { src: '/assets/instagram.svg', alt: 'Instagram', w: 42, h: 42 },
  { src: '/assets/twitter.svg', alt: 'Twitter', w: 42, h: 42 },
  { src: '/assets/facebook.svg', alt: 'Facebook', w: 42, h: 42 },
  { src: '/assets/youtube.svg', alt: 'YouTube', w: 42, h: 42 },
  { src: '/assets/rutube.svg', alt: 'Rutube', w: 42, h: 42 },
];

const quickLinks = [
  'Города',
  'Ваш доктор',
  'Жильё',
  'Связь',
  'Важно знать',
  'Развлечения',
  'Такси',
  'Об Абхазии',
  'Банки',
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Top area */}
      <div className={styles.topRow}>
        {/* Branding */}
        <div className={styles.brand}>
          <h2 className={styles.brandTitle}>Land of Soul Abkhazia</h2>
          <h3 className={styles.brandSubtitle}>О сервисе</h3>
          <p className={styles.brandDescription}>
            Ваш гид по&nbsp;Абхазии с&nbsp;проверенными рекомендациями и&nbsp;эксклюзивными
            маршрутами.
          </p>
          <div className={styles.socials}>
            {socialIcons.map((icon) => (
              <Link href="#" key={icon.alt} aria-label={icon.alt} className={styles.socialLink}>
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
              <Link href="#" key={link} className={styles.quickLinkItem}>
                {link}
              </Link>
            ))}
          </nav>
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
            />
            <Image
              src="/assets/googleplay.svg"
              alt="Get it on Google Play"
              width={180}
              height={52}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom line */}
      <div className={styles.bottomRow}>
        <nav className={styles.legalLinks}>
          <Link href="#" className={styles.legalLink}>
            Privacy Policy
          </Link>
          <Link href="#" className={styles.legalLink}>
            Terms and Conditions
          </Link>
          <Link href="#" className={styles.legalLink}>
            Accessibility
          </Link>
        </nav>
        <span className={styles.rights}>© 2025 Land of soul Abkhazia. Все права защищены.</span>
      </div>
    </footer>
  );
};

export default Footer; 