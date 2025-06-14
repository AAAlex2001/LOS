import Link from 'next/link';
import styles from '../../styles/components/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Main content wrapper (24px horizontal padding to respect 1920→1872 grid) */}
      <div className={styles.contentWrapper}>
        {/* Branding & description */}
        <div className={styles.brandSection}>
          <h2 className={styles.brandTitle}>Land of Soul&nbsp;Abkhazia</h2>
          <p className={styles.brandDescription}>
            Пейзажи, которые захватывают дух, богатая история и вкусная еда, Абхазия
            не просто удивит — она покорит вас! Готовы к путешествию, которое
            останется в сердце навсегда?
          </p>
          {/* Social icons */}
          <div className={styles.socials}>
            {/* NOTE: use your own svg/png icons in /public/assets/socials folder */}
            {[
              { src: '/assets/socials/telegram.svg', alt: 'Telegram', w: 35, h: 30 },
              { src: '/assets/socials/instagram.svg', alt: 'Instagram', w: 32, h: 30 },
              { src: '/assets/socials/twitter.svg', alt: 'Twitter', w: 32, h: 32 },
              { src: '/assets/socials/facebook.svg', alt: 'Facebook', w: 30, h: 30 },
              { src: '/assets/socials/youtube.svg', alt: 'YouTube', w: 40, h: 30 },
              { src: '/assets/socials/rutube.svg', alt: 'Rutube', w: 44, h: 48 },
            ].map((icon) => (
              <Link href="#" key={icon.alt} aria-label={icon.alt} className={styles.socialLink}>
                <img src={icon.src} width={icon.w} height={icon.h} alt={icon.alt} />
              </Link>
            ))}
          </div>
        </div>

        {/* Links section – two columns */}
        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>footer</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="#">О проекте</Link>
              </li>
              <li>
                <Link href="#">Услуги</Link>
              </li>
              <li>
                <Link href="#">Контакты</Link>
              </li>
              <li>
                <Link href="#">Поддержка</Link>
              </li>
            </ul>
          </div>
          <div className={styles.linkColumn}>
            <h3 className={styles.columnTitle}>footer</h3>
            <ul className={styles.linksList}>
              <li>
                <Link href="#">Privacy</Link>
              </li>
              <li>
                <Link href="#">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link href="#">Accessibility</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Store badges */}
        <div className={styles.appsSection}>
          <img
            src="/assets/appstore.svg"
            alt="Download on App Store"
            className={styles.storeBadge}
            width={180}
            height={52}
          />
          <img
            src="/assets/googleplay.svg"
            alt="Get it on Google Play"
            className={styles.storeBadge}
            width={180}
            height={52}
          />
        </div>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Bottom row */}
      <div className={styles.bottomRow}>
        <span className={styles.rights}>© 2024 Land of Soul. All rights reserved.</span>
        <nav className={styles.bottomLinks}>
          <Link href="#">Privacy</Link>
          <Link href="#">Terms and Conditions</Link>
          <Link href="#">Accessibility</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer; 