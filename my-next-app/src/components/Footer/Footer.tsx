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
  { label: 'Города', href: '/cities' },
  { label: 'Связь', href: '/mobile-communication' },
  { label: 'Такси', href: '/taxi' },
  { label: 'Ваш доктор', href: '/your-doctor' },
  { label: 'Важно знать', href: '/important' },
  { label: 'История и культура Абхазии', href: '/history-and-culture' },
  // { label: 'Жильё', href: '/rent' },
  { label: 'Развлечения', href: '/parties' },
  { label: 'Банки', href: '/banks' },
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
            {quickLinks.map(({label, href}) => (
              <Link href={href} key={label} className={styles.quickLinkItem}>
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact block */}
        <div className={styles.contactBlock}>
          <h3 className={styles.contactTitle}>Связаться с нами</h3>
          <div className={styles.contactInfo}>
            <div>
              <strong>Часы работы:</strong><br/>
              Понедельник – суббота<br/>
              9:00 – 18:00<br/>
              Воскресенье – выходной
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Корпоративная почта:</strong><br/>
              <a href="mailto:landofsoulweb@yandex.com" className={styles.contactEmail}>
                landofsoulweb@yandex.com
              </a>
            </div>
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
          <Link href="/accessibility-and-terms" className={styles.legalLink}>
            Доступность и правила пользования сайтом
          </Link>
          <Link href="/privacy-policy" className={styles.legalLink}>
            Политика конфиденциальности сайта
          </Link>
        </nav>
        <span className={styles.rights}>© 2025 Land of soul Abkhazia. Все права защищены.</span>
      </div>
    </footer>
  );
};

export default Footer; 