'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import { useState } from 'react';
import { useTranslations } from '@/i18n/LocaleContext';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const t = useTranslations('header');

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.mobileMenuOverlay} ${menuOpen ? styles.active : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <nav className={styles.mobileNavList}>
          <Link href="#" className={`${styles.mobileNavButton} ${styles.blueOutline}`} onClick={closeMenu}>
            {t('classifieds')}
            <span className={styles.soonBadge}>{t('soon')}</span>
          </Link>
        </nav>

        <div className={styles.figureWrapper}>
          <Image
            src="/assets/Guy11.png"
            alt="Decorative character"
            width={100}
            height={100}
            className={styles.figureImage}
          />
        </div>

        <div className={styles.mobileLanguageSelect}>
          <LanguageSwitcher />
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* Left block: Logo */}
          <Link href="/" className={styles.logoSection} onClick={closeMenu}>
          <Image
            src="/assets/IMG_1557.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logoImage}
          />
          <h1 className={styles.logoText}>Land of Soul</h1>
        </Link>

        {/* Center navigation buttons */}
        <nav className={styles.nav}>
          <Link href="#" className={`${styles.navButton} ${styles.blueOutline}`}>
            {t('classifieds')}
            <span className={styles.soonBadge}>{t('soon')}</span>
          </Link>
        </nav>

        {/* Decorative image (Guy) */}
        <div className={styles.figureWrapper}>
          <Image
            src="/assets/Guy11.png"
            alt="Decorative character"
            width={137}
            height={137}
            className={styles.figureImage}
          />
        </div>

        {/* Right block: language select */}
        <div className={styles.languageSelect}>
          <LanguageSwitcher />
        </div>

        </div>
      </header>

      {/* Burger button - fixed position */}
      <button className={`${styles.burgerButton} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </>
  );
};

export default Header;
