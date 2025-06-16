'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/components/Header.module.scss';
import { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

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
          <Link href="#" className={styles.mobileNavButton} onClick={closeMenu}>
            Аренда жилья
          </Link>
          <Link href="#" className={`${styles.mobileNavButton} ${styles.orangeOutline}`} onClick={closeMenu}>
            Доска объявлений
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

        <div className={styles.mobileLanguageSelect} onClick={closeMenu}>
          <span className={styles.languageText}>Выберите язык</span>
          <svg
            className={styles.arrowIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7L10 12L15 7"
              stroke="#1129BD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <header className={styles.header}>
        {/* Left block: Logo */}
        <div className={styles.logoSection}>
          <Image
            src="/assets/IMG_1557.png"
            alt="Logo"
            width={100}
            height={100}
            className={styles.logoImage}
          />
          <h1 className={styles.logoText}>Land of Soul</h1>
        </div>

        {/* Center navigation buttons */}
        <nav className={styles.nav}>
          <Link href="#" className={`${styles.navButton} ${styles.orangeOutline}`}>
            Аренда жилья
          </Link>
          <Link href="#" className={`${styles.navButton} ${styles.blueOutline}`}>
            Доска объявлений
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
          <span className={styles.languageText}>Выберите язык</span>
          <svg
            className={styles.arrowIcon}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7L10 12L15 7"
              stroke="#1129BD"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Burger button */}
        <button className={`${styles.burgerButton} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </header>
    </>
  );
};

export default Header; 